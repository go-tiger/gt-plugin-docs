---
sidebar_position: 2
title: 액션 목록
---

# 액션 목록

GTDonation-Event가 제공하는 액션은 모두 **51종**입니다.

- **config 이름**이 있는 25종은 config 모드의 `events.<금액>.action`에 쓸 수 있습니다.
- **모든 액션**은 Skript 모드에서 `DonationScriptAPI`의 메서드로 실행할 수 있습니다. → [Skript 연동](../../dev/event/skript.md)
- Skript 메서드는 특별한 표기가 없으면 `(player, donorName[, target])` 형식입니다.
- 설정 키는 모두 `config.yml` 기준입니다.

## 상태 (버프, 디버프, 저주, 회복)

| 액션 | config 이름 | Skript 메서드 | 설명 |
|---|---|---|---|
| 랜덤 버프 | `BUFF` | `getRandomBuff` | 제외 목록에 없는 포션 효과 하나를 랜덤 지급 |
| 랜덤 디버프 | `DEBUFF` | `getRandomDebuff` | `random-buff.exclude-effects`에 있는 효과 중 하나를 랜덤 지급 |
| 슈퍼 회복 | `SUPER_HEAL` | `getSuperHeal` | 체력, 배고픔, 상태 이상을 모두 회복 |
| 추가 체력 | `ABSORPTION` | `getAbsorption` | 흡수(노란 하트) 체력 지급 |
| 다이아의 저주 | | `getDiamondCurse` | 지속 시간 동안 다이아몬드를 캘 때마다 디버프 발동 |
| 광질 저주 | | `getMiningCurse` | 지속 시간 동안 광석을 캘 때마다 몬스터 소환 또는 디버프 발동 |

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `random-buff.duration-seconds` | `60` | 버프 지속 시간(초) |
| `random-buff.amplifier` | `1` | 효과 세기 (0 = I단계) |
| `random-buff.exclude-effects` | 부정적 효과 목록 | 버프 후보에서 제외할 효과. **디버프 후보로도 사용됩니다** |
| `random-debuff.duration-seconds` | `30` | 디버프 지속 시간(초) |
| `random-debuff.amplifier` | `1` | 디버프 세기 |
| `absorption.duration-seconds` | `60` | 추가 체력 지속 시간(초) |
| `absorption.hearts` | `4` | 추가 체력 (하트 단위) |
| `diamond-curse.duration-seconds` | `60` | 저주 지속 시간(초) |
| `diamond-curse.debuff-duration-seconds` | `10` | 채굴 시 디버프 지속 시간(초). 후보는 `mining-curse.debuff-candidates` |
| `mining-curse.duration-seconds` | `60` | 저주 지속 시간(초) |
| `mining-curse.debuff-duration-seconds` | `10` | 채굴 시 디버프 지속 시간(초) |
| `mining-curse.mob-candidates` | `SILVERFISH`, `ZOMBIE`, `CAVE_SPIDER` | 채굴 시 소환할 몬스터 후보 |
| `mining-curse.debuff-candidates` | `SLOW_DIGGING`, `BLINDNESS`, `SLOW`, `WEAKNESS` | 채굴 시 디버프 후보 |

:::tip
포션 효과 이름은 `/gtde effects`로 확인할 수 있습니다.
:::

## 이동 (넉백, 순간이동, 시야, 크기)

