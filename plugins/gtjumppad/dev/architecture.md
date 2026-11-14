---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 클래스               | 역할                                                                     |
| -------------------- | ------------------------------------------------------------------------ |
| `GTJumpPad`          | 초기화. DB 연결 실패 시 플러그인 비활성화                                |
| `JumpPadCommand`     | `/gtjumppad` 명령어, 탭 완성                                             |
| `DatabaseManager`    | DB 백엔드(GTDatabase 공용 또는 자체 SQLite) 선택, 스키마, 단일 DB 스레드 |
| `GTDatabaseBackend`  | GTDatabase 공용 연결. GTDatabase API를 import하는 유일한 클래스          |
| `SqliteBackend`      | GTDatabase가 없을 때 쓰는 `gtjumppad.db` 연결                            |
| `JumpPadRepository`  | 테이블 입출력                                                            |
| `JumpPadItem`        | 등록된 블록(템플릿) 관리, PDC 태그 판별                                  |
| `JumpPadRegistry`    | 설치 좌표 메모리 캐시                                                    |
| `LaunchService`      | 발사 조건, 속도 계산, 효과, 낙하 보호                                    |
| `BlockListener`      | 설치, 파괴, 폭발, 불, 피스톤, 소멸 추적                                  |
| `PlayerMoveListener` | 이동 감지 진입점, 접속 종료 시 상태 정리                                 |
| `FallDamageListener` | 낙하 피해 취소                                                           |

## 아이템 판별과 좌표 추적

지급 아이템에는 PDC 키 `gtjumppad:jumppad`(BYTE, 값 1)가 들어 있습니다. 판별은 이 태그만 봅니다.

블록으로 설치되면 PDC가 사라지므로 `BlockPlaceEvent`(MONITOR)에서 좌표를 기록합니다. 태그 없는 아이템이 기록된 좌표에
놓이면 기록을 지웁니다.

`JumpPadRegistry`는 `"world:x:y:z"` 문자열 집합입니다. 시작할 때 DB의 좌표를 모두 올리고, 추가와 삭제는 메모리를 먼저
바꾼 뒤 DB 쓰기를 비동기로 넘깁니다. 이동할 때마다 DB를 조회하지 않습니다.

## 발사 흐름

1. `PlayerMoveEvent`에서 블록 X, Z와 Y 높이가 모두 그대로면 바로 반환합니다(시선만 돌린 경우 등).
2. 공중이면 마지막 발사 패드 기록을 지우고 반환합니다. 그래서 점프 후 착지하면 다시 발사됩니다.
3. 발 높이에서 0.01 아래 블록 좌표를 봅니다. 슬래브나 카펫도 그 블록 자체가 잡힙니다.
4. 마지막으로 발사한 패드와 같으면 반환합니다.
5. 쿨다운, `gtjumppad.use`, 월드, 탈것을 확인합니다.
6. 속도를 설정하고 낙하 거리를 0으로 만든 뒤, 낙하 보호를 걸고 효과를 냅니다.

속도는 yaw만 씁니다.

```text
dirX = -sin(yaw), dirZ = cos(yaw)
velocity = (dirX * cos(pitch) * speed, sin(pitch) * speed, dirZ * cos(pitch) * speed)
```

## 낙하 보호

발사하면 플레이어별 `FallGuard`(만료 10초)를 만듭니다.

- 공중에 뜨면 `airborne` 표시
- 그 뒤 땅에 닿으면 1틱 뒤 보호 해제. 같은 틱의 낙하 피해는 아직 막힘
- `EntityDamageEvent`(FALL, LOW)에서 보호가 있고 만료 전이면 취소하고 보호를 소모

## 블록 이벤트

| 이벤트                                              | 우선순위 | 처리                                                               |
| --------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| `BlockBreakEvent`                                   | HIGHEST  | 기록 삭제, 바닐라 드롭 끄기, 크리에이티브가 아니면 템플릿 1개 드롭 |
| `EntityExplodeEvent`, `BlockExplodeEvent`           | 기본     | 폭발 목록에서 제외. 보호가 꺼져 있으면 직접 공기로 바꾸고 드롭     |
| `BlockBurnEvent`                                    | 기본     | 취소                                                               |
| `BlockPistonExtendEvent`, `BlockPistonRetractEvent` | 기본     | 대상에 점프패드가 있으면 취소                                      |
| `BlockFadeEvent`, `BlockFromToEvent`                | MONITOR  | 기록만 삭제                                                        |

`EntityChangeBlockEvent`(떨어지는 블록, 엔더맨)와 다른 플러그인의 직접 변경은 처리하지 않습니다.

## 스레드

DB 작업은 데몬 스레드 `GTJumpPad-DB` 하나에서 순서대로 실행합니다. 시작할 때 읽기만 메인 스레드에서 합니다. 종료할 때는
남은 쓰기를 최대 10초 기다린 뒤 연결을 닫습니다.

이동 처리와 낙하 보호 상태는 메인 스레드에서만 다룹니다.

## 외부 연동

공개 API나 커스텀 이벤트는 없습니다. 점프패드 좌표를 알려면 `gtjumppad.db`의 `jumppad_blocks`를 읽어야
합니다(GTDatabase를 쓰면 공용 DB의 `gt_jumppad_jumppad_blocks`).
