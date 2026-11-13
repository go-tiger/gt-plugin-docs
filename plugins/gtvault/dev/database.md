---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

`plugins/GTVault/gtvault.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은 모두 epoch
밀리초입니다.

:::danger 서버가 켜져 있을 때 DB를 직접 수정하지 마세요. GTVault는 메모리 캐시를 기준으로 동작하므로, 직접 바꾼 값은
무시되고 다음 변경 때 덮어써집니다. 꼭 고쳐야 하면 서버를 끈 상태에서 하세요. :::

## player_balances

| 컬럼          | 타입    | 설명             |
| ------------- | ------- | ---------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID    |
| `balance`     | INTEGER | 소지금           |
| `updated_at`  | INTEGER | 마지막 변경 시각 |

## wallets

| 컬럼         | 타입    | 설명                              |
| ------------ | ------- | --------------------------------- |
| `name`       | TEXT PK | 지갑 이름 (만들 때 입력한 그대로) |
| `balance`    | INTEGER | 잔고                              |
| `enabled`    | INTEGER | 활성 여부 (0, 1)                  |
| `created_at` | INTEGER | 생성 시각                         |

## wallet_contributions

지갑별 개인 누적 입금액. 기본 키는 `(wallet_name, player_uuid)`이고 `(wallet_name, contributed DESC)`에 인덱스가
있습니다. 지갑을 삭제하면 함께 지워집니다.

| 컬럼          | 타입    | 설명                            |
| ------------- | ------- | ------------------------------- |
| `wallet_name` | TEXT    | 지갑 이름                       |
| `player_uuid` | TEXT    | 기여자 UUID                     |
| `contributed` | INTEGER | 누적 입금액. 출금해도 줄지 않음 |

## transaction_log

개인과 지갑 공통 거래 로그. `(target_type, target_id)`에 인덱스가 있습니다.

| 컬럼          | 타입       | 설명                                                         |
| ------------- | ---------- | ------------------------------------------------------------ |
| `id`          | INTEGER PK | 자동 증가                                                    |
| `target_type` | TEXT       | `PLAYER`, `WALLET`                                           |
| `target_id`   | TEXT       | 플레이어 UUID 또는 지갑 이름                                 |
| `amount`      | INTEGER    | 부호 있는 증감량                                             |
| `reason`      | TEXT       | 아래 표 참고                                                 |
| `actor`       | TEXT       | 플레이어 이름, `CONSOLE`, `VAULT`, 또는 API 호출자가 넘긴 값 |
| `created_at`  | INTEGER    | 기록 시각                                                    |

| `reason`         | 기록 시점                                             |
| ---------------- | ----------------------------------------------------- |
| `ADMIN_GIVE`     | 명령어 지급, 지갑 `give`                              |
| `ADMIN_TAKE`     | 명령어 차감, 지갑 `take`                              |
| `ADMIN_SET`      | 명령어 설정, 지갑 `set`                               |
| `VAULT_DEPOSIT`  | Vault `depositPlayer`                                 |
| `VAULT_WITHDRAW` | Vault `withdrawPlayer`                                |
| `WALLET_DELETED` | 잔고가 남은 지갑 삭제 (`amount`는 삭제된 잔고의 음수) |

- `amount`는 **요청한 증감량**입니다. 차감할 때 잔고가 부족해 0원으로 맞춰진 경우에도 요청 금액이 그대로 기록됩니다.
- 증감량이 0이면 기록하지 않습니다.
- API로 지갑을 바꿔도 `reason`은 `ADMIN_*`로 기록됩니다.

## 조회 예시

```sql
-- 플레이어 한 명의 최근 거래
SELECT datetime(created_at / 1000, 'unixepoch', 'localtime') AS at, amount, reason, actor
FROM transaction_log
WHERE target_type = 'PLAYER' AND target_id = '<UUID>'
ORDER BY id DESC
LIMIT 20;
```
