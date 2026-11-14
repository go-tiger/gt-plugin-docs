---
sidebar_position: 1
title: 구조
---

# 구조

GTMine은 외부에 공개하는 API나 이벤트가 없습니다.

## 패키지

| 패키지               | 역할                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTMine` | 메인 클래스. 구성 요소 조립, 첫 틱에 재시작 복구                                                   |
| `area`               | 광산(`MineArea`), 가중치 풀(`MinePool`), 캐시와 start/stop/restart/clear(`AreaManager`)            |
| `point`              | 리젠 포인트(`MinePoint`), 좌표 캐시(`PointRegistry`), 리젠 타이머(`RegenScheduler`)                |
| `marker`             | 마커 아이템 PDC(`MarkerItem`)                                                                      |
| `listener`           | 마커 설치와 제거, 채굴, 피스톤과 폭발 보호                                                         |
| `command`            | `/gtmine`                                                                                          |
| `database`           | DB 백엔드(GTDatabase 공용 또는 자체 SQLite) 선택과 단일 DB 스레드, 테이블 입출력(`MineRepository`) |
| `util`               | 메시지                                                                                             |

## 데이터의 출처

| 데이터                 | 저장 위치              |
| ---------------------- | ---------------------- |
| 확률 풀, 리젠 시간     | `config.yml`의 `areas` |
| 광산 활성 여부         | DB `mine_areas`        |
| 리젠 포인트 좌표, 상태 | DB `mine_points`       |

`AreaManager.loadAll()`은 config와 DB를 합칩니다. config에 없지만 DB나 포인트에만 있는 광산도 풀 없는
항목(`pool == null`, 리젠 30초)으로 캐시에 넣어, `info`와 `list`로 볼 수 있게 합니다. 이런 광산은 `start`할 수 없습니다.

## 포인트 상태

```
          설치                start / restart
(없음) ───────▶ MARKER ─────────────────▶ ORE ◀───┐
          ◀─────── │  ◀──────────────────  │      │ 리젠 (respawn-seconds)
          부수기           stop             │ 채굴  │
                                            ▼      │
                                          MINED ───┘  (기반암)
```

| 상태     | 블록              | 다루는 리스너                                       |
| -------- | ----------------- | --------------------------------------------------- |
| `MARKER` | `marker-material` | `MarkerPlaceListener` (부수면 등록 해제, 마커 드롭) |
| `ORE`    | 풀에서 뽑은 블록  | `MineBreakListener` (채굴 처리)                     |
| `MINED`  | `BEDROCK`         | 없음 (리젠 대기)                                    |

## 채굴 처리

`BlockBreakEvent`(HIGH, `ignoreCancelled`)에서 포인트가 `ORE` 상태일 때만 개입합니다.

| `use-vanilla-drops` | 처리                                                                |
| ------------------- | ------------------------------------------------------------------- |
| `true`              | 이벤트를 취소하지 않고 바닐라에 맡김. **다음 틱에** 기반암으로 교체 |
| `false`             | 이벤트 취소, `custom-drops` 드롭, 즉시 기반암으로 교체              |

바닐라 드롭을 쓸 때 교체를 한 틱 미루는 이유는, 이벤트 처리 중에 블록을 바꾸면 바닐라가 바뀐 블록 기준으로 드롭을 계산해
드롭이 사라지기 때문입니다.

## 리젠 타이머

포인트가 수천 개일 수 있어서 매 틱 전체를 훑지 않습니다. 채굴할 때 그 포인트 하나에 `runTaskLater`를 예약합니다.

- 콜백 시점에 상태가 여전히 `MINED`이고, 광산이 활성이며 풀이 있을 때만 리젠합니다. 그 사이 `stop`이나 `restart`가
  있었으면 아무것도 하지 않습니다.
- `stop`과 `restart`는 그 광산의 예약을 먼저 모두 취소합니다.
- `mined_at`(epoch 밀리초)을 DB에 저장해 둡니다. 서버 시작 첫 틱에 `recoverOnStartup()`이 `MINED` 포인트마다 경과 시간을
  계산해, 지났으면 바로 리젠하고 아니면 남은 시간만큼 다시 예약합니다.

## 블록 교체

모든 블록 교체는 `setType(material, false)`로 물리 갱신 없이 합니다. 주변 블록 갱신으로 인한 연쇄 변화를 막기
위해서입니다. 다만 중력 블록은 다른 이유로 갱신되면 떨어질 수 있습니다.

## 마커 판별

마커 아이템에 PDC 두 개를 심습니다.

| 키              | 타입   | 내용      |
| --------------- | ------ | --------- |
| `gtmine:marker` | BYTE   | 1         |
| `gtmine:area`   | STRING | 소속 광산 |

블록으로 설치되면 PDC가 사라지므로, `BlockPlaceEvent`(MONITOR)에서 좌표와 광산을 DB에 기록합니다.

## DB 백엔드

| 구현                | 선택 조건                                   | 커넥션                                                                |
| ------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| `GTDatabaseBackend` | GTDatabase가 켜져 있고 서비스가 등록돼 있음 | 작업마다 공용 풀에서 빌리고 반납. 종료 시 풀은 닫지 않음              |
| `SqliteBackend`     | 그 밖의 경우                                | `gtmine.db` 커넥션 하나를 공유. `close()`해도 실제로 닫히지 않는 래퍼 |

- SQL 방언 차이는 `SqlDialect`가 처리합니다. 저장소 코드는 DB 종류로 분기하지 않습니다.
- GTDatabase API를 import하는 클래스는 `GTDatabaseBackend` 하나뿐입니다.
- 광산 활성 상태는 `UPDATE` 후 행이 없을 때만 INSERT합니다. upsert로 쓰면 `created_at`까지 덮어쓰기 때문입니다.
