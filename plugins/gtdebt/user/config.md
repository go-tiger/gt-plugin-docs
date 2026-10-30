---
sidebar_position: 4
title: 설정
---

# 설정

`plugins/GTDebt/config.yml`을 수정한 뒤 `/gtdebt reload`로 적용합니다. 서버를 재시작할 필요는 없습니다.

## settings

| 키             | 기본값     | 설명                                                                                |
| -------------- | ---------- | ----------------------------------------------------------------------------------- |
| `default-debt` | `10000000` | 처음 접속한 플레이어에게 부여할 빚. 이미 데이터가 있는 플레이어에게는 적용되지 않음 |

## messages

`&` 색상 코드를 쓸 수 있습니다. 명령어 응답 앞에는 `prefix`가 붙습니다.

| 키                     | 치환자                              | 사용 시점                                                  |
| ---------------------- | ----------------------------------- | ---------------------------------------------------------- |
| `prefix`               |                                     | 명령어 응답 앞에 붙는 접두사                               |
| `no-permission`        |                                     | 권한 없음                                                  |
| `player-only`          |                                     | 현재 사용하지 않음                                         |
| `player-not-found`     | `%player%`                          | 접속 이력이 없는 닉네임                                    |
| `amount-invalid`       |                                     | 금액 형식 오류                                             |
| `debt-query`           | `%player%`, `%amount%`              | 조회 결과                                                  |
| `debt-increased`       | `%player%`, `%amount%`, `%balance%` | 증가 완료. `%amount%`는 증가량, `%balance%`는 변경 후 잔액 |
| `debt-decreased`       | `%player%`, `%amount%`, `%balance%` | 감소 완료                                                  |
| `debt-set`             | `%player%`, `%amount%`              | 설정 완료. `%amount%`는 설정한 금액                        |
| `debt-already-cleared` | `%player%`                          | 이미 0원인 플레이어에게 감소 시도                          |
| `cleared-title`        |                                     | 완납 타이틀                                                |
| `cleared-subtitle`     |                                     | 완납 서브타이틀                                            |
| `cleared-chat`         | `%player%`                          | 완납 시 전체 채팅 (prefix 없음)                            |
| `reloaded`             |                                     | 설정 다시 불러오기 완료                                    |

금액 치환자는 `10,000,000`처럼 천 단위 쉼표가 붙어 나옵니다.

명령어 사용법 안내(`사용법: /빚증가 <닉네임> <금액>` 등)는 플러그인에 고정되어 있어 설정으로 바꿀 수 없습니다.

## placeholder

| 키              | 기본값  | 설명                                              |
| --------------- | ------- | ------------------------------------------------- |
| `cleared-true`  | `true`  | `%gtdebt_iscleared%`가 완납 상태일 때 표시할 문구 |
| `cleared-false` | `false` | 완납 전일 때 표시할 문구                          |

## 기본 설정 파일

```yaml
settings:
  default-debt: 10000000

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  amount-invalid: '&c금액은 0보다 큰 정수여야 합니다.'

  debt-query: '&f%player%님의 빚: &c%amount%원'
  debt-decreased: '&a%player%님의 빚을 &e%amount%원&a만큼 감소시켰습니다. &7(현재 %balance%원)'
  debt-increased: '&c%player%님의 빚을 &e%amount%원&c만큼 증가시켰습니다. &7(현재 %balance%원)'
  debt-set: '&e%player%님의 빚을 %amount%원으로 설정했습니다.'
  debt-already-cleared: '&e%player%님은 이미 완납한 상태입니다.'

  cleared-title: '&a완납!'
  cleared-subtitle: '&f빚을 모두 갚았습니다'
  cleared-chat: '&a&l[완납] &f%player%님이 빚을 모두 갚았습니다!'

  reloaded: '&a설정을 다시 불러왔습니다.'

placeholder:
  cleared-true: 'true'
  cleared-false: 'false'
```
