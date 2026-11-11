---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

`plugins/GTEstate/gtestate.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은 모두 epoch
밀리초입니다.

## estates

| 컬럼                   | 타입        | 설명                                            |
| ---------------------- | ----------- | ----------------------------------------------- |
| `id`                   | INTEGER PK  | 자동 증가                                       |
| `name`                 | TEXT UNIQUE | 매물 이름                                       |
| `type`                 | TEXT        | `HOUSE`, `CAFE`                                 |
| `price`                | INTEGER     | 가격                                            |
| `world`, `x`, `y`, `z` |             | 표시판 위치. `(world, x, y, z)`에 UNIQUE 인덱스 |
| `owner_uuid`           | TEXT        | 소유자 UUID. 판매 중이면 NULL. 인덱스 있음      |
| `owner_name`           | TEXT        | 소유자 닉네임                                   |
| `purchased_at`         | INTEGER     | 구매 시각                                       |
| `created_at`           | INTEGER     | 등록 시각                                       |

`name`의 UNIQUE 제약은 대소문자를 구분하지만, 플러그인은 등록 전에 대소문자를 무시하고 중복을 검사합니다.

## estate_transactions

거래 이력. `estate_id`에 인덱스가 있습니다. 매물을 등록 해제해도 이력은 남습니다.

| 컬럼          | 타입       | 설명                 |
| ------------- | ---------- | -------------------- |
| `id`          | INTEGER PK | 자동 증가            |
| `estate_id`   | INTEGER    | 매물 ID              |
| `player_uuid` | TEXT       | 대상 플레이어 UUID   |
| `player_name` | TEXT       | 대상 플레이어 닉네임 |
| `price`       | INTEGER    | 당시 가격            |
| `action`      | TEXT       | 아래 표 참고         |
| `created_at`  | INTEGER    | 기록 시각            |

| `action`      | 기록 시점           | 비고                                                                        |
| ------------- | ------------------- | --------------------------------------------------------------------------- |
| `BUY`         | 플레이어 구매       |                                                                             |
| `ADMIN_SET`   | `setowner <닉네임>` | 돈이 오가지 않음                                                            |
| `ADMIN_CLEAR` | `setowner none`     | `player_uuid`는 `00000000-0000-0000-0000-000000000000`, `player_name`은 `-` |

등록, 해제, 가격 변경은 이력에 남지 않습니다.

## 조회 예시

```sql
SELECT e.name, t.action, t.player_name, t.price,
       datetime(t.created_at / 1000, 'unixepoch', 'localtime') AS at
FROM estate_transactions t
JOIN estates e ON e.id = t.estate_id
ORDER BY t.id DESC
LIMIT 20;
```
