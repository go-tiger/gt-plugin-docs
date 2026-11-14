---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

GTVault는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다.

| 조건                                    | 저장소                                          | 테이블 이름                                     |
| --------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)       | `gt_vault_` 접두사 (`gt_vault_player_balances`) |
| 그 밖의 경우                            | `plugins/GTVault/gtvault.db` (SQLite, WAL 모드) | 아래 이름 그대로                                |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTVault] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTVault] 데이터베이스: 자체 SQLite(gtvault.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `문자열(36)`은 MySQL에서 `VARCHAR(36)`, `정수`는 `BIGINT`,
SQLite에서는 `INTEGER`입니다.

:::danger 서버가 켜져 있을 때 DB를 직접 수정하지 마세요. GTVault는 메모리 캐시를 기준으로 동작하므로, 직접 바꾼 값은
무시되고 다음 변경 때 덮어써집니다. 꼭 고쳐야 하면 서버를 끈 상태에서 하세요. :::

## player_balances

| 컬럼          | 타입          | 설명             |
| ------------- | ------------- | ---------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID    |
| `balance`     | 정수          | 소지금           |
| `updated_at`  | 정수          | 마지막 변경 시각 |

## wallets

| 컬럼         | 타입          | 설명                              |
| ------------ | ------------- | --------------------------------- |
| `name`       | 문자열(64) PK | 지갑 이름 (만들 때 입력한 그대로) |
| `balance`    | 정수          | 잔고                              |
| `enabled`    | 정수          | 활성 여부 (0, 1)                  |
| `created_at` | 정수          | 생성 시각                         |

## wallet_contributions

지갑별 개인 누적 입금액. 기본 키는 `(wallet_name, player_uuid)`이고 `(wallet_name, contributed DESC)`에 인덱스
`idx_vault_contrib_wallet`이 있습니다. 지갑을 삭제하면 함께 지워집니다.

| 컬럼          | 타입       | 설명                            |
| ------------- | ---------- | ------------------------------- |
| `wallet_name` | 문자열(64) | 지갑 이름                       |
| `player_uuid` | 문자열(36) | 기여자 UUID                     |
| `contributed` | 정수       | 누적 입금액. 출금해도 줄지 않음 |

## transaction_log

개인과 지갑 공통 거래 로그. `(target_type, target_id)`에 인덱스 `idx_vault_txlog_target`이 있습니다. 잔고 변경과 같은
트랜잭션으로 기록되므로, 로그 기록에 실패하면 그 잔고 변경도 함께 취소됩니다.

| 컬럼          | 타입       | 설명                                                         |
| ------------- | ---------- | ------------------------------------------------------------ |
| `id`          | 정수 PK    | 자동 증가                                                    |
| `target_type` | 문자열(16) | `PLAYER`, `WALLET`                                           |
| `target_id`   | 문자열(64) | 플레이어 UUID 또는 지갑 이름                                 |
| `amount`      | 정수       | 부호 있는 증감량                                             |
| `reason`      | 텍스트     | 아래 표 참고                                                 |
| `actor`       | 텍스트     | 플레이어 이름, `CONSOLE`, `VAULT`, 또는 API 호출자가 넘긴 값 |
| `created_at`  | 정수       | 기록 시각                                                    |

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

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate vault plugins/GTVault/gtvault.db
```

옮긴 뒤에는 서버를 재시작해 GTVault가 공용 DB의 잔고를 캐시에 다시 올리게 하세요.

## 여러 서버에서 같은 DB 쓰기

:::danger 여러 서버가 같은 공용 DB(MySQL 등)를 함께 쓰는 구성은 **권장하지 않습니다.** 각 서버는 시작할 때 읽은 메모리
캐시로 잔고를 조회하고 잔고 부족을 판정하므로, 다른 서버에서 바뀐 잔고를 모릅니다. 한 플레이어가 두 서버에서 동시에 돈을
쓰면 캐시 기준으로는 둘 다 성공할 수 있습니다. :::

DB 쪽 값은 덮어쓰지 않고 증감분을 더하는 방식으로 저장하므로, 다른 서버의 변경분이 사라지지는 않습니다. DB 잔고가
캐시보다 적어 차감할 수 없을 때는 0으로 맞추고 서버 로그에 `DB 잔고가 메모리 캐시보다 적어 0으로 맞춥니다` 경고를
남깁니다.

## 조회 예시

자체 SQLite 기준입니다. 공용 DB에서는 테이블 이름에 `gt_vault_`를 붙이고, 날짜 함수는 그 DB의 것을 쓰세요.

```sql
-- 플레이어 한 명의 최근 거래
SELECT datetime(created_at / 1000, 'unixepoch', 'localtime') AS at, amount, reason, actor
FROM transaction_log
WHERE target_type = 'PLAYER' AND target_id = '<UUID>'
ORDER BY id DESC
LIMIT 20;
```
