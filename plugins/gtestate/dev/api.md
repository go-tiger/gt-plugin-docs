---
sidebar_position: 2
title: API
---

# API

GTEstate는 출입이나 건축 권한을 관리하지 않습니다. 대신 다른 플러그인이나 Skript가 매물 소유 여부를 확인할 수 있도록
`EstateManager`의 조회 메서드를 공개합니다. 이벤트는 제공하지 않습니다.

## 의존성 추가

GTEstate는 Maven 저장소에 배포되어 있지 않습니다. JAR를 직접 참조합니다.

```kotlin
dependencies {
    compileOnly(files("libs/GTEstate-1.0.jar"))
}
```

```yaml
# plugin.yml
depend: [GTEstate]
```

## EstateManager 가져오기

정적 접근자는 없습니다. 플러그인 인스턴스에서 가져옵니다.

```java
GTEstate gtEstate = (GTEstate) Bukkit.getPluginManager().getPlugin("GTEstate");
EstateManager estates = gtEstate.getEstateManager();
```

매물 목록은 서버 시작 후 비동기로 불러오므로, 시작 직후 아주 짧은 시간 동안은 조회 결과가 비어 있을 수 있습니다.

## 조회 메서드

모두 메모리 캐시를 읽으므로 메인 스레드에서 바로 호출해도 됩니다.

| 메서드                                           | 반환               | 설명                                          |
| ------------------------------------------------ | ------------------ | --------------------------------------------- |
| `getEstateByName(String name)`                   | `Optional<Estate>` | 이름으로 조회 (대소문자 무시)                 |
| `getEstateAt(String world, int x, int y, int z)` | `Optional<Estate>` | 표시판 좌표로 조회                            |
| `getEstatesByOwner(UUID owner)`                  | `List<Estate>`     | 플레이어가 소유한 매물                        |
| `isOwner(UUID player, String estateName)`        | `boolean`          | 해당 매물의 소유자인지. 매물이 없으면 `false` |
| `getAll()`                                       | `List<Estate>`     | 전체 매물                                     |
| `getAllByType(EstateType type)`                  | `List<Estate>`     | 종류별 매물                                   |

`EstateManager`에는 `create`, `remove`, `setPrice`, `setOwner` 같은 변경 메서드도 public으로 있지만, 명령어용으로 만든
것이라 외부에서 호출하는 것은 권장하지 않습니다.

## Estate

| 메서드                         | 반환         | 설명                                      |
| ------------------------------ | ------------ | ----------------------------------------- |
| `id()`                         | `int`        | DB ID                                     |
| `name()`                       | `String`     | 매물 이름                                 |
| `type()`                       | `EstateType` | `HOUSE`, `CAFE`                           |
| `price()`                      | `int`        | 가격                                      |
| `world()`, `x()`, `y()`, `z()` |              | 표시판 위치                               |
| `isSold()`                     | `boolean`    | 소유자가 있는지                           |
| `ownerUuid()`                  | `UUID`       | 소유자. 판매 중이면 `null`                |
| `ownerName()`                  | `String`     | 구매(지정) 당시의 소유자 닉네임           |
| `purchasedAt()`                | `long`       | 구매 시각 (epoch 밀리초). 판매 중이면 `0` |

## 예시

```java
@EventHandler
public void onInteract(PlayerInteractEvent event) {
    if (event.getClickedBlock() == null || event.getClickedBlock().getType() != Material.OAK_DOOR) {
        return;
    }
    if (!estates.isOwner(event.getPlayer().getUniqueId(), "1번집")) {
        event.setCancelled(true);
        event.getPlayer().sendMessage("1번집 소유자만 들어갈 수 있습니다.");
    }
}
```

skript-reflect:

```text
import:
    org.bukkit.Bukkit

on right click on oak door:
    set {_m} to Bukkit.getPluginManager().getPlugin("GTEstate").getEstateManager()
    if {_m}.isOwner(player's uuid, "1번집") is false:
        cancel event
        send "1번집 소유자만 들어갈 수 있습니다."
```
