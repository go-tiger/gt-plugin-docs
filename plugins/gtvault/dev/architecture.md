---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 패키지                | 역할                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTVault` | 메인 클래스. 캐시 로드, Vault 등록, `getWalletService()` 제공                                                     |
| `command`             | `/gtvault`, `/소지금`. 개인 소지금(`MoneyCommand`)과 지갑(`WalletCommand`) 로직 분리                              |
| `database`            | DB 백엔드(GTDatabase 공용 또는 자체 SQLite) 선택, 단일 DB 스레드, 테이블별 저장소, `Wallet`, `WalletContribution` |
| `economy`             | 개인 소지금(`BalanceService`), 공용 지갑(`WalletService`), Vault 구현체(`VaultEconomyProvider`)                   |
| `target`              | 이름 또는 UUID 문자열을 UUID로 변환(`TargetResolver`)                                                             |
| `util`                | 메시지, 숫자 포맷                                                                                                 |

## 캐시 우선 쓰기

Vault API는 `getBalance()`, `withdrawPlayer()` 등의 결과를 **즉시 동기로** 돌려줘야 합니다. 그래서 GTVault는 모든 잔고를
메모리에 두고 메모리에서 바로 처리합니다.

```
Vault 호출 / 명령어
  │  UUID(또는 지갑 키)별 ReentrantLock
  │  메모리 캐시에서 계산하고 바로 반영
  ▼  결과 즉시 반환
  └─▶ DB 스레드: 잔고 증감 + 거래 로그를 한 트랜잭션으로 (비동기)
```

- 서버 시작 시 모든 개인 잔고와 지갑을 DB에서 읽어 캐시에 올립니다. 이 작업이 끝날 때까지 `onEnable`이
  기다립니다(`join()`).
- 같은 대상의 잔고 변경은 락으로 직렬화됩니다. 그래서 출금은 "확인한 뒤 차감"이 아니라 락 안에서 비교와 차감을 한 번에
  합니다(`withdrawIfSufficient`).
- DB에는 계산한 잔고를 덮어쓰지 않고 증감분을 더합니다(`balance = balance + ?`). 관리자 `set`만 값을 덮어씁니다.
- 종료 시 DB 스레드에 남은 쓰기를 최대 10초 기다립니다. 서버가 비정상 종료되면 마지막 몇 건의 변경이 DB에 저장되지 않을
  수 있습니다.

## DB 백엔드

`DatabaseManager`는 활성화할 때 `DbBackend` 구현을 하나 고릅니다.

| 구현                | 선택 조건                                   | 커넥션                                                                 |
| ------------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `GTDatabaseBackend` | GTDatabase가 켜져 있고 서비스가 등록돼 있음 | 작업마다 공용 풀에서 빌리고 반납. 종료 시 풀은 닫지 않음               |
| `SqliteBackend`     | 그 밖의 경우                                | `gtvault.db` 커넥션 하나를 공유. `close()`해도 실제로 닫히지 않는 래퍼 |

- SQL 방언 차이는 `SqlDialect`(upsert, `upsertAdd`, `insertIgnore`, 타입 이름 등)가 처리합니다. 저장소 코드는 DB 종류로
  분기하지 않습니다.
- GTDatabase API를 import하는 클래스는 `GTDatabaseBackend` 하나뿐입니다. GTDatabase가 없는 서버에서
  `NoClassDefFoundError`가 나지 않게 하기 위해서입니다.
- 여러 SQL을 함께 바꾸는 작업은 `DatabaseManager.inTransaction()`으로 묶습니다.

## 개인 소지금

| 메서드                 | 동작                                                            |
| ---------------------- | --------------------------------------------------------------- |
| `add`                  | 증가. 0 이하는 무시                                             |
| `remove`               | 감소. 잔고가 부족하면 0으로 맞춤 (명령어 `차감`)                |
| `withdrawIfSufficient` | 잔고가 충분할 때만 감소. 부족하면 실패 (Vault `withdrawPlayer`) |
| `set`                  | 설정. 음수는 0                                                  |

캐시에 없는 플레이어는 0원입니다. 처음 돈이 들어올 때 DB에 행이 생깁니다.

## Vault 구현

`VaultEconomyProvider`는 `net.milkbowl.vault.economy.Economy`를 구현하고 `ServicePriority.Normal`로 등록합니다.

| 항목                                | 동작                                                                  |
| ----------------------------------- | --------------------------------------------------------------------- |
| 금액                                | `Math.round()`로 정수로 바꿔 처리                                     |
| `hasAccount`, `createPlayerAccount` | 항상 `true`                                                           |
| 월드별 메서드                       | 월드를 무시하고 같은 잔고 사용                                        |
| `format()`                          | `10,000원` 형식                                                       |
| 은행(Bank) 메서드                   | 전부 `NOT_IMPLEMENTED`                                                |
| 문자열 대상                         | UUID 형식이면 UUID로, 아니면 닉네임으로 조회. 접속 이력이 없으면 실패 |

거래 로그의 `actor`는 `VAULT`로 기록됩니다. 어느 플러그인이 호출했는지는 남지 않습니다.

## 공용 지갑

- 캐시 키는 지갑 이름을 정규화한 값입니다(`wallet-name-case-sensitive: false`이면 소문자). 표시용 원래 이름은
  `Wallet.name()`에 따로 보관합니다.
- 활성 여부는 명령어 계층에서만 확인합니다. `WalletService.give()`, `take()`, `set()`은 비활성 지갑에도 동작합니다.
- 기여도는 `give()`에 기여자 UUID를 넘겼을 때만 누적됩니다.
