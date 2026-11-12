---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

`plugins/GTElevator/gtelevator.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은 모두 epoch
밀리초입니다.

## elevator_blocks

설치된 엘리베이터 블록 좌표. 기본 키는 `(world, x, y, z)`이고, 기둥 조회용으로 `(world, x, z)`에 인덱스가 있습니다.

| 컬럼          | 타입    | 설명                 |
| ------------- | ------- | -------------------- |
| `world`       | TEXT    | 월드 이름            |
| `x`, `y`, `z` | INTEGER | 블록 좌표            |
| `placed_by`   | TEXT    | 설치한 플레이어 UUID |
| `placed_at`   | INTEGER | 설치 시각            |

## elevator_template

엘리베이터 블록 아이템. 항상 `id = 1`인 행 하나만 있습니다.

| 컬럼         | 타입       | 설명                                                            |
| ------------ | ---------- | --------------------------------------------------------------- |
| `id`         | INTEGER PK | 항상 1 (`CHECK (id = 1)`)                                       |
| `item_data`  | TEXT       | Base64로 인코딩한 직렬화 `ItemStack` (PDC 태그, 자동 설명 포함) |
| `updated_at` | INTEGER    | 등록 시각                                                       |

## elevator_floor_names

층 이름. 기본 키는 `(world, x, y, z)`입니다. 엘리베이터 블록을 부수면 함께 지워집니다.

| 컬럼          | 타입    | 설명                 |
| ------------- | ------- | -------------------- |
| `world`       | TEXT    | 월드 이름            |
| `x`, `y`, `z` | INTEGER | 엘리베이터 블록 좌표 |
| `name`        | TEXT    | 층 이름              |

## 남은 좌표 정리

블록은 없어졌는데 좌표가 남아 있으면, 서버를 끈 상태에서 지웁니다.

```sql
DELETE FROM elevator_blocks      WHERE world = 'world' AND x = 100 AND y = 64 AND z = -20;
DELETE FROM elevator_floor_names WHERE world = 'world' AND x = 100 AND y = 64 AND z = -20;
```
