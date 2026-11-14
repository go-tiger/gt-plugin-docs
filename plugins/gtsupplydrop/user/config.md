---
sidebar_position: 6
title: 설정
---

# 설정

`plugins/GTSupplyDrop/config.yml`을 수정한 뒤 `/gtsupplydrop reload`로 적용합니다. 보상은 이 파일이 아니라
[GUI](./loot.md)로 편집합니다.

:::warning `/gtsupplydrop zone`은 `config.yml`을 **덮어써서 저장**합니다. 파일을 수정하는 중이라면 `reload`를 먼저
하세요. 그러지 않으면 수정한 내용이 사라질 수 있고, 저장할 때 주석도 사라질 수 있습니다. :::

## settings

**드랍**

| 키                      | 기본값  | 설명                                                                           |
| ----------------------- | ------- | ------------------------------------------------------------------------------ |
| `interval-minutes`      | `10`    | 정기 드랍 주기(분). 최소 1                                                     |
| `auto-start-on-enable`  | `false` | 서버가 켜질 때 정기 드랍 자동 시작                                             |
| `active-zone`           | `main`  | 드랍할 구역. `zone` 명령어로도 바뀜                                            |
| `sets-per-drop`         | `2`     | 상자 하나에 넣을 세트 수. 추첨할 수 있는 세트가 이보다 적으면 있는 만큼만 넣음 |
| `input-timeout-seconds` | `60`    | 가중치 채팅 입력 대기 시간(초)                                                 |

**착지 지점**

| 키                      | 기본값 | 설명                                                     |
| ----------------------- | ------ | -------------------------------------------------------- |
| `avoid-liquid`          | `true` | 물, 용암 위는 피함                                       |
| `max-location-attempts` | `30`   | 착지 지점을 찾는 최대 시도 횟수. 넘으면 그 드랍을 건너뜀 |

구역이 바다나 허공 위주면 계속 실패할 수 있습니다. 그럴 때는 구역 범위를 육지 쪽으로 줄이세요.

**낙하 연출**

| 키                           | 기본값                   | 설명                                                                                            |
| ---------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `drop-height`                | `150`                    | 상자가 나타나는 y 좌표. 월드 높이 한계를 넘으면 한계에 맞춤. 지형보다 낮으면 지형 높이에서 시작 |
| `fall-speed-blocks-per-tick` | `0.3`                    | 매 틱 내려오는 칸 수. 최소 0.01                                                                 |
| `effects-enabled`            | `true`                   | 소리와 파티클                                                                                   |
| `fall-sound`                 | `ITEM_TOTEM_USE`         | 떨어지는 동안 1초마다 나는 소리                                                                 |
| `fall-particle`              | `CLOUD`                  | 떨어지는 동안 나는 파티클                                                                       |
| `land-sound`                 | `ENTITY_GENERIC_EXPLODE` | 착지 소리                                                                                       |
| `land-particle`              | `EXPLOSION_LARGE`        | 착지 파티클                                                                                     |

소리는 [Sound 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Sound.html), 파티클은
[Particle 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Particle.html)입니다. 잘못된 이름이거나, `DUST`처럼
추가 데이터가 필요한 파티클은 무시합니다. 비워 두면 그 효과만 꺼집니다.

## zones

구역 이름을 키로 여러 개 정의합니다.

```yaml
zones:
  main:
    world: world
    min-x: -500
    max-x: 500
    min-z: -500
    max-z: 500
  arena:
    world: world
    min-x: 1000
    max-x: 1200
    min-z: 1000
    max-z: 1200
```

| 키               | 기본값  | 설명                |
| ---------------- | ------- | ------------------- |
| `world`          | `world` | 월드 이름           |
| `min-x`, `max-x` |         | x 범위 (양 끝 포함) |
| `min-z`, `max-z` |         | z 범위 (양 끝 포함) |

min과 max를 거꾸로 적어도 알아서 맞춥니다. y 범위는 없습니다. 항상 그 자리의 가장 높은 블록 위에 떨어집니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다.

