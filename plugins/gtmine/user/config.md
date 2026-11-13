---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTMine/config.yml`을 수정한 뒤 `/gtmine reload`로 적용합니다.

## settings

| 키                       | 기본값                 | 설명                                           |
| ------------------------ | ---------------------- | ---------------------------------------------- |
| `marker-material`        | `STRUCTURE_VOID`       | 마커 블록 재질. 잘못된 값이면 `STRUCTURE_VOID` |
| `marker-name`            | `&e[광산] 리젠 포인트` | 마커 아이템 이름                               |
| `default-area`           | `main`                 | 광산 이름을 생략했을 때 쓰는 광산              |
| `use-vanilla-drops`      | `true`                 | 캘 때 바닐라 드롭 사용                         |
| `protect-from-explosion` | `true`                 | 폭발로부터 리젠 포인트 보호                    |

### marker-material

| 재질                    | 특징                                                     |
| ----------------------- | -------------------------------------------------------- |
| `STRUCTURE_VOID` (권장) | 투명하고 자연적으로 생기지 않음. 서바이벌로 얻을 수 없음 |
| `OBSIDIAN`              | 광산 블록과 확실히 구분되고 잘 안 부서짐                 |
| `GLOWSTONE`             | 빛이 나서 어두운 곳에서도 잘 보임                        |

`marker-material`을 바꿔도 **이미 설치한 마커나 지급한 마커는 바뀌지 않습니다.** 배치 모드로 돌아갈 때(`stop`)만 새
재질로 놓입니다.

### use-vanilla-drops

| 값      | 동작                                                                          |
| ------- | ----------------------------------------------------------------------------- |
| `true`  | 바닐라 파괴 그대로. 행운, 섬세한 손길, 경험치, 도구 내구도 적용               |
| `false` | 파괴를 취소하고 `custom-drops`에 적은 아이템만 드롭. 경험치, 내구도 소모 없음 |

`false`일 때 쓰는 `custom-drops`는 기본 설정 파일에 없습니다. 직접 추가해야 하며, 없으면 **아무것도 드롭되지 않습니다.**

```yaml
custom-drops:
  COBBLESTONE: 1
  IRON_NUGGET: 2
```

`custom-drops`는 무엇을 캤든 똑같이 드롭됩니다. 광물별로 다르게 줄 수는 없습니다.

## effects

| 키                      | 기본값              | 설명                                                                               |
| ----------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `respawn-particle`      | `true`              | 리젠할 때 파티클                                                                   |
| `respawn-particle-type` | `CLOUD`             | [Particle 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Particle.html) |
| `respawn-sound`         | `true`              | 리젠할 때 소리                                                                     |
| `respawn-sound-type`    | `BLOCK_STONE_PLACE` | [Sound 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Sound.html)       |

잘못된 이름이면 효과 없이 넘어갑니다.

## areas

광산 이름을 키로 여러 개 정의합니다. 광산 이름은 대소문자를 구분합니다.

```yaml
areas:
  main:
    pool:
      - material: STONE
        weight: 372
      - material: COAL_ORE
        weight: 190
    respawn-seconds: 15
  deep:
    pool:
      - material: DEEPSLATE
        weight: 50
      - material: DEEPSLATE_DIAMOND_ORE
        weight: 5
    respawn-seconds: 60
```

| 키                | 기본값 | 설명                                                                                                                            |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `pool`            |        | 나올 블록 목록                                                                                                                  |
| `pool[].material` |        | [Material 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html). 설치할 수 있는 블록만. 잘못된 이름은 건너뜀 |
| `pool[].weight`   |        | 가중치. 0이면 나오지 않음, 음수는 0으로 처리                                                                                    |
| `respawn-seconds` | `30`   | 캔 뒤 다시 생길 때까지 시간(초)                                                                                                 |

가중치는 합에 대한 비율입니다. 기본 `main` 광산(합계 1062)의 확률은 이렇습니다. `/gtmine pool main`으로도 볼 수
있습니다.

| 블록           | 가중치 | 확률   |
| -------------- | ------ | ------ |
| `STONE`        | 372    | 35.03% |
| `COAL_ORE`     | 190    | 17.89% |
| `IRON_ORE`     | 150    | 14.12% |
| `COPPER_ORE`   | 100    | 9.42%  |
| `GOLD_ORE`     | 65     | 6.12%  |
| `REDSTONE_ORE` | 60     | 5.65%  |
| `LAPIS_ORE`    | 50     | 4.71%  |
| `DIAMOND_ORE`  | 40     | 3.77%  |
| `EMERALD_ORE`  | 35     | 3.30%  |

`reload`로 확률 풀과 리젠 시간을 바꾸면, 다음에 리젠될 때부터 적용됩니다. 이미 예약된 리젠의 대기 시간은 바뀌지
않습니다. 놓여 있는 블록까지 바로 바꾸려면 `/gtmine restart`를 쓰세요.

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다.

| 키                      | 치환자                                | 사용 시점                          |
| ----------------------- | ------------------------------------- | ---------------------------------- |
| `prefix`                |                                       | 메시지 앞 접두사                   |
| `no-permission`         |                                       | 권한 없음                          |
| `player-only`           |                                       | 콘솔에서 플레이어 전용 명령어 실행 |
| `usage`                 |                                       | 명령어 형식 오류                   |
| `give-success`          | `%player%`, `%amount%`, `%area%`      | 마커 지급                          |
| `marker-placed`         | `%area%`, `%count%`                   | 마커 설치                          |
| `marker-removed`        |                                       | 마커 제거                          |
| `area-not-found`        | `%area%`                              | 없는 광산                          |
| `area-started`          | `%area%`, `%count%`                   | `start` 완료                       |
| `area-restarted`        | `%area%`, `%count%`                   | `restart` 완료                     |
| `area-stopped`          | `%area%`                              | `stop` 완료                        |
| `area-already-active`   | `%area%`                              | 이미 채굴 모드                     |
| `area-already-inactive` | `%area%`                              | 이미 배치 모드                     |
| `area-no-points`        | `%area%`                              | 포인트 없음                        |
| `area-no-ore-points`    | `%area%`                              | `clear`할 포인트 없음              |
| `area-cleared`          | `%area%`                              | `clear` 완료                       |
| `area-invalid-pool`     | `%area%`                              | 확률 풀이 비었거나 가중치가 모두 0 |
| `info-header`           | `%area%`                              | `info` 제목                        |
| `info-mode`             | `%mode%`                              | 모드 (`채굴 모드`, `배치 모드`)    |
| `info-points`           | `%count%`                             | 포인트 수                          |
| `list-header`           |                                       | `list` 제목                        |
| `list-entry`            | `%area%`, `%mode%`, `%count%`         | `list` 항목                        |
| `list-empty`            |                                       | 광산 없음                          |
| `pool-header`           | `%area%`                              | `pool` 제목                        |
| `pool-entry`            | `%material%`, `%weight%`, `%percent%` | `pool` 항목                        |
| `reloaded`              |                                       | 다시 불러오기 완료                 |
| `player-not-found`      | `%player%`                            | 접속 중이 아닌 플레이어            |
| `amount-invalid`        |                                       | 개수가 1 이상의 정수가 아님        |
| `give-empty-hand-area`  |                                       | 현재 사용하지 않음                 |
| `setarea-success`       | `%area%`                              | 소속 광산 변경                     |
| `not-marker-item`       |                                       | 손에 든 것이 마커가 아님           |

## 기본 설정 파일

```yaml
settings:
  marker-material: STRUCTURE_VOID
  marker-name: '&e[광산] 리젠 포인트'
  default-area: main
  use-vanilla-drops: true
  protect-from-explosion: true