| 액션 | config 이름 | Skript 메서드 | 설명 |
|---|---|---|---|
| 깡! | `KNOCKBACK` | `getKnockback` | 랜덤 방향으로 강하게 날려 보냄 |
| 딱콩 | `POKE` | `getPoke` | 랜덤 방향으로 살짝 밀어냄 (높이 변화 없음) |
| 점프 | `JUMP` | `getJump` | 착지해도 죽지 않는 최대 높이로 점프 |
| 자유낙하 | `FREE_FALL` | `getFreeFall` | 현재 위치 위 공중으로 순간이동 |
| 물 감옥 | | `getWaterPrison` | 유리, 물 감옥에 가둠. 화면에 나온 시야 회전 순서를 맞추면 탈출 |
| 랜덤 순간이동 | | `getRandomTeleport` | 3초 카운트다운 후 반경 내 랜덤 위치로 이동 |
| 랜덤 시야 변경 | `RANDOM_VIEW` | `getRandomView` | 시야를 일정 간격으로 여러 번 강제 회전 |
| 랜덤 크기 변경 | | `getRandomScale` | 플레이어 크기를 랜덤하게 바꿈 (**1.20.5 이상**) |

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `knockback.strength` | `2.0` | 수평으로 밀리는 힘 |
| `knockback.upward` | `1.2` | 위로 튀는 힘 |
| `poke.strength` | `1.0` | 수평으로 밀리는 힘 |
| `jump.margin-health` | `1.0` | 착지 후 남길 최소 체력 (1 = 하트 반 칸) |
| `free-fall.height` | `100` | 띄우는 높이(칸) |
| `water-prison.sequence-length` | `4` | 맞춰야 하는 방향 개수 |
| `water-prison.timeout-seconds` | `60` | 탈출하지 못해도 자동 해제되는 시간(초) |
| `water-prison.radius` | `1` | 감옥 가로, 세로 반경(칸) |
| `water-prison.height` | `2` | 감옥 높이(칸) |
| `random-teleport.radius` | `200` | 이동 최대 반경(칸) |
| `random-view.count` | `15` | 시야 변경 횟수 |
| `random-view.interval-ticks` | `10` | 변경 간격(틱, 20틱 = 1초) |
| `random-scale.duration-seconds` | `30` | 크기 유지 시간(초) |
| `random-scale.min-scale` / `max-scale` | `0.5` / `2.0` | 크기 범위 |

## 위험 (화상, 동상, 폭발, 즉사)

| 액션 | config 이름 | Skript 메서드 | 설명 |
|---|---|---|---|
| 동상 | | `getFrostbite` | 가루눈처럼 얼어붙어 느려지고 매초 피해 |
| 화상 | `BURN` | `getBurn` | 몸에 불이 붙음 |
| 벼락 | `LIGHTNING` | `getLightning` | 플레이어 위치에 번개 |
| TNT | `TNT` | `getTnt` | 불붙은 TNT 소환 |
| 폭죽 | `FIREWORK` | `getFirework` | 랜덤 색, 모양 폭죽을 즉시 터뜨림 |
| 다이아존 | | `getDiamondZone` | 주변 블록을 확률적으로 다이아몬드 원석으로 바꾸고, 시간이 지나면 원래대로 복구 |
| 즉사 | `INSTANT_DEATH` | `getInstantDeath` | 즉시 사망. **불사의 토템과 인벤토리 세이브권을 모두 무시** |

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `frostbite.duration-seconds` | `8` | 동상 지속 시간(초) |
| `frostbite.damage-per-tick` | `1.0` | 1초마다 입는 피해 |
| `burn.duration-seconds` | `5` | 불타는 시간(초) |
| `lightning.deal-damage` | `true` | `false`면 피해, 화재 없이 연출만 |
| `tnt.fuse-ticks` | `80` | 폭발까지 시간(틱) |
| `firework.count` | `1` | 폭죽 개수 |
| `firework.power` | `1` | 폭죽 크기 |
| `diamond-zone.radius` | `5` | 변환 반경(칸) |
| `diamond-zone.duration-seconds` | `30` | 복구까지 시간(초) |
| `diamond-zone.convert-chance` | `0.75` | 블록 하나가 다이아 원석이 될 확률 (0.0~1.0) |

## 인벤토리 (아이템 지급, 조작)

