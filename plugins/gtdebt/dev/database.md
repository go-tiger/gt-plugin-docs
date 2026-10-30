---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

`plugins/GTDebt/gtdebt.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은 모두 epoch
밀리초입니다.

## player_debts

플레이어별 빚 잔액.

| 컬럼          | 타입    | 설명             |
| ------------- | ------- | ---------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID    |
| `debt`        | INTEGER | 빚 잔액          |
| `granted_at`  | INTEGER | 행 생성 시각     |
| `updated_at`  | INTEGER | 마지막 변경 시각 |

최초 접속 시 `INSERT OR IGNORE`로 만들기 때문에 중복 생성되지 않습니다. 접속한 적은 있지만 행이 없는 플레이어에게 증가나
설정을 실행하면 이때 행이 생깁니다.

## debt_transaction_log

모든 증감 이력. `player_uuid`에 인덱스가 있습니다.

| 컬럼          | 타입       | 설명                                          |
| ------------- | ---------- | --------------------------------------------- |
| `id`          | INTEGER PK | 자동 증가                                     |
| `player_uuid` | TEXT       | 플레이어 UUID                                 |
| `amount`      | INTEGER    | 부호 있는 증감량 (양수 증가, 음수 감소)       |
| `reason`      | TEXT       | 아래 표 참고                                  |
| `actor`       | TEXT       | 실행 주체. 플레이어 이름, `CONSOLE`, `SYSTEM` |
| `created_at`  | INTEGER    | 기록 시각                                     |

| `reason`         | 기록 시점    | `amount`                                                 |
| ---------------- | ------------ | -------------------------------------------------------- |
| `GRANT`          | 최초 빚 부여 | 부여 금액                                                |
| `ADMIN_INCREASE` | 증가         | 요청 금액                                                |
| `ADMIN_DECREASE` | 감소         | 요청 금액의 음수. 0원으로 깎인 경우에도 요청 금액 그대로 |
| `ADMIN_SET`      | 설정         | 변경 후 - 변경 전                                        |
| `CLEARED`        | 0원 도달     | 0                                                        |

API로 호출해도 `reason`은 `ADMIN_*`로 기록됩니다. 호출한 쪽은 `actor`로 구분하세요.

## 조회 예시

```sql
-- 플레이어 한 명의 최근 이력
SELECT datetime(created_at / 1000, 'unixepoch', 'localtime') AS at, amount, reason, actor
FROM debt_transaction_log
WHERE player_uuid = '<UUID>'
ORDER BY id DESC
LIMIT 20;
```
