---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTElevator/config.yml`을 수정한 뒤 `/gtelevator reload`로 적용합니다. 엘리베이터 블록 아이템은 이 파일이 아니라
`/gtelevator set`으로 등록합니다.

## settings

| 키                       | 기본값  | 설명                                                                                            |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `max-distance`           | `256`   | 층 사이 최대 거리(칸). 바로 위, 아래 층이 이보다 멀면 이동하지 않음                             |
| `safe-teleport`          | `true`  | 도착할 블록 위 두 칸이 단단한 블록으로 막혀 있으면 이동하지 않음 (`destination-blocked`)        |
| `center-on-block`        | `false` | 이동 후 블록 한가운데에 서게 함. `false`면 서 있던 위치 그대로                                  |
| `cooldown-ms`            | `250`   | 이동 간격(밀리초)                                                                               |
| `silent-when-no-target`  | `true`  | 위, 아래에 층이 없을 때 메시지를 보내지 않음. `false`면 `no-floor-above`, `no-floor-below` 표시 |
| `protect-from-explosion` | `true`  | 폭발로부터 엘리베이터 블록 보호                                                                 |
| `enabled-worlds`         | `[]`    | 이동을 허용할 월드 이름 목록. 비워 두면 모든 월드. 설치는 이 설정과 상관없이 어디서나 가능      |

`safe-teleport`는 잔디, 꽃, 표지판처럼 통과할 수 있는 블록은 막힌 것으로 보지 않습니다.

## item

| 키          | 기본값                  | 설명                                                        |
| ----------- | ----------------------- | ----------------------------------------------------------- |
| `auto-lore` | `true`                  | `/gtelevator set`으로 등록할 때 아래 설명을 아이템에 덧붙임 |
| `lore`      | 점프, 웅크림 안내 두 줄 | 덧붙일 설명                                                 |

설명은 **등록하는 순간**에만 붙습니다. `lore`를 바꾼 뒤에는 `/gtelevator set`으로 다시 등록해야 새 설명이 적용됩니다.

## effects

| 키                   | 기본값                        | 설명                                                                                                            |
| -------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `sound-enabled`      | `true`                        | 이동 소리                                                                                                       |
| `sound`              | `BLOCK_NOTE_BLOCK_PLING`      | [Sound 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Sound.html). 잘못된 이름이면 소리 없음         |
| `sound-volume`       | `1.0`                         | 소리 크기                                                                                                       |
| `sound-pitch`        | `1.5`                         | 소리 높이                                                                                                       |
| `particle-enabled`   | `true`                        | 이동 파티클                                                                                                     |
| `particle`           | `CLOUD`                       | [Particle 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Particle.html). 잘못된 이름이면 파티클 없음 |
| `particle-count`     | `20`                          | 파티클 개수                                                                                                     |
| `show-floor-message` | `true`                        | 이동 후 액션바에 층 정보 표시                                                                                   |
| `floor-message-up`   | `&a▲ &f%floor%층 &7(%label%)` | 위로 이동했을 때                                                                                                |
| `floor-message-down` | `&e▼ &f%floor%층 &7(%label%)` | 아래로 이동했을 때                                                                                              |

소리와 파티클은 도착 지점에서 나며, 주변 플레이어에게도 보이고 들립니다.

| 치환자    | 내용                                              |
| --------- | ------------------------------------------------- |
| `%floor%` | 그 기둥에서 맨 아래를 1층으로 센 층 번호          |
| `%y%`     | 도착한 엘리베이터 블록의 y 좌표                   |
| `%label%` | `floor set`으로 등록한 층 이름. 없으면 `y=<좌표>` |

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다.

| 키                      | 치환자                 | 사용 시점                                          |
| ----------------------- | ---------------------- | -------------------------------------------------- |
| `prefix`                |                        | 메시지 앞 접두사                                   |
| `no-permission`         |                        | 권한 없음                                          |
| `player-only`           |                        | 콘솔에서 플레이어 전용 명령어 실행                 |
| `usage`                 |                        | 명령어 형식 오류                                   |
| `no-floor-above`        |                        | 위층 없음 (`silent-when-no-target: false`일 때)    |
| `no-floor-below`        |                        | 아래층 없음 (`silent-when-no-target: false`일 때)  |
| `destination-blocked`   |                        | 도착 지점이 막힘                                   |
| `reloaded`              |                        | 다시 불러오기 완료                                 |
| `player-not-found`      | `%player%`             | 접속 중이 아닌 플레이어                            |
| `set-success`           |                        | 블록 등록                                          |
| `set-overwritten`       |                        | 기존 블록을 새 블록으로 교체                       |
| `set-empty-hand`        |                        | 손이 비어 있음                                     |
| `set-not-block`         |                        | 설치할 수 없는 아이템                              |
| `give-success`          | `%player%`, `%amount%` | 지급 완료 (명령어 실행자에게)                      |
| `give-received`         | `%amount%`             | 지급받음 (대상에게, 자기 자신에게 줄 때는 안 나옴) |
| `template-not-set`      |                        | 블록이 등록되지 않은 상태에서 `give`               |
| `inventory-full`        |                        | 인벤토리가 가득 차 일부가 바닥에 떨어짐            |
| `amount-invalid`        |                        | 개수가 1 이상의 정수가 아님                        |
| `info-header`           |                        | `info` 제목                                        |
| `info-template`         | `%item%`               | 등록된 블록                                        |
| `info-template-none`    |                        | 등록된 블록 없음                                   |
| `info-placed`           | `%count%`              | 설치된 블록 수                                     |
| `info-jump-mode`        | `%mode%`               | 점프 감지 방식                                     |
| `floor-not-on-elevator` |                        | 엘리베이터 블록 위가 아닌 곳에서 `floor`           |
| `floor-set-success`     | `%name%`               | 층 이름 등록                                       |
| `floor-remove-success`  |                        | 층 이름 제거                                       |
| `floor-remove-none`     |                        | 제거할 층 이름이 없음                              |

## 기본 설정 파일

```yaml
settings:
  max-distance: 256
  safe-teleport: true
  center-on-block: false
  cooldown-ms: 250
  silent-when-no-target: true
  protect-from-explosion: true
  enabled-worlds: []