| 액션 | config 이름 | Skript 메서드 | 설명 |
|---|---|---|---|
| 빵 | `BREAD` | `getBread(player, 개수[, target])` | 빵 지급 |
| 스테이크 | `STEAK` | `getSteak(player, 개수[, target])` | 스테이크 지급 |
| 불사의 토템 | `TOTEM` | `getTotem(player, 개수, donorName[, target])` | 불사의 토템 지급 |
| 경험치 병 | `EXP_BOTTLE` | `getExpBottle` | 앞쪽에 경험치 병 여러 개를 던짐 |
| 랜덤 아이템 | `RANDOM_ITEM` | `getRandomItem` | 제외 목록을 뺀 모든 아이템 중 하나 지급 |
| 특별한 아이템 룰렛 | | `getSpecialItem` | 눈앞에서 후보 아이템이 슬롯머신처럼 돌다가 하나에 멈춰 지급 |
| 즉석 인챈트권 | | `getEnchantScroll` | 인챈트권을 든 채 다른 아이템을 클릭하면 랜덤 인챈트가 붙고 소모됨 |
| 강화 요정 | | `getEnchantFairy` | 요정(벡스)이 나타나 손에 든 아이템이나 갑옷 하나를 랜덤 인챈트로 강화 |
| 악마의 곡괭이 | | `getDevilPickaxe` | 3×3 범위를 한 번에 캐는 곡괭이. 정해진 횟수를 쓰면 사라짐 |
| 인벤토리 세이브권 | | `getInventorySave` | 가지고만 있으면 사망 시 자동 발동해 아이템, 경험치를 지킴 (1개 소모) |
| 인벤토리 슬롯 잠금 | | `getSlotLock` | 빈 슬롯 하나를 잠금. **사망할 때까지 유지** |
| 음식 부패 | `ROT_FOOD` | `getRotFood` | 가진 음식을 모두 썩은 살점으로 바꿈 |
| 아이템 태우기 | `ITEM_REMOVE` | `getItemRemove` | 랜덤 아이템 1개를 떨어뜨려 불태워 없앰 |

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `exp-bottle.min-count` / `max-count` | `3` / `8` | 경험치 병 개수 범위 |
| `random-item.exclude-items` | 명령 블록, 기반암 등 | 랜덤 아이템 후보에서 제외 |
| `special-item.drop-mode` | `INVENTORY_FIRST` | `INVENTORY_FIRST`(인벤토리 우선, 가득 차면 드롭) / `DROP_ONLY`(항상 드롭) |
| `special-item.spin-seconds` | `2` | 룰렛 회전 시간(초) |
| `special-item.candidates` | 검, 도끼, 곡괭이, 삽, 괭이, 창 | 룰렛 후보 아이템 |
| `devil-pickaxe.use-count` | `20` | 사용 가능 횟수 |
| `item-remove.burn-duration-ticks` | `30` | 떨어진 아이템이 타서 사라지기까지 시간(틱) |

:::note
`special-item.candidates`에 서버 버전에 없는 아이템(예: 구리 도구, 창)이 있으면 해당 서버에서는 후보로 쓰이지 않습니다.
:::

## 몹 (동물, 몬스터 소환)