| 키                  | 치환자              | 사용 시점                                   |
| ------------------- | ------------------- | ------------------------------------------- |
| `prefix`            |                     | 메시지 앞 접두사                            |
| `no-permission`     |                     | 권한 없음                                   |
| `player-only`       |                     | 콘솔에서 `loot` 실행                        |
| `usage`             |                     | 명령어 형식 오류                            |
| `interval-invalid`  |                     | 주기가 1 이상의 정수가 아님                 |
| `drop-announce`     | `%x%`, `%z%`        | 상자가 나타날 때 전체 알림                  |
| `drop-started`      | `%interval%`        | 정기 드랍 시작                              |
| `drop-stopped`      |                     | 정기 드랍 중단                              |
| `drop-not-running`  |                     | 정기 드랍이 돌고 있지 않음                  |
| `drop-forced`       |                     | 즉시 드랍 실행 (실패해도 먼저 나옴)         |
| `drop-skipped`      |                     | 착지 지점을 찾지 못함 (`force`일 때만 표시) |
| `zone-not-found`    | `%zone%`            | 없는 구역                                   |
| `zone-switched`     | `%zone%`            | 구역 변경                                   |
| `set-saved`         | `%set%`             | 세트 저장                                   |
| `set-removed-empty` | `%set%`             | 세트를 비워서 삭제                          |
| `set-deleted`       | `%set%`             | Shift + 우클릭으로 삭제                     |
| `set-missing`       | `%set%`             | 가중치 입력 중 세트가 사라짐                |
| `weight-prompt`     | `%set%`, `%max%`    | 가중치 입력 요청                            |
| `weight-invalid`    | `%max%`             | 잘못된 가중치                               |
| `weight-set`        | `%set%`, `%weight%` | 가중치 저장                                 |
| `input-cancelled`   |                     | `취소` 입력                                 |
| `input-timeout`     |                     | 입력 시간 초과                              |
| `reloaded`          |                     | 다시 불러오기 완료                          |

`%set%`은 1부터 센 세트 번호입니다. 정기 드랍에서 착지 지점을 못 찾으면 메시지 없이 콘솔에 경고만 남습니다.

## 기본 설정 파일

```yaml
settings:
  interval-minutes: 10
  auto-start-on-enable: false
  active-zone: main

  avoid-liquid: true
  max-location-attempts: 30

  drop-height: 150
  fall-speed-blocks-per-tick: 0.3
  effects-enabled: true
  fall-sound: ITEM_TOTEM_USE
  fall-particle: CLOUD
  land-sound: ENTITY_GENERIC_EXPLODE
  land-particle: EXPLOSION_LARGE

  sets-per-drop: 2
  input-timeout-seconds: 60

zones:
  main:
    world: world
    min-x: -500
    max-x: 500
    min-z: -500
    max-z: 500

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&e/gtsupplydrop <start [분]|stop|force|zone <이름>|loot|reload>'
  interval-invalid: '&c주기는 1 이상의 정수(분)로 입력해주세요.'

  drop-announce: '&c&l[보급] &f(x: %x%, z: %z%) 에 보급 상자가 떨어지고 있습니다!'
  drop-started: '&a보급 상자 드랍을 시작합니다. &7(주기: %interval%분)'
  drop-stopped: '&7보급 상자 드랍을 중단했습니다.'
  drop-not-running: '&7진행 중인 정기 드랍이 없습니다.'
  drop-forced: '&a보급 상자를 즉시 드랍합니다.'
  drop-skipped: '&c안전한 드랍 위치를 찾지 못해 이번 드랍을 건너뛰었습니다.'

  zone-not-found: '&c%zone% 구역을 찾을 수 없습니다. config 의 zones 에 먼저 정의해주세요.'
  zone-switched: '&a사용할 구역을 %zone% 으로 변경했습니다.'

  set-saved: '&a보급 세트 &e#%set%&a 를 저장했습니다.'
  set-removed-empty: '&7보급 세트 &e#%set%&7 이(가) 비어 있어 삭제했습니다.'
  set-deleted: '&c보급 세트 &e#%set%&c 를 삭제했습니다.'
  set-missing: '&c보급 세트 &e#%set%&c 이(가) 사라져 적용하지 못했습니다.'
  weight-prompt: '&e#%set%&f 세트 가중치를 채팅에 입력해주세요. &7(0 ~ %max%, 0 이면 추첨 제외 / 취소: "취소")'
  weight-invalid: '&c가중치는 0 ~ %max% 사이 정수로 입력해주세요.'
  weight-set: '&e#%set%&f 세트 가중치를 &e%weight%&f 로 설정했습니다.'
  input-cancelled: '&7입력을 취소했습니다.'
  input-timeout: '&7입력 시간이 지나 취소되었습니다.'

  reloaded: '&a설정을 다시 불러왔습니다.'
```
