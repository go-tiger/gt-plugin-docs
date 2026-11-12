---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTWoodcutter/config.yml`을 수정한 뒤 `/gtwoodcutter reload`로 적용합니다.

## settings

| 키                      | 기본값                           | 설명                                                                                                              |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `allowed-tools`         | 나무부터 네더라이트까지 도끼 6종 | 벌목이 발동하는 도구. [Material 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html)으로 적음 |
| `max-blocks`            | `200`                            | 한 번에 수확할 최대 블록 수(원목과 잎 합계). 넘으면 발동하지 않음                                                 |
| `max-radius`            | `8`                              | 밑동에서 수평으로 찾을 거리                                                                                       |
| `max-height`            | `32`                             | 밑동에서 위로 찾을 높이                                                                                           |
| `require-leaves`        | `true`                           | 잎이 하나도 없으면 나무로 보지 않음 (원목 건축물 보호)                                                            |
| `protect-placed-blocks` | `false`                          | 플레이어가 설치한 원목은 수확하지 않음. 서버를 재시작하면 기록이 사라짐                                           |
| `direct-to-inventory`   | `false`                          | 수확한 아이템을 인벤토리로 바로 넣음. 넘치면 바닥에 떨어짐. 도끼가 부서진 경우에는 바닥에 떨어짐                  |
| `drop-leaves`           | `true`                           | 잎에서도 묘목, 막대기, 사과 등이 드롭됨                                                                           |
| `durability-per-block`  | `1`                              | 원목 1개당 내구도 소모량. `0`이면 닳지 않음                                                                       |
| `prevent-tool-break`    | `false`                          | 내구도가 부족하면 아예 발동하지 않음                                                                              |
| `break-per-tick`        | `0`                              | 현재 사용하지 않음. 항상 한 번에 전부 수확                                                                        |
| `sneak-mode`            | `ignore`                         | `ignore`: 상관없음<br/>`require`: 웅크린 상태에서만 발동<br/>`prevent`: 웅크리면 발동하지 않음                    |
| `enabled-worlds`        | `[]`                             | 기능을 쓸 월드 이름 목록. 비워 두면 모든 월드                                                                     |

`prevent-tool-break`는 내구성 인챈트를 고려하지 않고 계산합니다. 그래서 내구성이 붙은 도끼는 실제로는 캘 수 있는데도
발동하지 않을 수 있습니다.

## replant

| 키                | 기본값  | 설명                                                                                                     |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `enabled`         | `true`  | 수확 후 밑동 자리에 묘목 심기                                                                            |
| `delay-ticks`     | `20`    | 심기까지 기다리는 시간 (20틱 = 1초)                                                                      |
| `consume-sapling` | `false` | `true`이면 수확한 드롭에서 묘목 1개를 빼서 심음. 드롭된 묘목이 없으면 심지 않음. `false`이면 무료로 심음 |

밑동 아래가 흙, 잔디, 이끼, 진흙 등 심을 수 있는 블록이고 밑동 자리가 비어 있을 때만 심습니다. 네더 나무는 균사체 블록,
네더랙, 영혼 흙 위에 균을 심습니다. 2x2 나무는 네 칸 모두 심습니다.

## enchantment

| 키    | 기본값       | 설명                                                |
| ----- | ------------ | --------------------------------------------------- |
| `key` | `woodcutter` | 데이터팩이 등록한 `gtwoodcutter:<key>` 인챈트의 key |

데이터팩의 인챈트 파일 이름을 바꿨을 때만 수정합니다. [설치하기](./install.md#데이터팩-설정)를 참고하세요.

## trees

나무 종류별로 켜고 끕니다.

| 키         | 기본값  | 원목              | 잎으로 보는 블록   | 묘목              |
| ---------- | ------- | ----------------- | ------------------ | ----------------- |
| `OAK`      | `true`  | 참나무 원목       | 참나무 잎          | 참나무 묘목       |
| `BIRCH`    | `true`  | 자작나무 원목     | 자작나무 잎        | 자작나무 묘목     |
| `SPRUCE`   | `true`  | 가문비나무 원목   | 가문비나무 잎      | 가문비나무 묘목   |
| `JUNGLE`   | `true`  | 정글나무 원목     | 정글나무 잎        | 정글나무 묘목     |
| `ACACIA`   | `true`  | 아카시아나무 원목 | 아카시아나무 잎    | 아카시아나무 묘목 |
| `DARK_OAK` | `true`  | 짙은 참나무 원목  | 짙은 참나무 잎     | 짙은 참나무 묘목  |
| `MANGROVE` | `false` | 맹그로브 원목     | 맹그로브 잎        | 맹그로브 번식체   |
| `CHERRY`   | `true`  | 벚나무 원목       | 벚나무 잎          | 벚나무 묘목       |
| `CRIMSON`  | `true`  | 진홍빛 자루       | 네더 사마귀 블록   | 진홍빛 균         |
| `WARPED`   | `true`  | 뒤틀린 자루       | 뒤틀린 사마귀 블록 | 뒤틀린 균         |

껍질 벗긴 원목은 대상이 아닙니다. 맹그로브는 뿌리를 수확하지 않아 기본값이 꺼져 있습니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다.

| 키                      | 치환자     | 사용 시점                          |
| ----------------------- | ---------- | ---------------------------------- |
| `prefix`                |            | 메시지 앞 접두사                   |
| `no-permission`         |            | 권한 없음                          |
| `player-only`           |            | 콘솔에서 플레이어 전용 명령어 실행 |
| `usage`                 |            | 명령어 형식 오류                   |
| `tree-too-large`        |            | 나무가 `max-blocks`보다 큼         |
| `tool-broken`           |            | 수확 중 도끼가 부서짐              |
| `tool-durability-low`   |            | `prevent-tool-break`로 발동 안 함  |
| `inventory-full`        |            | 현재 사용하지 않음                 |
| `toggle-on`             |            | 자동 벌목 켬                       |
| `toggle-off`            |            | 자동 벌목 끔                       |
| `reloaded`              |            | 다시 불러오기 완료                 |
| `player-not-found`      | `%player%` | 접속 중이 아닌 플레이어            |
| `enchant-given`         | `%player%` | 인챈트 부여 완료                   |
| `enchant-empty-hand`    |            | 손이 비어 있음                     |
| `enchant-invalid-tool`  |            | 도끼가 아님                        |
| `enchant-already`       |            | 이미 인챈트가 있음                 |
| `enchant-not-installed` |            | 데이터팩이 설치되지 않음           |

## 기본 설정 파일

```yaml
settings:
  allowed-tools:
    - WOODEN_AXE
    - STONE_AXE
    - IRON_AXE
    - GOLDEN_AXE
    - DIAMOND_AXE
    - NETHERITE_AXE
  max-blocks: 200
  max-radius: 8
  max-height: 32
  require-leaves: true
  protect-placed-blocks: false
  direct-to-inventory: false
  drop-leaves: true
  durability-per-block: 1
  prevent-tool-break: false
  break-per-tick: 0
  sneak-mode: ignore
  enabled-worlds: []

