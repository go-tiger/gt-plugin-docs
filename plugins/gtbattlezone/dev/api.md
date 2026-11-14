---
sidebar_position: 2
title: API
---

# API

GTBattleZone은 자기장만 담당합니다. 우승 판정 같은 후속 처리를 다른 플러그인에서 할 수 있도록, 최종 단계에 도달했을 때
이벤트를 하나 발생시킵니다.

## 의존성 추가

Maven 저장소에 배포되어 있지 않습니다. JAR를 직접 참조합니다.

```kotlin
dependencies {
    compileOnly(files("libs/GTBattleZone-1.0.jar"))
}
```

```yaml
# plugin.yml
softdepend: [GTBattleZone]
```

## BattleZoneFinalPhaseEvent

`dev.gotiger.gTBattleZone.zone.BattleZoneFinalPhaseEvent`

마지막 단계로의 축소가 **끝났을 때** 메인 스레드에서 한 번 발생합니다. 단계가 하나뿐이면 `start` 직후에 발생합니다.
취소할 수 없습니다.

| 메서드           | 반환     | 설명                                                    |
| ---------------- | -------- | ------------------------------------------------------- |
| `getWorld()`     | `World`  | 자기장이 진행된 월드                                    |
| `getFinalSize()` | `double` | config에 적힌 마지막 단계 크기. `0`이어도 실제 보더는 1 |

```java
@EventHandler
public void onFinal(BattleZoneFinalPhaseEvent event) {
    List<Player> alive = event.getWorld().getPlayers().stream()
            .filter(p -> p.getGameMode() == GameMode.SURVIVAL)
            .toList();
    if (alive.size() == 1) {
        Bukkit.broadcastMessage(alive.get(0).getName() + " 우승!");
    }
}
```

Skript(skript-reflect)에서는 다음처럼 받습니다.

```text
import:
    dev.gotiger.gTBattleZone.zone.BattleZoneFinalPhaseEvent

on BattleZoneFinalPhaseEvent:
    broadcast "자기장이 최종 단계에 도달했습니다! (%event.getWorld().getName()%)"
```

## 그 밖의 연동

진행 상태를 조회하는 공개 API는 없습니다. 자기장 시작, 중단, 강제 축소는 콘솔 명령어로 실행하세요.

```java
Bukkit.dispatchCommand(Bukkit.getConsoleSender(), "gtbattlezone start");
```

현재 경계는 바닐라 `WorldBorder`로 직접 확인할 수 있습니다.

```java
WorldBorder border = world.getWorldBorder();
boolean inside = border.isInside(player.getLocation());
```
