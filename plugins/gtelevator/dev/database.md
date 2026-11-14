---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

GTElevator는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다.

| 조건                                    | 저장소                                                | 테이블 이름                                           |
| --------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)             | `gt_elevator_` 접두사 (`gt_elevator_elevator_blocks`) |
| 그 밖의 경우                            | `plugins/GTElevator/gtelevator.db` (SQLite, WAL 모드) | 아래 이름 그대로                                      |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTElevator] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTElevator] 데이터베이스: 자체 SQLite(gtelevator.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `긴 텍스트`는 MySQL에서 `LONGTEXT`, `문자열(64)`는 `VARCHAR(64)`이고,
SQLite에서는 각각 `TEXT`입니다.

## elevator_blocks

설치된 엘리베이터 블록 좌표. 기본 키는 `(world, x, y, z)`이고, 기둥 조회용으로 `(world, x, z)`에 인덱스
`idx_elevator_column`이 있습니다.

| 컬럼          | 타입       | 설명                 |
| ------------- | ---------- | -------------------- |
| `world`       | 문자열(64) | 월드 이름            |
| `x`, `y`, `z` | 정수       | 블록 좌표            |
| `placed_by`   | 텍스트     | 설치한 플레이어 UUID |
| `placed_at`   | 큰 정수    | 설치 시각            |

## elevator_template

엘리베이터 블록 아이템. 항상 `id = 1`인 행 하나만 있습니다.

| 컬럼         | 타입      | 설명                                                            |
| ------------ | --------- | --------------------------------------------------------------- |
| `id`         | 정수 PK   | 항상 1 (`CHECK (id = 1)`)                                       |
| `item_data`  | 긴 텍스트 | Base64로 인코딩한 직렬화 `ItemStack` (PDC 태그, 자동 설명 포함) |
| `updated_at` | 큰 정수   | 등록 시각                                                       |

`CHECK` 제약은 MySQL 8.0.16 미만에서는 무시되지만, 플러그인은 항상 `id = 1`로만 쓰므로 동작에는 차이가 없습니다.

## elevator_floor_names

층 이름. 기본 키는 `(world, x, y, z)`입니다. 엘리베이터 블록을 부수면 함께 지워집니다.

| 컬럼          | 타입       | 설명                               |
| ------------- | ---------- | ---------------------------------- |
| `world`       | 문자열(64) | 월드 이름                          |
| `x`, `y`, `z` | 정수       | 엘리베이터 블록 좌표               |
| `name`        | 텍스트     | 층 이름. 공백, 색상 코드 포함 가능 |

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행하고 서버를
재시작합니다.

```
/gtdatabase migrate elevator plugins/GTElevator/gtelevator.db
```

## 남은 좌표 정리

블록은 없어졌는데 좌표가 남아 있으면, 서버를 끈 상태에서 지웁니다. 공용 DB에서는 테이블 이름에 `gt_elevator_`를
붙이세요.

```sql
DELETE FROM elevator_blocks      WHERE world = 'world' AND x = 100 AND y = 64 AND z = -20;
DELETE FROM elevator_floor_names WHERE world = 'world' AND x = 100 AND y = 64 AND z = -20;
```
