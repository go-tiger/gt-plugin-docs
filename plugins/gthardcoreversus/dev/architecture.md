---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 패키지                         | 역할                                                                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dev.gotiger.gTHardcoreVersus` | 메인 클래스. 구성 요소 조립, 첫 틱에 월드 세트 생성, 정적 API 진입점                                                                                                                                                     |
| `command`                      | `/gthardcoreversus`                                                                                                                                                                                                      |
| `database`                     | DB 백엔드(GTDatabase 공용 또는 자체 SQLite) 선택과 단일 DB 스레드, 팀(`TeamRepository`), 부활 타이머(`RespawnTimerRepository`). 테이블은 접두사 없는 이름으로 부르고 백엔드가 `gthcvs_` 또는 `gt_hardcoreversus_`를 붙임 |
| `team`                         | `Team`(A, B), `TeamState`, 배정, 상태, 기록 캐시(`TeamService`)                                                                                                                                                          |
| `respawn`                      | 사망, 관전, 부활(`RespawnService`, `RespawnTimerTask`)                                                                                                                                                                   |
| `wipe`                         | 전멸 판정, 즉사, 월드 세트 교체, 미리 생성, 일괄 삭제(`TeamWipeService`)                                                                                                                                                 |
| `world`                        | Multiverse 호출(`MultiverseBridge`)                                                                                                                                                                                      |
| `spectate`                     | 관전 순간이동 제한                                                                                                                                                                                                       |
| `win`                          | 엔더 드래곤 처치로 승리 판정                                                                                                                                                                                             |
| `util`                         | 메시지, 사운드                                                                                                                                                                                                           |

## 캐시

팀 배정, 팀 상태, 즉사 횟수, 기록, 부활 타이머는 활성화 시 모두 메모리에 올립니다(`join()`으로 동기 로드). 사망이나
순간이동 이벤트마다 DB를 조회할 수 없기 때문입니다. 변경은 메모리를 먼저 바꾸고 DB 쓰기는 단일 DB 스레드에 넘깁니다.

게임 진행 여부(`event-started`)만 DB가 아니라 `config.yml`에 저장합니다.

## 사망과 부활

바닐라 하드코어는 죽으면 영구 관전자로 고정되므로 쓰지 않습니다.

```
PlayerDeathEvent (MONITOR, 진행 중, 팀 있음)
  │  waiting[uuid] = now + respawn-seconds (DB에 절대 시각 저장)
  ▼  1틱 뒤 player.spigot().respawn()
PlayerRespawnEvent
  ▼  1틱 뒤 SPECTATOR, RespawnTimerTask 시작 (1초마다)
RespawnTimerTask
  │  남은 시간 = respawnAt - now (틱 카운터가 아니라 절대 시각 기준)
  ▼  0 이하 → revive(): 리스폰 위치로 이동, SURVIVAL
```

- 접속 종료 시 작업만 멈추고 DB 행은 남깁니다. 재접속 1틱 뒤에 남은 시간으로 다시 시작하거나 바로 부활시킵니다.
- 서버 종료 시에도 작업만 멈춥니다. 재시작하면 같은 방식으로 이어 갑니다.
- 리스폰 위치는 `player.getRespawnLocation()`(침대, 정박기)이 있으면 그곳, 없으면 팀 현재 세트의 오버월드 스폰입니다.

## 전멸 판정

| 시점      | 처리                                                                             |
| --------- | -------------------------------------------------------------------------------- |
| 일반 사망 | 사망 횟수 +1, 2틱 뒤(강제 리스폰 이후) `checkWipe`                               |
| 즉사      | 즉사 스택과 누적 즉사 +1, `setHealth(0)`. 기준 도달 시 3틱 뒤 다시 확인하고 전멸 |

`checkWipe`는 접속 중인 팀원 중 관전 대기 중이 아니고 살아 있는 사람이 한 명도 없으면 전멸로 봅니다. 접속 중인 팀원이
없으면 판정하지 않습니다.

즉사 전멸을 3틱 미루는 이유는 같은 틱의 즉사 → 1틱 강제 리스폰 → 2틱 일반 전멸 판정이 먼저 끝나야 하기 때문입니다. 일반
전멸로 이미 옮겨 갔으면 스택이 0이 되어 있으므로 다시 전멸시키지 않습니다.

## 월드 세트 교체

```
wipe(team)
  │  팀원 전원 부활 대기 취소, 전멸 횟수 +1
  │  nextWorldSet(): 초기, 예비 목록에서 다음 → 없으면 번호 +1
  ▼
relocate(team, set)
  │  mv load (없으면 mv import), 난이도 적용, mvnp link
  │  팀 상태 갱신, 즉사 스택 초기화
  │  접속 중인 팀원 스폰으로 이동, SURVIVAL
  │  1틱 뒤 이전 세트 mv unload
  ▼  5초 뒤 prepareAhead()
```

불러오기에 실패하면 `awaitingWorldSet`에 넣고 관리자의 `setworld`를 기다립니다. 이 상태는 메모리에만 있어서 재시작하면
사라집니다.

## Multiverse 연동

Multiverse-Core는 버전마다 API가 달라서, API 대신 **콘솔 명령어**를 실행합니다.

| 작업      | 명령어                                                               |
| --------- | -------------------------------------------------------------------- |
| 생성      | `mv remove <월드>` 후 `mv create <월드> <normal\|nether\|the_end>`   |
| 불러오기  | `mv load <월드>`, 실패하면 `mv import <월드> <환경>`                 |
| 난이도    | `mv modify <월드> set difficulty <난이도>`와 `World.setDifficulty()` |
| 포털 연결 | `mvnp link nether`, `mvnp link end` (양방향)                         |
| 언로드    | `mv unload <월드>`                                                   |
| 삭제      | 플레이어를 대피시킨 뒤 `mv remove <월드>`, 폴더 삭제                 |

월드 폴더 위치는 서버 버전마다 다르므로, 로드된 월드들의 실제 폴더 위치에서 후보 디렉터리를 찾습니다.

## 관전 제한

스코어보드 팀은 다른 스크립트의 플레이어별 스코어보드와 충돌해서 쓰지 않습니다. 대신 `PlayerTeleportEvent`의 `SPECTATE`
원인을 가로채, 도착 위치에서 1칸 이내에 있는 가장 가까운 플레이어를 대상으로 보고 팀을 비교합니다.

## 승리

`EntityDeathEvent`에서 엔더 드래곤이 죽은 월드의 세트 이름으로 팀을 찾습니다. 먼저 잡은 팀만 처리하며, 승리 팀
기록(`winner`)은 메모리에만 있고 `start` 때 초기화됩니다.
