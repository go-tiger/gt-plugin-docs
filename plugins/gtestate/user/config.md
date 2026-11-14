---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTEstate/config.yml`을 수정한 뒤 `/gtestate reload`로 적용합니다.

## settings

| 키                   | 기본값 | 설명                                                                                       |
| -------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `exact-amount`       | `true` | `true`: 소지금이 가격과 정확히 같을 때만 구매<br/>`false`: 소지금이 가격 이상이면 구매     |
| `max-owned`          | `0`    | 한 플레이어가 소유할 수 있는 전체 매물 수. `0`이면 무제한                                  |
| `max-owned-house`    | `1`    | 소유할 수 있는 집(HOUSE) 수. `0`이면 무제한                                                |
| `max-owned-cafe`     | `1`    | 소유할 수 있는 카페(CAFE) 수. `0`이면 무제한                                               |
| `broadcast-purchase` | `true` | 구매하면 서버 전체에 `purchase-broadcast` 알림                                             |
| `sneak-to-inspect`   | `true` | 웅크린 채 우클릭하면 구매하지 않고 정보만 표시. 좌클릭은 이 설정과 상관없이 항상 정보 조회 |

## economy

| 키              | 기본값 | 설명                                                                                                                                                                                        |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | `auto` | `auto`: Vault 경제가 있으면 사용, 없으면 구매 비활성<br/>`true`: 반드시 사용. 경제 서비스가 늦게 등록되면 `retry-seconds` 동안 매초 다시 연결 시도<br/>`false`: 구매 비활성 (표시판 표시만) |
| `retry-seconds` | `10`   | `enabled: true`일 때 재시도할 시간(초)                                                                                                                                                      |

Skript 등으로 경제를 늦게 등록하는 서버라면 `enabled: true`로 두세요. 이 설정은 서버를 재시작해야 적용됩니다.

## sign-format

표시판 4줄의 형식입니다. 색상 코드와 아래 치환자를 쓸 수 있습니다. 4줄보다 적게 쓰면 나머지 줄은 비워집니다.

| 치환자    | 내용                             |
| --------- | -------------------------------- |
| `%name%`  | 매물 이름                        |
| `%price%` | 가격 (`500,000` 형식)            |
| `%type%`  | `type-names`의 종류 이름         |
| `%owner%` | 소유자 닉네임. 판매 중이면 빈 칸 |

| 키         | 사용 시점 |
| ---------- | --------- |
| `for-sale` | 판매 중   |
| `sold`     | 판매 완료 |

한 줄은 치환과 색상 적용 후 **15자**에서 잘립니다. 색상 코드 하나(`§1` 등)도 2자로 셉니다.

## type-names

| 키      | 기본값 |
| ------- | ------ |
| `HOUSE` | `집`   |
| `CAFE`  | `카페` |

표시판의 `%type%`, 정보 조회, 목록에 쓰입니다. 매물 종류는 HOUSE와 CAFE 두 가지로 고정되어 있어서, 여기에 새 키를
추가해도 종류가 늘어나지 않습니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. `info-*` 메시지를 뺀 나머지 앞에는 `prefix`가 붙습니다. 금액 치환자는 `500,000`처럼
쉼표가 붙어 나옵니다.

**구매**

| 키                      | 치환자                 | 사용 시점                                                     |
| ----------------------- | ---------------------- | ------------------------------------------------------------- |
| `purchase-success`      | `%name%`, `%price%`    | 구매 성공                                                     |
| `purchase-broadcast`    | `%player%`, `%name%`   | 구매 전체 알림                                                |
| `purchase-failed`       |                        | 구매 처리 실패 (환불됨). 매물 등록 실패 때도 이 메시지가 나옴 |
| `purchase-busy`         |                        | 다른 사람이 같은 매물을 구매 처리 중                          |
| `price-mismatch`        |                        | 소지금이 조건에 맞지 않음                                     |
| `price-mismatch-detail` | `%price%`, `%balance%` | `price-mismatch` 다음 줄                                      |
| `already-sold`          | `%owner%`              | 이미 팔린 매물                                                |
| `already-owned`         |                        | 내가 이미 소유한 매물                                         |
| `economy-unavailable`   |                        | 경제 연동 없음                                                |
| `max-owned-reached`     | `%max%`                | 최대 소유 수 도달                                             |

**정보 조회** (prefix 없음)

| 키                    | 치환자      |
| --------------------- | ----------- |
| `info-header`         | `%name%`    |
| `info-type`           | `%type%`    |
| `info-price`          | `%price%`   |
| `info-status-sale`    |             |
| `info-status-sold`    | `%owner%`   |
| `info-balance`        | `%balance%` |
| `info-shortage`       | `%amount%`  |
| `info-exact-required` |             |

`info-balance`, `info-shortage`, `info-exact-required`는 표시판 클릭으로 조회할 때만, 판매 중이고 경제 연동이 있을 때만
나옵니다. `/gtestate info`에서는 나오지 않습니다.

**관리자**

| 키                        | 치환자                                   | 사용 시점                     |
| ------------------------- | ---------------------------------------- | ----------------------------- |
| `no-permission`           |                                          | 권한 없음                     |
| `player-only`             |                                          | 콘솔에서 `create` 실행        |
| `usage`                   |                                          | 명령어 형식 오류              |
| `reloaded`                |                                          | 다시 불러오기 완료            |
| `player-not-found`        | `%player%`                               | 접속 이력이 없는 닉네임       |
| `sign-not-found`          |                                          | 바라보는 곳에 표시판 없음     |
| `sign-already-registered` | `%name%`                                 | 이미 등록된 표시판            |
| `sign-protected`          |                                          | 등록된 표시판 파괴 시도       |
| `estate-created`          | `%name%`, `%type%`, `%price%`            | 등록 완료                     |
| `estate-removed`          | `%name%`                                 | 등록 해제 완료                |
| `estate-not-found`        | `%name%`                                 | 없는 매물 이름                |
| `estate-name-duplicate`   |                                          | 같은 이름이 이미 있음         |
| `estate-name-too-long`    | `%max%`                                  | 이름이 최대 길이(64자)를 넘음 |
| `price-updated`           | `%name%`, `%price%`                      | 가격 변경 완료                |
| `price-invalid`           |                                          | 가격이 1 이상의 정수가 아님   |
| `owner-set`               | `%name%`, `%player%`                     | 소유자 지정 완료              |
| `owner-cleared`           | `%name%`                                 | 판매 중으로 변경 완료         |
| `type-invalid`            |                                          | 종류가 HOUSE, CAFE가 아님     |
| `list-header`             | `%count%`                                | 목록 제목                     |
| `list-entry-sale`         | `%name%`, `%type%`, `%price%`            | 판매 중 항목                  |
| `list-entry-sold`         | `%name%`, `%type%`, `%price%`, `%owner%` | 판매 완료 항목                |
| `list-empty`              |                                          | 매물 없음                     |

## 기본 설정 파일

```yaml
settings:
  exact-amount: true
  max-owned: 0
  max-owned-house: 1
  max-owned-cafe: 1
  broadcast-purchase: true
  sneak-to-inspect: true

