---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

`plugins/GTMine/gtmine.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은 모두 epoch
밀리초입니다.

모든 데이터는 활성화 시 메모리에 올라갑니다. 서버가 켜져 있을 때 DB를 직접 고치면 반영되지 않고 덮어써집니다.

## mine_areas

| 컬럼         | 타입    | 설명                         |
| ------------ | ------- | ---------------------------- |
| `name`       | TEXT PK | 광산 이름                    |
| `active`     | INTEGER | 채굴 모드면 1, 배치 모드면 0 |
| `created_at` | INTEGER | 생성 시각                    |

마커를 설치하거나 `give`, `setarea`로 광산 이름을 쓰면 행이 생깁니다. 광산을 지우는 명령어는 없습니다.

## mine_points

리젠 포인트. 기본 키는 `(world, x, y, z)`이고 `area`에 인덱스가 있습니다.

| 컬럼               | 타입    | 설명                                                      |
| ------------------ | ------- | --------------------------------------------------------- |
| `world`            | TEXT    | 월드 이름                                                 |
| `x`, `y`, `z`      | INTEGER | 블록 좌표                                                 |
| `area`             | TEXT    | 소속 광산                                                 |
| `state`            | TEXT    | `MARKER`, `ORE`, `MINED`. 알 수 없는 값은 `MARKER`로 읽음 |
| `current_material` | TEXT    | 지금 놓인 블록 (`MARKER`이면 NULL)                        |
| `mined_at`         | INTEGER | 캔 시각. 리젠 대기가 아니면 0                             |

## 광산 통째로 지우기

명령어로는 광산을 지울 수 없습니다. 먼저 `/gtmine stop <광산>`으로 배치 모드로 돌리고 마커를 모두 부수는 것이 정상적인
방법입니다. 마커를 하나하나 부술 수 없는 경우에는 서버를 끈 상태에서 지웁니다. 월드에 남은 블록은 직접 정리해야 합니다.

```sql
DELETE FROM mine_points WHERE area = 'deep';
DELETE FROM mine_areas  WHERE name = 'deep';
```
