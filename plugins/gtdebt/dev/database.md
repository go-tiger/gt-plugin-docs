---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

GTDebt는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다.

| 조건                                    | 저장소                                        | 테이블 이름                                |
| --------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)     | `gt_debt_` 접두사 (`gt_debt_player_debts`) |
| 그 밖의 경우                            | `plugins/GTDebt/gtdebt.db` (SQLite, WAL 모드) | 아래 이름 그대로                           |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTDebt] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTDebt] 데이터베이스: 자체 SQLite(gtdebt.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `문자열(36)`은 MySQL에서 `VARCHAR(36)`, `정수`는 `BIGINT`,
SQLite에서는 `INTEGER`입니다.

## player_debts

플레이어별 빚 잔액.

| 컬럼          | 타입          | 설명             |
| ------------- | ------------- | ---------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID    |
| `debt`        | 정수          | 빚 잔액          |
| `granted_at`  | 정수          | 행 생성 시각     |
| `updated_at`  | 정수          | 마지막 변경 시각 |

최초 접속 시 키가 겹치면 무시하는 INSERT로 만들고, 실제로 들어간 행 수로 최초 여부를 판정합니다. 그래서 여러 서버에서
동시에 접속해도 한 번만 부여됩니다. 접속한 적은 있지만 행이 없는 플레이어에게 증가나 설정을 실행하면 이때 행이 생깁니다.

## debt_transaction_log

모든 증감 이력. `player_uuid`에 인덱스 `idx_debt_tx_player`가 있습니다. 빚 변경과 같은 트랜잭션으로 기록되므로, 이력
기록에 실패하면 그 빚 변경도 함께 취소됩니다.

| 컬럼          | 타입       | 설명                                          |
| ------------- | ---------- | --------------------------------------------- |
| `id`          | 정수 PK    | 자동 증가                                     |
| `player_uuid` | 문자열(36) | 플레이어 UUID                                 |
| `amount`      | 정수       | 부호 있는 증감량 (양수 증가, 음수 감소)       |
| `reason`      | 텍스트     | 아래 표 참고                                  |
| `actor`       | 텍스트     | 실행 주체. 플레이어 이름, `CONSOLE`, `SYSTEM` |
| `created_at`  | 정수       | 기록 시각                                     |

| `reason`         | 기록 시점    | `amount`                                                 |
| ---------------- | ------------ | -------------------------------------------------------- |
| `GRANT`          | 최초 빚 부여 | 부여 금액                                                |
| `ADMIN_INCREASE` | 증가         | 요청 금액                                                |
| `ADMIN_DECREASE` | 감소         | 요청 금액의 음수. 0원으로 깎인 경우에도 요청 금액 그대로 |
| `ADMIN_SET`      | 설정         | 변경 후 - 변경 전                                        |
| `CLEARED`        | 0원 도달     | 0                                                        |

API로 호출해도 `reason`은 `ADMIN_*`로 기록됩니다. 호출한 쪽은 `actor`로 구분하세요.

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate debt plugins/GTDebt/gtdebt.db
```

## 여러 서버에서 같은 DB 쓰기

빚 증감은 "읽은 값이 그대로일 때만 바꾸는" 방식으로 저장합니다. 다른 서버가 그 사이 값을 바꿨으면 다시 읽어 계산하므로,
두 서버에서 동시에 감소해도 한쪽 변경이 사라지지 않습니다.

:::warning 접속 중인 플레이어의 빚 잔액 캐시는 서버마다 따로 있습니다. 다른 서버에서 바뀐 값은 그 서버에서 증감하거나
재접속할 때까지 플레이스홀더와 조회에 반영되지 않을 수 있습니다. :::

## 조회 예시

자체 SQLite 기준입니다. 공용 DB에서는 테이블 이름에 `gt_debt_`를 붙이고, 날짜 함수는 그 DB의 것을 쓰세요.

```sql
-- 플레이어 한 명의 최근 이력
SELECT datetime(created_at / 1000, 'unixepoch', 'localtime') AS at, amount, reason, actor
FROM debt_transaction_log
WHERE player_uuid = '<UUID>'
ORDER BY id DESC
LIMIT 20;
```