| 액션 | config 이름 | Skript 메서드 | 설명 |
|---|---|---|---|
| 랜덤 동물 | `ANIMAL` | `getRandomAnimal` | 주변에 랜덤 동물 소환 |
| 음식 허수아비 | | `getScarecrow` | 앞에 허수아비 소환. 때릴 때마다 음식 지급 |
| 유체이탈의 부적 | | `getSoulOutCharm` | 우클릭하면 일정 시간 관전자 모드로 벽을 뚫고 둘러본 뒤 원래 자리로 복귀 |
| 몬스터 탐지 | | `getMonsterScan` | 주변 몬스터를 발광 효과로 표시 |
| 하급 몬스터 | `WEAK_MONSTER` | `getWeakMonster` | 하급 몬스터 1마리 소환 |
| 중급 몬스터 | `MEDIUM_MONSTER` | `getMediumMonster` | 중급 몬스터 1마리 소환 |
| 상급 몬스터 | `STRONG_MONSTER` | `getStrongMonster` | 상급 몬스터 1마리 소환 |
| 팬미팅 | | `getFanMeeting` | 플레이어 머리를 쓴 좀비 여러 명이 "[팬] 후원자" 이름표를 달고 등장 |

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `random-animal.radius` | `1` | 소환 반경(칸) |
| `random-animal.exclude-entities` | `[]` | 제외할 동물 |
| `scarecrow.duration-seconds` | `60` | 유지 시간(초) |
| `scarecrow.food-material` / `food-count` | `CARROT` / `1` | 한 번 때릴 때 주는 음식과 개수 |
| `soul-out.duration-seconds` | `30` | 유체이탈 시간(초) |
| `monster-scan.radius` | `20` | 탐지 반경(칸) |
| `monster-scan.duration-seconds` | `15` | 표시 시간(초) |
| `weak-monster.radius` / `candidates` | `3` / 좀비, 스켈레톤 등 | 반경과 후보. `CHICKEN_JOCKEY`는 닭을 탄 아기 좀비 |
| `medium-monster.radius` / `candidates` | `4` / 엔더맨, 블레이즈 등 | 반경과 후보 |
| `strong-monster.radius` / `candidates` | `5` / 소환사, 파괴수, 워든 등 | 반경과 후보 |
| `fan-meeting.min-count` / `max-count` | `5` / `10` | 좀비 수 범위 |
| `fan-meeting.radius` | `5` | 소환 반경(칸) |

## 채팅 미니게임

방송 채팅에 따라 효과가 발동하는 액션입니다. **Skript 모드에서만** 사용할 수 있고, 첫 인자 다음에 지속 시간(초) 등을 직접 넘깁니다.

| 액션 | Skript 메서드 | 설명 |
|---|---|---|
| 채팅 채굴 | `getChatMining(player, 초, 단어1, 단어2, 반경[, target])` | 조건에 맞는 채팅이 올라오면 주변 블록을 채굴 |
| 채팅 사격 | `getChatShooting(player, 초, 단어[, target])` | 채팅이 올라오면 화살(일정 확률로 화염구) 발사 |
| 채팅 레이드 | `getChatRaid(player, 초[, target])` | 시청자가 `!참여`를 입력하면 약탈자로 소환되어 공격 |
| 채팅 습격 | `getChatRush(player, 초[, target])` | 채팅마다 그 내용을 이름표로 단 좀벌레 소환 |
| 채팅 펀치 | `getChatPunch(player, 초[, target])` | `펀치`가 포함된 채팅마다 랜덤 방향으로 넉백 |

**채팅 채굴 단어 조건**

| 단어1 | 단어2 | 발동 조건 |
|---|---|---|
| `null` | `null` | 모든 채팅 |
| `"채굴"` | `null` | `채굴`이 나오면 |
| `"영"` | `"차"` | `영` 다음에 바로 `차`가 나오면 (다른 시청자가 이어도 됨) |

채팅 사격의 단어가 `null`이면 모든 채팅에 발사합니다.

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `chat-shooting.fireball-chance` | `0.2` | 화살 대신 화염구가 나갈 확률 |
| `chat-raid.max-participants` | `10` | 최대 참여 인원(약탈자 수) |
| `chat-raid.spawn-radius` | `10` | 소환 반경(칸) |
| `chat-rush.spawn-radius` | `8` | 소환 반경(칸) |
| `chat-punch.strength` | `1.5` | 수평으로 밀리는 힘 |
| `chat-punch.vertical-strength` | `0.6` | 위로 튀는 힘 |

## 기타

| 액션 | Skript 메서드 | 설명 |
|---|---|---|
| 엑스레이 | `getXray` | 주변 지하 광석을 광물 색깔 발광으로 표시 |

| 설정 키 | 기본값 | 설명 |
|---|---|---|
| `xray.radius` | `8` | 탐지 반경(칸) |
| `xray.duration-seconds` | `60` | 표시 시간(초) |
| `xray.ores` | 광석별 색상 | `블록: 색상` 형식. 색상은 ChatColor 이름(`AQUA`, `GOLD` 등) |
