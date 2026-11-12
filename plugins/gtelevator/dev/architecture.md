---
sidebar_position: 1
title: 구조
---

# 구조

GTElevator는 외부에 공개하는 API나 이벤트가 없습니다.

## 패키지

| 패키지                   | 역할                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTElevator` | 메인 클래스. 구성 요소 조립, Paper 여부에 따라 점프 리스너 선택                                               |
| `command`                | `/gtelevator`                                                                                                 |
| `database`               | SQLite 연결, 스키마, 단일 DB 스레드(`DatabaseManager`), 테이블 입출력(`ElevatorRepository`)                   |
| `elevator`               | 아이템 템플릿과 PDC 판별(`ElevatorItem`), 설치 좌표 캐시(`ElevatorRegistry`), 이동(`TeleportService`), 쿨다운 |
| `listener`               | 설치, 파괴, 보호(`BlockListener`), 웅크림(`SneakListener`), 점프(`PaperJumpListener`, `SpigotJumpListener`)   |
| `util`                   | 아이템 직렬화, 메시지                                                                                         |

## 엘리베이터 블록 판별

| 단계            | 판별 방법                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| 아이템          | PDC 태그 `gtelevator:elevator = 1` (byte). 이름이나 설명은 위조할 수 있으므로 보지 않음                    |
| 설치된 블록     | 설치 좌표. 블록이 되면 아이템의 PDC가 사라지므로, `BlockPlaceEvent`에서 태그가 있는 아이템이면 좌표를 기록 |
| 다시 아이템으로 | 파괴 시 바닐라 드롭을 막고 현재 템플릿(PDC 포함)을 직접 드롭                                               |

`/gtelevator set`은 손에 든 아이템을 복제해 PDC 태그와 자동 설명을 붙인 뒤 템플릿으로 저장합니다. 템플릿은 하나만
있습니다.

## 좌표 캐시

`ElevatorRegistry`는 서버 시작 시 모든 좌표를 메모리에 올립니다.

- 키는 기둥 단위 `world:x:z`, 값은 y 좌표의 `TreeSet`입니다.
- 위층과 아래층은 `TreeSet.higher(y)`, `lower(y)`로 바로 찾습니다.
- 층 번호는 `headSet(y, true).size()`입니다.
- 층 이름은 블록 단위 `world:x:y:z` 키로 따로 보관합니다.
- 변경은 캐시를 먼저 바꾸고 DB 쓰기는 비동기로 보냅니다.

## 점프 감지

| 서버   | 방식                                                                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Paper  | `com.destroystokyo.paper.event.player.PlayerJumpEvent`                                                                             |
| Spigot | `PlayerMoveEvent`에서 y 증가량이 0.35~0.5이고, 단단한 블록에서 뛰었고, 비행, 사다리, 덩굴, 거미줄, 물, 용암, 슬라임 블록이 아닐 때 |

spigot-api로만 컴파일하기 때문에 Paper 이벤트를 import할 수 없습니다. 그래서 `Class.forName`으로 Paper 여부를 확인하고,
`PaperJumpListener`는 `PluginManager.registerEvent()`와 리플렉션(`getPlayer()`)으로 등록합니다. 이 클래스는 Paper일 때만
로드됩니다.

## 이동

```
점프 / 웅크림
  │  권한, 쿨다운 확인
  ▼
TeleportService.attemptMove()
  │  월드 확인, 발밑이 엘리베이터 블록인지 확인
  │  같은 기둥에서 위 또는 아래 y 찾기
  │  max-distance 확인, 탈것에서 내리기
  │  safe-teleport: 도착 블록 위 두 칸이 단단하지 않은지 확인
  ▼  teleport(y + 1), 낙하 거리 초기화, 소리, 파티클, 액션바
```

## 블록 보호와 좌표 정리

좌표로 추적하기 때문에 블록이 움직이거나 사라지면 추적이 어긋납니다.

| 이벤트                                              | 처리                                                       |
| --------------------------------------------------- | ---------------------------------------------------------- |
| `BlockBreakEvent`                                   | 좌표와 층 이름 제거, 템플릿 드롭 (크리에이티브 제외)       |
| `EntityExplodeEvent`, `BlockExplodeEvent`           | 보호 설정이면 폭발 목록에서 제외, 아니면 좌표 제거 후 드롭 |
| `BlockBurnEvent`                                    | 취소                                                       |
| `BlockPistonExtendEvent`, `BlockPistonRetractEvent` | 엘리베이터 블록이 포함되면 취소                            |
| `BlockFadeEvent`, `BlockFromToEvent`                | 좌표 제거                                                  |

이 밖의 방법(WorldEdit, 다른 플러그인의 `setType`, 떨어지는 블록 등)으로 블록이 사라지면 좌표가 남습니다. 그러면 그
위치로 이동할 수 있게 되므로, 필요하면 DB에서 직접 지워야 합니다.
