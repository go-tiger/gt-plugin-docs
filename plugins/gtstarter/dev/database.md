---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

GTStarter는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다. `item_data`는
Base64로 인코딩한 직렬화 `ItemStack`(수량 1)입니다.

| 조건                                    | 저장소                                              | 테이블 이름                                   |
| --------------------------------------- | --------------------------------------------------- | --------------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)           | `gt_starter_` 접두사 (`gt_starter_kit_items`) |
| 그 밖의 경우                            | `plugins/GTStarter/gtstarter.db` (SQLite, WAL 모드) | 아래 이름 그대로                              |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTStarter] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTStarter] 데이터베이스: 자체 SQLite(gtstarter.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `긴 텍스트`는 MySQL에서 `LONGTEXT`, `문자열(36)`은 `VARCHAR(36)`이고,
SQLite에서는 각각 `TEXT`입니다.

## kit_items

지급 아이템 목록. 저장할 때마다 한 트랜잭션 안에서 전체를 지우고 다시 넣습니다. 중간에 실패하면 이전 목록이 그대로
남습니다.

| 컬럼        | 타입       | 설명      |
| ----------- | ---------- | --------- |
| `id`        | 큰 정수 PK | 자동 증가 |
| `item_data` | 긴 텍스트  | 아이템    |
| `amount`    | 정수       | 지급 수량 |
| `position`  | 정수       | 목록 순서 |

## granted_players

지급 완료 기록. 행이 있으면 다시 지급하지 않습니다. 이미 행이 있으면 새로 쓰지 않으므로 `granted_at`은 처음 기록한
시각으로 남습니다.

| 컬럼          | 타입          | 설명           |
| ------------- | ------------- | -------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID  |
| `granted_at`  | 큰 정수       | 지급 완료 시각 |

## pending_items

인벤토리가 가득 차 지급하지 못한 보류 아이템. `player_uuid`에 인덱스 `idx_starter_pending_player`가 있습니다. 목록을
바꿀 때는 한 트랜잭션 안에서 지우고 다시 넣으므로, 중간에 실패해도 보류 아이템이 사라지지 않습니다.

| 컬럼          | 타입       | 설명          |
| ------------- | ---------- | ------------- |
| `id`          | 큰 정수 PK | 자동 증가     |
| `player_uuid` | 문자열(36) | 플레이어 UUID |
| `item_data`   | 긴 텍스트  | 아이템        |
| `amount`      | 정수       | 남은 수량     |

보류 아이템은 지급 당시의 목록을 저장합니다. 그 뒤에 지급 목록을 바꿔도 보류 아이템은 바뀌지 않습니다.

## money_grants

소지금 지급 기록.

| 컬럼          | 타입          | 설명          |
| ------------- | ------------- | ------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID |
| `granted_at`  | 큰 정수       | 입금 시각     |

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate starter plugins/GTStarter/gtstarter.db
```

옮긴 뒤에는 서버를 재시작해 GTStarter가 공용 DB의 지급 목록을 다시 불러오게 하세요.

## 여러 서버에서 같은 DB 쓰기

지급 기록을 공유하므로 한 서버에서 받은 플레이어는 다른 서버에서 다시 받지 않습니다. 플레이어는 한 번에 한 서버에만
접속하므로 접속 지급이 겹칠 일은 거의 없습니다.

:::warning 지급 아이템 목록은 서버 시작 시 메모리에 올립니다. 한 서버에서 `/gtstarter edit`로 바꾼 목록은 다른 서버를
재시작할 때까지 반영되지 않고, 그 서버에서 다시 저장하면 다른 서버의 변경을 덮어씁니다. 목록 편집은 한 서버에서만
하세요. :::

## 수동 초기화

특정 플레이어가 다음 접속 때 다시 받게 하려면, 서버를 끈 상태에서 아래 SQL을 실행합니다. 공용 DB에서는 테이블 이름에
`gt_starter_`를 붙이세요. 접속 중인 플레이어라면 `/gtstarter give`를 쓰세요.

```sql
DELETE FROM granted_players WHERE player_uuid = '<UUID>';
DELETE FROM pending_items   WHERE player_uuid = '<UUID>';
DELETE FROM money_grants    WHERE player_uuid = '<UUID>';
```