replant:
  enabled: true
  delay-ticks: 20
  consume-sapling: false

enchantment:
  key: woodcutter

trees:
  OAK: true
  BIRCH: true
  SPRUCE: true
  JUNGLE: true
  ACACIA: true
  DARK_OAK: true
  MANGROVE: false
  CHERRY: true
  CRIMSON: true
  WARPED: true

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&7사용법: &f/gtwoodcutter <give|toggle|reload>'

  tree-too-large: '&c나무가 너무 커서 한 번에 수확할 수 없습니다.'
  tool-broken: '&c도구가 부서져 벌목이 중단되었습니다.'
  tool-durability-low: '&c도구 내구도가 부족합니다.'
  inventory-full: '&e인벤토리가 가득 차 일부 아이템이 바닥에 떨어졌습니다.'

  toggle-on: '&a자동 벌목을 켰습니다.'
  toggle-off: '&7자동 벌목을 껐습니다.'

  reloaded: '&a설정을 다시 불러왔습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  enchant-given: '&a%player% 님의 도구에 벌목 인챈트를 부여했습니다.'
  enchant-empty-hand: '&c손에 도구를 들고 사용해주세요.'
  enchant-invalid-tool: '&c도끼에만 부여할 수 있습니다.'
  enchant-already: '&c이미 벌목 인챈트가 부여된 도구입니다.'
  enchant-not-installed: '&c벌목 인챈트 데이터팩이 설치되지 않았습니다. datapack/README.md 를 확인해주세요.'
```
