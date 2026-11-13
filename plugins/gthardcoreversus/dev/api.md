---
sidebar_position: 2
title: API
---

# API

Skript(skript-reflect)나 다른 플러그인에서 후원 즉사를 처리하고 기록을 조회할 수 있도록 정적 진입점 두 개를 제공합니다.
이벤트는 제공하지 않습니다.

```java
TeamWipeService wipe = GTHardcoreVersus.getTeamWipeService();
TeamService teams = GTHardcoreVersus.getTeamService();
```

모든 메서드는 **메인 스레드**에서 호출하세요.

## 의존성 추가

Maven 저장소에 배포되어 있지 않습니다. JAR를 직접 참조합니다.

```kotlin
dependencies {
    compileOnly(files("libs/GTHardcoreVersus-1.0.jar"))
}
```

```yaml
# plugin.yml
depend: [GTHardcoreVersus]
```

## TeamWipeService

| 메서드                     | 반환      | 설명                                                                                               |
| -------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `instakill(Player)`        | `int`     | 즉사시키고 즉사 횟수를 올림. 반환값은 올린 뒤의 횟수. 게임 전이거나 팀이 없으면 죽이기만 하고 `-1` |
| `isAwaitingWorldSet(Team)` | `boolean` | 다음 세트를 불러오지 못해 대기 중인지                                                              |

`instakill`은 `/gthardcoreversus instakill`과 같은 동작입니다. 기준에 도달하면 전멸까지 처리합니다.

## TeamService 조회

| 메서드                               | 반환     | 설명                                           |
| ------------------------------------ | -------- | ---------------------------------------------- |
| `getTeamName(OfflinePlayer)`         | `String` | `"A"`, `"B"`. 팀이 없으면 `null`               |
| `getTeamDisplayName(OfflinePlayer)`  | `String` | `display-name` (색상 적용). 팀이 없으면 `null` |
| `getDeathCount(OfflinePlayer)`       | `int`    | 게임 시작 후 사망 횟수 (즉사 포함)             |
| `getInstakillCount(OfflinePlayer)`   | `int`    | 즉사 받은 총 횟수. 초기화되지 않음             |
| `getInstakillStack(OfflinePlayer)`   | `int`    | 현재 세트에서의 즉사 횟수 (전멸 판정용)        |
| `getWorldChangeCount(OfflinePlayer)` | `int`    | 플레이어 팀의 전멸 횟수. 팀이 없으면 0         |

## TeamService 변경

| 메서드                                  | 설명                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `setDeathCount(OfflinePlayer, int)`     | 사망 횟수 지정. 음수는 0                                                   |
| `setInstakillCount(OfflinePlayer, int)` | 누적 즉사 횟수 지정. 음수는 0                                              |
| `setInstakillStack(OfflinePlayer, int)` | 즉사 스택 지정. 0 이하면 삭제. 값만 바꾸고 전멸 판정은 다음 즉사 때 이뤄짐 |

## skript-reflect 예시

```text
import:
    dev.gotiger.gTHardcoreVersus.GTHardcoreVersus

# 후원 금액이 10000원 이상이면 즉사
on donation:
    if event-amount >= 10000:
        set {_stack} to GTHardcoreVersus.getTeamWipeService().instakill(event-player)
        broadcast "%event-player%님 즉사! (%{_stack}%회)"

command /내기록:
    trigger:
        set {_t} to GTHardcoreVersus.getTeamService()
        send "사망: %{_t}.getDeathCount(player)%회, 즉사: %{_t}.getInstakillCount(player)%회"
```

`on donation`은 예시입니다. 실제 후원 이벤트는 [GTDonation의 Skript 연동](/gtdonation/dev/event/skript)을 참고하세요.