economy:
  enabled: auto
  retry-seconds: 10

sign-format:
  for-sale:
    - '&1&l[매매]'
    - '&0%name%'
    - '&2&l%price%원'
    - '&8우클릭하여 구매'
  sold:
    - '&4&l[판매완료]'
    - '&0%name%'
    - '&8소유자'
    - '&0%owner%'

type-names:
  HOUSE: '집'
  CAFE: '카페'

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&7사용법: &f/gtestate <create|remove|setprice|setowner|list|info|reload>'

  purchase-success: '&a%name% &a매물을 &e%price%원&a에 구매했습니다!'
  purchase-broadcast: '&e%player% &7님이 &f%name% &7매물을 구매했습니다!'
  purchase-failed: '&c구매 처리에 실패했습니다. 관리자에게 문의해주세요.'
  purchase-busy: '&c다른 플레이어가 구매를 진행 중입니다. 잠시 후 시도해주세요.'
  price-mismatch: '&c금액이 맞지 않습니다.'
  price-mismatch-detail: '&7필요한 금액: &e%price%원 &7/ 내 소지금: &e%balance%원'
  already-sold: '&c이미 판매된 매물입니다. (소유자: %owner%)'
  already-owned: '&e이미 소유하고 있는 매물입니다.'
  economy-unavailable: '&c경제 시스템을 사용할 수 없어 구매가 불가능합니다.'
  max-owned-reached: '&c더 이상 매물을 소유할 수 없습니다. (최대 %max%개)'

  info-header: '&6─── %name% ───'
  info-type: '&7종류: &f%type%'
  info-price: '&7가격: &e%price%원'
  info-status-sale: '&7상태: &a판매 중'
  info-status-sold: '&7상태: &c판매 완료 &7(소유자: &f%owner%&7)'
  info-balance: '&7내 소지금: &e%balance%원'
  info-shortage: '&7부족한 금액: &c%amount%원'
  info-exact-required: '&7소지금이 가격과 정확히 일치해야 구매할 수 있습니다.'

  reloaded: '&a설정을 다시 불러왔습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  sign-not-found: '&c바라보는 곳에 표시판이 없습니다. 표시판을 바라보고 사용해주세요.'
  sign-already-registered: '&c이미 매물이 등록된 표시판입니다. (%name%)'
  sign-protected: '&c매물 표시판은 파괴할 수 없습니다. 먼저 /gtestate remove 로 해제해주세요.'
  estate-created: '&a매물 &f%name% &a을(를) 등록했습니다. (%type%, %price%원)'
  estate-removed: '&a매물 &f%name% &a을(를) 등록 해제했습니다.'
  estate-not-found: '&c%name% 매물을 찾을 수 없습니다.'
  estate-name-duplicate: '&c이미 같은 이름의 매물이 있습니다.'
  estate-name-too-long: '&c매물 이름은 %max%자 이하로 입력해주세요.'
  price-updated: '&a%name% 매물의 가격을 &e%price%원&a으로 변경했습니다.'
  price-invalid: '&c가격은 0보다 큰 정수여야 합니다.'
  owner-set: '&a%name% 매물의 소유자를 &f%player% &a님으로 지정했습니다.'
  owner-cleared: '&a%name% 매물을 다시 판매 중으로 변경했습니다.'
  type-invalid: '&c타입은 HOUSE 또는 CAFE 여야 합니다.'
  list-header: '&6─── 매물 목록 (%count%건) ───'
  list-entry-sale: '&7%name% &8| &f%type% &8| &e%price%원 &8| &a판매중'
  list-entry-sold: '&7%name% &8| &f%type% &8| &e%price%원 &8| &c%owner%'
  list-empty: '&7등록된 매물이 없습니다.'
```