item:
  auto-lore: true
  lore:
    - '&7점프하면 &f위층&7으로'
    - '&7웅크리면 &f아래층&7으로 이동합니다'

effects:
  sound-enabled: true
  sound: BLOCK_NOTE_BLOCK_PLING
  sound-volume: 1.0
  sound-pitch: 1.5
  particle-enabled: true
  particle: CLOUD
  particle-count: 20
  show-floor-message: true
  floor-message-up: '&a▲ &f%floor%층 &7(%label%)'
  floor-message-down: '&e▼ &f%floor%층 &7(%label%)'

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&7사용법: &f/gtelevator <set|give|info|reload|floor>'

  no-floor-above: '&7위쪽에 엘리베이터가 없습니다.'
  no-floor-below: '&7아래쪽에 엘리베이터가 없습니다.'
  destination-blocked: '&c도착 지점이 막혀 있습니다.'

  reloaded: '&a설정을 다시 불러왔습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  set-success: '&a손에 든 아이템을 엘리베이터 블록으로 등록했습니다.'
  set-overwritten: '&e기존 엘리베이터 블록 설정을 덮어썼습니다.'
  set-empty-hand: '&c손에 아이템을 들고 사용해주세요.'
  set-not-block: '&c설치 가능한 블록만 등록할 수 있습니다.'
  give-success: '&a%player% 님에게 엘리베이터 블록 &e%amount%개&a를 지급했습니다.'
  give-received: '&a엘리베이터 블록 &e%amount%개&a를 받았습니다.'
  template-not-set: '&c엘리베이터 블록이 등록되지 않았습니다. &7/gtelevator set &c으로 먼저 등록해주세요.'
  inventory-full: '&e인벤토리가 가득 차 일부 아이템이 바닥에 떨어졌습니다.'
  amount-invalid: '&c개수는 1 이상의 정수여야 합니다.'

  info-header: '&6─── 엘리베이터 정보 ───'
  info-template: '&7등록된 블록: &f%item%'
  info-template-none: '&7등록된 블록: &c없음'
  info-placed: '&7설치된 블록 수: &e%count%개'
  info-jump-mode: '&7점프 감지 방식: &f%mode%'

  floor-not-on-elevator: '&c엘리베이터 블록 위에서 사용해주세요.'
  floor-set-success: '&a현재 층의 이름을 &e%name%&a(으)로 등록했습니다.'
  floor-remove-success: '&a현재 층의 이름을 제거했습니다.'
  floor-remove-none: '&c현재 층에 등록된 이름이 없습니다.'
```
