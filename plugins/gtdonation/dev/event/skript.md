---
sidebar_position: 1
title: Skript 연동
---

# Skript 연동

`script-mode: true`(기본값)이면 GTDonation-Event는 금액별 액션을 실행하지 않고, Skript에서 `DonationEvent`를 직접 받아 `DonationScriptAPI`로 액션을 실행합니다. 모든 액션 51종을 쓸 수 있고, 금액 범위나 메시지 내용으로 자유롭게 분기할 수 있습니다.

**필요 플러그인:** [Skript](https://github.com/SkriptLang/Skript), [skript-reflect](https://github.com/SkriptLang/skript-reflect)

:::tip
서버를 처음 실행하면 `plugins/GTDonationEvent/example.sk`가 생성됩니다. 모든 액션의 사용 예시가 들어 있으니 복사해서 시작하면 편합니다.
:::

## 기본 구조

```text title="plugins/Skript/scripts/donation.sk"
import:
    dev.gotiger.gTDonationCore.event.DonationEvent
    dev.gotiger.gTDonationEvent.config.DonationTarget
    org.bukkit.Bukkit

on DonationEvent:
    set {_api} to Bukkit.getPluginManager().getPlugin("GTDonationEvent").getScriptAPI()

    set {_player} to event.getPlayer()
    set {_donorName} to event.getDonorName()
    set {_amount} to event.getAmount()

    if {_amount} = 1000:
        {_api}.getRandomBuff({_player}, {_donorName})

    if {_amount} = 5000:
        {_api}.getWeakMonster({_player}, {_donorName}, DonationTarget.RANDOM)

    if {_amount} >= 10000:
        {_api}.getChatPunch({_player}, 30, DonationTarget.ALL)
```

채팅을 받으려면 `ChatEvent`를 import해서 같은 방식으로 씁니다. 이벤트의 메서드는 [Core 이벤트](../core/events.md)를 참고하세요.

## 메서드 형식

| 형식 | 해당 액션 |
|---|---|
| `getXxx(player, donorName[, target])` | 대부분의 액션 |
| `getBread(player, 개수[, target])`, `getSteak(...)` | 빵, 스테이크 |
| `getTotem(player, 개수, donorName[, target])` | 불사의 토템 |
| `getChatMining(player, 초, 단어1, 단어2, 반경[, target])` | 채팅 채굴 |
| `getChatShooting(player, 초, 단어[, target])` | 채팅 사격 |
| `getChatRaid/getChatRush/getChatPunch(player, 초[, target])` | 채팅 레이드, 습격, 펀치 |

- `donorName`은 알림 메시지의 `%donor%`에 들어갑니다.
- `target`을 생략하면 `DonationTarget.PLAYER`입니다.
- 단어 인자에 `null`을 넘기면 조건 없이 모든 채팅에 반응합니다.

메서드 전체 목록과 설명은 [액션 목록](../../user/event/actions.md)에 있습니다.

## 대상 지정

| 값 | 설명 |
|---|---|
| `DonationTarget.PLAYER` | 후원받은 플레이어 본인 |
| `DonationTarget.RANDOM` | 접속자 중 1명. 추첨 룰렛 연출(약 2.6초) 후 적용 |
| `DonationTarget.ALL` | 접속자 전원 |

`RANDOM`과 `ALL`에는 `targets.yml`의 제외 규칙이 적용됩니다. → [대상 지정](../../user/event/targets.md)

## 당첨자를 직접 다루기

당첨자 이름을 방송 메시지에 쓰는 등 직접 다루고 싶다면 `pickTarget`으로 먼저 뽑고, `playRouletteEffect`로 연출만 재생한 뒤, 뽑힌 플레이어에게 `target` 없이 액션을 실행합니다.

```text
set {_winner} to {_api}.pickTarget({_player}, DonationTarget.RANDOM)
if {_winner} is not set:
    stop
{_api}.playRouletteEffect({_winner})
wait 52 ticks
{_api}.getBread({_winner}, 5)
broadcast "&a[후원] &f%{_winner}%님에게 빵 5개 지급"
```

| 메서드 | 설명 |
|---|---|
| `pickTarget(donor, target)` | 연출 없이 대상 1명을 즉시 반환. 후보가 없으면 `null` |
| `playRouletteEffect(winner)` | 해당 플레이어가 당첨되는 룰렛 연출만 재생하고 **즉시 리턴** |

:::warning wait 값은 숫자로 직접 적기
연출 시간은 52틱입니다. skript-reflect가 반환하는 Java 숫자는 Skript의 `wait` 구문이 인식하지 못하므로, `wait 52 ticks`처럼 숫자를 직접 적어야 합니다.
:::

## 랜덤 결과 공유

버프, 몬스터, 아이템, 크기처럼 결과가 랜덤인 액션을 `ALL`로 실행하면, `config.yml`의 `random-action-same-result-for-all`(기본 `true`)에 따라 전원이 같은 결과를 받습니다. `false`면 대상마다 각각 새로 뽑습니다.
