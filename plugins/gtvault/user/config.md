---
sidebar_position: 4
title: 설정
---

# 설정

`plugins/GTVault/config.yml`을 수정한 뒤 `/gtvault reload`로 적용합니다.

## settings

| 키                           | 기본값     | 설명                                                                            |
| ---------------------------- | ---------- | ------------------------------------------------------------------------------- |
| `currency-name`              | `기본지갑` | Vault에 등록되는 경제 이름                                                      |
| `currency-suffix`            | `원`       | 금액 뒤에 붙는 단위. 다른 플러그인이 Vault로 금액을 표시할 때 쓰임 (`10,000원`) |
| `fractional-digits`          | `0`        | Vault에 알려 주는 소수점 자릿수                                                 |
| `wallet-name-case-sensitive` | `false`    | 공용 지갑 이름의 대소문자 구분                                                  |

:::note

- 금액은 항상 **정수**로 저장됩니다. 다른 플러그인이 `1500.7`원을 입금하면 반올림해서 `1501`원이 됩니다.
  `fractional-digits`를 바꿔도 소수점 금액을 쓸 수 있게 되지는 않습니다.
- `wallet-name-case-sensitive`는 지갑을 만들기 전에 정해 두세요. 운영 중에 바꾸면 기존 지갑을 찾지 못할 수 있습니다. :::

## messages

`&` 색상 코드를 쓸 수 있습니다. `wallet-list-header`, `wallet-list-entry`, `wallet-top-header`, `wallet-top-entry`를 뺀
메시지 앞에는 `prefix`가 붙습니다. 금액 치환자는 `10,000`처럼 쉼표가 붙어 나옵니다.

**개인 소지금**

| 키                 | 치환자                              | 사용 시점                            |
| ------------------ | ----------------------------------- | ------------------------------------ |
| `prefix`           |                                     | 메시지 앞 접두사                     |
| `no-permission`    |                                     | 권한 없음                            |
| `player-only`      |                                     | 콘솔에서 내 소지금 조회              |
| `money-usage`      |                                     | 형식 오류. 금액이 잘못됐을 때도 나옴 |
| `money-self`       | `%amount%`                          | 내 소지금                            |
| `money-other`      | `%player%`, `%amount%`              | 대상 소지금                          |
| `money-given`      | `%player%`, `%amount%`, `%balance%` | 지급 완료                            |
| `money-taken`      | `%player%`, `%amount%`, `%balance%` | 차감 완료. `%amount%`는 요청한 금액  |
| `money-set`        | `%player%`, `%amount%`              | 설정 완료                            |
| `player-not-found` | `%player%`                          | 접속 이력이 없는 대상                |

`%player%`에는 명령어에 입력한 그대로(닉네임 또는 UUID)가 들어갑니다.

**공용 지갑**

| 키                      | 치환자                            | 사용 시점                                    |
| ----------------------- | --------------------------------- | -------------------------------------------- |
| `wallet-usage`          |                                   | 형식 오류. 금액이 잘못됐을 때도 나옴         |
| `wallet-created`        | `%name%`                          | 생성                                         |
| `wallet-already-exists` |                                   | 같은 이름이 이미 있음                        |
| `wallet-name-too-long`  | `%max%`                           | 이름이 최대 길이(64자)를 넘음                |
| `wallet-not-found`      | `%name%`                          | 없는 지갑                                    |
| `wallet-enabled`        | `%name%`                          | 활성화                                       |
| `wallet-disabled`       | `%name%`                          | 비활성화                                     |
| `wallet-disabled-block` | `%name%`                          | 비활성 지갑에 입출금 시도                    |
| `wallet-delete-confirm` | `%name%`, `%balance%`             | 삭제 확인 요청                               |
| `wallet-deleted`        | `%name%`                          | 삭제 완료                                    |
| `wallet-balance`        | `%name%`, `%amount%`              | 잔고                                         |
| `wallet-given`          | `%name%`, `%amount%`, `%balance%` | 입금 완료                                    |
| `wallet-taken`          | `%name%`, `%amount%`, `%balance%` | 출금 완료                                    |
| `wallet-set`            | `%name%`, `%amount%`              | 설정 완료                                    |
| `wallet-list-header`    |                                   | 목록 제목                                    |
| `wallet-list-entry`     | `%name%`, `%balance%`, `%status%` | 목록 항목. `%status%`는 `활성` 또는 `비활성` |
| `wallet-list-empty`     |                                   | 지갑 없음                                    |
| `wallet-top-header`     | `%name%`                          | 순위 제목                                    |
| `wallet-top-entry`      | `%rank%`, `%player%`, `%amount%`  | 순위 항목                                    |
| `reloaded`              |                                   | 다시 불러오기 완료                           |

## 기본 설정 파일

```yaml
settings:
  currency-name: '기본지갑'
  currency-suffix: '원'
  fractional-digits: 0
  wallet-name-case-sensitive: false

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'

  money-usage: '&7사용법: &f/gtvault money <지급|차감|설정|조회> <대상> [금액]'
  money-self: '&f소지금: &a%amount%원'
  money-other: '&f%player%의 소지금: &a%amount%원'
  money-given: '&a%player%에게 %amount%원을 지급했습니다. &7(현재 %balance%원)'
  money-taken: '&c%player%에게서 %amount%원을 차감했습니다. &7(현재 %balance%원)'
  money-set: '&e%player%의 소지금을 %amount%원으로 설정했습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'

  wallet-usage: '&7사용법: &f/gtvault wallet <create|enable|disable|delete|list|balance|give|take|set|top> ...'
  wallet-created: '&a지갑 &e%name%&a을(를) 생성했습니다. &7(기본 비활성 상태)'
  wallet-already-exists: '&c이미 존재하는 지갑입니다.'
  wallet-name-too-long: '&c지갑 이름은 %max%자 이하로 입력해주세요.'
  wallet-not-found: '&c%name% 지갑을 찾을 수 없습니다.'
  wallet-enabled: '&a지갑 &e%name%&a을(를) 활성화했습니다.'
  wallet-disabled: '&7지갑 &e%name%&7을(를) 비활성화했습니다.'
  wallet-disabled-block: '&c%name% 지갑은 비활성화 상태라 입출금할 수 없습니다.'
  wallet-delete-confirm:
    '&e정말로 &c%name%&e 지갑을 삭제하시겠습니까? 현재 잔고 %balance%원이 사라집니다. &710초 내에 같은 명령어를 다시
    입력해 확인해주세요.'
  wallet-deleted: '&c지갑 &e%name%&c을(를) 삭제했습니다.'
  wallet-balance: '&f%name% 잔고: &b%amount%원'
  wallet-given: '&a%name% 지갑에 %amount%원을 지급했습니다. &7(현재 %balance%원)'
  wallet-taken: '&c%name% 지갑에서 %amount%원을 차감했습니다. &7(현재 %balance%원)'
  wallet-set: '&e%name% 지갑을 %amount%원으로 설정했습니다.'
  wallet-list-header: '&6─── 지갑 목록 ───'
  wallet-list-entry: '&f%name% &8| &b%balance%원 &8| %status%'
  wallet-list-empty: '&7생성된 지갑이 없습니다.'
  wallet-top-header: '&6─── %name% 기여 순위 ───'
  wallet-top-entry: '&f%rank%. %player% &7- %amount%원'

  reloaded: '&a설정을 다시 불러왔습니다.'
```
