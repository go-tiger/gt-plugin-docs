---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

`plugins/GTStarter/gtstarter.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은 모두 epoch
밀리초입니다. `item_data`는 Base64로 인코딩한 직렬화 `ItemStack`(수량 1)입니다.

## kit_items

지급 아이템 목록. 저장할 때마다 전체를 지우고 다시 넣습니다.

| 컬럼        | 타입       | 설명      |
| ----------- | ---------- | --------- |
| `id`        | INTEGER PK | 자동 증가 |
| `item_data` | TEXT       | 아이템    |
| `amount`    | INTEGER    | 지급 수량 |
| `position`  | INTEGER    | 목록 순서 |

## granted_players

지급 완료 기록. 행이 있으면 다시 지급하지 않습니다.

| 컬럼          | 타입    | 설명           |
| ------------- | ------- | -------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID  |
| `granted_at`  | INTEGER | 지급 완료 시각 |

## pending_items

인벤토리가 가득 차 지급하지 못한 보류 아이템. `player_uuid`에 인덱스가 있습니다.

| 컬럼          | 타입       | 설명          |
| ------------- | ---------- | ------------- |
| `id`          | INTEGER PK | 자동 증가     |
| `player_uuid` | TEXT       | 플레이어 UUID |
| `item_data`   | TEXT       | 아이템        |
| `amount`      | INTEGER    | 남은 수량     |

보류 아이템은 지급 당시의 목록을 저장합니다. 그 뒤에 지급 목록을 바꿔도 보류 아이템은 바뀌지 않습니다.

## money_grants

소지금 지급 기록.

| 컬럼          | 타입    | 설명          |
| ------------- | ------- | ------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID |
| `granted_at`  | INTEGER | 입금 시각     |

## 수동 초기화

특정 플레이어가 다음 접속 때 다시 받게 하려면, 서버를 끈 상태에서 아래 SQL을 실행합니다. 접속 중인 플레이어라면
`/gtstarter give`를 쓰세요.

```sql
DELETE FROM granted_players WHERE player_uuid = '<UUID>';
DELETE FROM pending_items   WHERE player_uuid = '<UUID>';
DELETE FROM money_grants    WHERE player_uuid = '<UUID>';
```
