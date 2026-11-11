---
sidebar_position: 4
title: 설정
---

# 설정

`plugins/GTStarter/config.yml`을 수정한 뒤 `/gtstarter reload`로 적용합니다. 지급 아이템 목록은 이 파일에 없고
[명령어](./commands.md)로 관리합니다.

## 지급 방식

1. 플레이어가 처음 접속하면 소지금을 입금하고 지급 아이템을 인벤토리에 넣습니다.
2. 인벤토리에 다 들어가지 않으면 남은 아이템은 **보류**로 저장하고 `kit-pending` 메시지를 보냅니다. 이때는 아직 지급
   완료로 기록하지 않습니다.
3. 보류 아이템은 15초마다 확인해서 인벤토리에 빈 칸이 생기면 이어서 지급합니다. 다시 접속했을 때도 이어서 지급합니다.
4. 보류 아이템까지 모두 지급하면 `kit-pending-done` 메시지를 보내고 지급 완료로 기록합니다. 이후로는 다시 지급하지
   않습니다.

소지금은 아이템과 따로 기록하기 때문에, 보류 아이템을 이어서 받을 때 소지금이 또 들어가지는 않습니다.

## settings

| 키             | 기본값               | 설명                                              |
| -------------- | -------------------- | ------------------------------------------------- |
| `money`        | `200000`             | 최초 접속 시 지급할 소지금. `0`이면 지급하지 않음 |
| `editor-title` | `&8초반 지급템 설정` | 편집 GUI 제목                                     |

## economy

| 키              | 기본값 | 설명                                                                                                                                                                                |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | `auto` | `auto`: Vault 경제가 있으면 사용, 없으면 소지금만 생략<br/>`true`: 반드시 사용. 경제 서비스가 늦게 등록되면 `retry-seconds` 동안 매초 다시 연결 시도<br/>`false`: 소지금 지급 안 함 |
| `retry-seconds` | `10`   | `enabled: true`일 때 재시도할 시간(초)                                                                                                                                              |

Skript 등으로 경제를 늦게 등록하는 서버라면 `enabled: true`로 두세요. `auto`는 서버 시작 1초 뒤에 한 번만 다시
시도합니다.

경제 연동이 없어도 아이템은 정상 지급됩니다. 이 설정은 서버 시작 시에만 적용되므로, 바꾼 뒤에는 서버를 재시작해야
합니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. `item-list-header`, `item-list-entry`를 뺀 메시지 앞에는 `prefix`가 붙습니다.

| 키                   | 치환자                          | 사용 시점                                                       |
| -------------------- | ------------------------------- | --------------------------------------------------------------- |
| `prefix`             |                                 | 메시지 앞 접두사                                                |
| `no-permission`      |                                 | 권한 없음                                                       |
| `player-only`        |                                 | 콘솔에서 플레이어 전용 명령어 실행                              |
| `usage`              |                                 | 명령어 형식 오류                                                |
| `kit-received`       |                                 | 지급 아이템 받음                                                |
| `kit-money`          | `%amount%`                      | 소지금 받음                                                     |
| `kit-pending`        |                                 | 인벤토리가 가득 차 일부 보류                                    |
| `kit-pending-done`   |                                 | 보류 아이템을 모두 받음                                         |
| `reloaded`           |                                 | 다시 불러오기 완료                                              |
| `give-success`       | `%player%`                      | 강제 재지급 실행                                                |
| `give-busy`          | `%player%`                      | 대상이 지급 처리 중                                             |
| `player-not-found`   | `%player%`                      | 접속 중이 아닌 플레이어                                         |
| `editor-open`        |                                 | 편집 GUI 열림                                                   |
| `editor-saved`       | `%count%`                       | 편집 GUI 저장. `%count%`는 아이템 종류 수                       |
| `item-added`         | `%item%`, `%amount%`            | `item add` 완료                                                 |
| `item-removed`       | `%index%`                       | `item remove` 완료                                              |
| `item-empty-hand`    |                                 | 손에 아이템 없이 `item add`                                     |
| `item-list-header`   |                                 | `item list` 제목 줄                                             |
| `item-list-entry`    | `%index%`, `%item%`, `%amount%` | `item list` 항목 줄                                             |
| `item-list-empty`    |                                 | 지급 목록이 비어 있음                                           |
| `item-invalid-index` |                                 | 잘못된 번호. `item add`의 수량이 잘못됐을 때도 이 메시지가 나옴 |

`%item%`은 아이템에 이름이 있으면 그 이름, 없으면 `COOKED_BEEF` 같은 아이템 ID로 나옵니다.

## 기본 설정 파일

```yaml
settings:
  money: 200000
  editor-title: '&8초반 지급템 설정'

economy:
  enabled: auto
  retry-seconds: 10

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&7사용법: &f/gtstarter <give|edit|item|reload>'

  kit-received: '&a초반 지급템을 받았습니다!'
  kit-money: '&7소지금 &e%amount%원&7이 지급되었습니다.'
  kit-pending: '&e인벤토리가 가득 차 일부 아이템을 보관 중입니다. 공간을 비우면 자동 지급됩니다.'
  kit-pending-done: '&a보관 중이던 초반 지급템을 모두 받았습니다.'

  reloaded: '&a설정을 다시 불러왔습니다.'
  give-success: '&a%player% 님에게 초반 지급템을 지급했습니다.'
  give-busy: '&c%player% 님은 지급 처리가 진행 중입니다. 잠시 후 다시 시도해주세요.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  editor-open: '&7아이템을 넣고 창을 닫으면 저장됩니다.'
  editor-saved: '&a지급 아이템 &e%count%종&a을 저장했습니다.'
  item-added: '&a%item% &e%amount%개&a를 지급 목록에 추가했습니다.'
  item-removed: '&a%index%번 아이템을 목록에서 제거했습니다.'
  item-empty-hand: '&c손에 아이템을 들고 사용해주세요.'
  item-list-header: '&6─── 지급 아이템 목록 ───'
  item-list-entry: '&7%index%. &f%item% &7x&e%amount%'
  item-list-empty: '&7지급 아이템이 설정되어 있지 않습니다.'
  item-invalid-index: '&c올바른 번호를 입력해주세요.'
```