effects:
  respawn-particle: true
  respawn-particle-type: CLOUD
  respawn-sound: true
  respawn-sound-type: BLOCK_STONE_PLACE

areas:
  main:
    pool:
      - material: STONE
        weight: 372
      - material: COAL_ORE
        weight: 190
      - material: IRON_ORE
        weight: 150
      - material: COPPER_ORE
        weight: 100
      - material: GOLD_ORE
        weight: 65
      - material: REDSTONE_ORE
        weight: 60
      - material: LAPIS_ORE
        weight: 50
      - material: EMERALD_ORE
        weight: 35
      - material: DIAMOND_ORE
        weight: 40
    respawn-seconds: 15

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&7사용법: &f/gtmine <give|start|stop|restart|clear|info|list|pool|reload>'

  give-success: '&a%player% 님에게 리젠 포인트 마커 &e%amount%개&a를 지급했습니다. &7(소속 광산: %area%)'
  marker-placed: '&7리젠 포인트가 등록되었습니다. &8(%area%, 총 %count%개)'
  marker-removed: '&7리젠 포인트 등록이 해제되었습니다.'

  area-not-found: '&c%area% 광산을 찾을 수 없습니다. config 의 areas 에 먼저 정의해주세요.'
  area-started: '&a[%area%] 광산이 &e채굴 모드&a로 전환되었습니다. &7(포인트 %count%개)'
  area-restarted: '&a[%area%] 광산이 &e채굴 모드&a로 (재)적용되었습니다. &7(포인트 %count%개)'
  area-stopped: '&7[%area%] 광산이 &e배치 모드&7로 전환되었습니다.'
  area-already-active: '&c[%area%] 광산은 이미 채굴 모드입니다.'
  area-already-inactive: '&c[%area%] 광산은 이미 배치 모드입니다.'
  area-no-points: '&c[%area%] 광산에 등록된 리젠 포인트가 없습니다.'
  area-no-ore-points: '&c[%area%] 광산에 돌로 바꿀 광물 포인트가 없습니다.'
  area-cleared: '&a[%area%] 광산의 광물 블록을 전부 &f돌&a로 교체했습니다.'
  area-invalid-pool: '&c[%area%] 광산의 확률 풀이 비어 있거나 모든 가중치가 0입니다. config 를 확인해주세요.'

  info-header: '&6─── %area% 광산 정보 ───'
  info-mode: '&7모드: &f%mode%'
  info-points: '&7등록된 포인트: &e%count%개'
  list-header: '&6─── 광산 목록 ───'
  list-entry: '&f| &e%area% &7(%mode%, %count%개)'
  list-empty: '&7등록된 광산이 없습니다.'
  pool-header: '&6─── %area% 확률 테이블 ───'
  pool-entry: '&f%material% &7- 가중치 %weight% &8(%percent%%)'

  reloaded: '&a설정을 다시 불러왔습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  amount-invalid: '&c개수는 1 이상의 정수여야 합니다.'
  give-empty-hand-area: '&c손에 마커 블록을 들고 /gtmine setarea <이름> 을 사용하세요.'
  setarea-success: '&a들고 있는 마커 블록의 소속 광산을 &e%area%&a(으)로 지정했습니다.'
  not-marker-item: '&c손에 든 것이 리젠 포인트 마커 블록이 아닙니다.'
```
