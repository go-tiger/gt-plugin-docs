---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

GTEstate는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다.

| 조건                                    | 저장소                                            | 테이블 이름                               |
| --------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)         | `gt_estate_` 접두사 (`gt_estate_estates`) |
| 그 밖의 경우                            | `plugins/GTEstate/gtestate.db` (SQLite, WAL 모드) | 아래 이름 그대로                          |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTEstate] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTEstate] 데이터베이스: 자체 SQLite(gtestate.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `문자열(64)`는 MySQL에서 `VARCHAR(64)`, `큰 정수`는 `BIGINT`,
SQLite에서는 `INTEGER`입니다.

## estates

| 컬럼                   | 타입              | 설명                                                     |
| ---------------------- | ----------------- | -------------------------------------------------------- |
| `id`                   | 큰 정수 PK        | 자동 증가                                                |
| `name`                 | 문자열(64) UNIQUE | 매물 이름 (최대 64자)                                    |
| `type`                 | 문자열(16)        | `HOUSE`, `CAFE`                                          |
| `price`                | 큰 정수           | 가격                                                     |
| `world`, `x`, `y`, `z` | 문자열(64), 정수  | 표시판 위치. `(world, x, y, z)`에 UNIQUE 제약            |
| `owner_uuid`           | 문자열(36)        | 소유자 UUID. 판매 중이면 NULL. 인덱스 `idx_estate_owner` |
| `owner_name`           | 텍스트            | 소유자 닉네임                                            |
| `purchased_at`         | 큰 정수           | 구매 시각                                                |
| `created_at`           | 큰 정수           | 등록 시각                                                |

`name`의 UNIQUE 제약이 대소문자를 구분하는지는 DB마다 다르지만(SQLite, PostgreSQL은 구분, MySQL 기본 설정은 무시),
플러그인은 등록 전에 대소문자를 무시하고 중복을 검사합니다.

## estate_transactions

거래 이력. `estate_id`에 인덱스 `idx_estate_tx_estate`가 있습니다. 매물을 등록 해제해도 이력은 남습니다. 구매 확정과
소유자 지정, 해제는 이력과 같은 트랜잭션으로 기록되므로, 이력 기록에 실패하면 그 변경도 함께 취소됩니다.

| 컬럼          | 타입       | 설명                 |
| ------------- | ---------- | -------------------- |
| `id`          | 큰 정수 PK | 자동 증가            |
| `estate_id`   | 큰 정수    | 매물 ID              |
| `player_uuid` | 문자열(36) | 대상 플레이어 UUID   |
| `player_name` | 텍스트     | 대상 플레이어 닉네임 |
| `price`       | 큰 정수    | 당시 가격            |
| `action`      | 문자열(16) | 아래 표 참고         |
| `created_at`  | 큰 정수    | 기록 시각            |

| `action`      | 기록 시점           | 비고                                                                        |
| ------------- | ------------------- | --------------------------------------------------------------------------- |
| `BUY`         | 플레이어 구매       |                                                                             |
| `ADMIN_SET`   | `setowner <닉네임>` | 돈이 오가지 않음                                                            |
| `ADMIN_CLEAR` | `setowner none`     | `player_uuid`는 `00000000-0000-0000-0000-000000000000`, `player_name`은 `-` |

등록, 해제, 가격 변경은 이력에 남지 않습니다.

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate estate plugins/GTEstate/gtestate.db
```

옮긴 뒤에는 서버를 재시작해 GTEstate가 공용 DB의 매물을 캐시에 다시 올리게 하세요.

## 여러 서버에서 같은 DB 쓰기

구매 확정은 `owner_uuid IS NULL` 조건부 UPDATE라 두 서버에서 동시에 사도 한 명만 성공하고, 다른 쪽은 환불됩니다.

:::warning 매물 목록은 서버 시작 시 캐시에 올린 것을 씁니다. 다른 서버에서 등록, 해제, 가격 변경한 매물은 재시작할
때까지 보이지 않거나 예전 값으로 보입니다. :::

## 조회 예시

자체 SQLite 기준입니다. 공용 DB에서는 테이블 이름에 `gt_estate_`를 붙이고, 날짜 함수는 그 DB의 것을 쓰세요.

```sql
SELECT e.name, t.action, t.player_name, t.price,
       datetime(t.created_at / 1000, 'unixepoch', 'localtime') AS at
FROM estate_transactions t
JOIN estates e ON e.id = t.estate_id
ORDER BY t.id DESC
LIMIT 20;
```
