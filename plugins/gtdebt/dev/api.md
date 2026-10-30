---
sidebar_position: 2
title: API
---

# API

## 의존성 추가

GTDebt는 Maven 저장소에 배포되어 있지 않습니다. JAR를 직접 참조합니다.

```kotlin
dependencies {
    compileOnly(files("libs/GTDebt-1.0.jar"))
}
```

`plugin.yml`에 의존성을 선언합니다.

```yaml
depend: [GTDebt] # 필수일 때
# softdepend: [ GTDebt ] # 선택일 때
```

## DebtService 가져오기

```java
DebtService debt = GTDebt.getDebtService();
```

GTDebt가 활성화되기 전에 호출하면 `NullPointerException`이 발생합니다. 위처럼 `depend`를 선언하고 `onEnable` 이후에
호출하세요.

## 비동기 메서드

반환된 `CompletableFuture`의 콜백은 **DB 스레드**에서 실행됩니다. Bukkit API는 메인 스레드로 넘겨서 호출하세요.

| 메서드                                      | 반환                            | 설명                                                       |
| ------------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| `getDebt(UUID)`                             | `CompletableFuture<Long>`       | 빚 잔액. 데이터가 없으면 0                                 |
| `increase(UUID, long amount, String actor)` | `CompletableFuture<DebtResult>` | 증가. 상한 없음                                            |
| `decrease(UUID, long amount, String actor)` | `CompletableFuture<DebtResult>` | 감소. 0 아래로 내려가지 않음. 이미 0이면 `ALREADY_CLEARED` |
| `set(UUID, long amount, String actor)`      | `CompletableFuture<DebtResult>` | 지정 금액으로 설정                                         |

`actor`는 증감 이력에 남는 실행 주체 이름입니다. 명령어는 플레이어 이름이나 `CONSOLE`을 넣습니다. 플러그인에서 호출할
때는 플러그인 이름처럼 구분할 수 있는 값을 넣으세요.

:::warning `amount` 검증은 명령어 계층에서만 합니다. API로 음수를 넘기면 그대로 계산되니, 증가와 감소는 1 이상, 설정은 0
이상인 값만 넘기세요. :::

```java
GTDebt.getDebtService().decrease(player.getUniqueId(), 5000, "MyPlugin")
        .thenAccept(result -> Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.success()) {
                player.sendMessage("남은 빚: " + result.after());
            }
        }));
```

## 동기 메서드

Skript(skript-reflect)처럼 바로 값이 필요한 곳을 위해 같은 기능의 블로킹 버전을 제공합니다.

| 메서드                             | 반환                               |
| ---------------------------------- | ---------------------------------- |
| `getDebtSync(UUID)`                | `long`                             |
| `increaseSync(UUID, long, String)` | `DebtResult`                       |
| `decreaseSync(UUID, long, String)` | `DebtResult`                       |
| `setSync(UUID, long, String)`      | `DebtResult`                       |
| `isClearedSync(UUID)`              | `boolean` (빚이 0 이하이면 `true`) |

:::danger

- 호출한 스레드는 DB 작업이 끝날 때까지 멈춥니다. 메인 스레드에서 호출하면 그동안 서버 틱도 멈춥니다. 보통은 짧지만
  반복문 안에서 많이 호출하지 마세요.
- **DB 스레드 안**(비동기 메서드의 콜백 등)에서 호출하면 교착 상태가 됩니다. :::

skript-reflect 예시:

```text
import:
    dev.gotiger.gTDebt.GTDebt

command /내빚:
    trigger:
        set {_debt} to GTDebt.getDebtService().getDebtSync(player's uuid)
        send "남은 빚: %{_debt}%원"
```

## DebtResult

| 메서드                   | 설명                                                 |
| ------------------------ | ---------------------------------------------------- |
| `status()`               | `SUCCESS`, `ALREADY_CLEARED`, `FAILURE`              |
| `success()`              | `status() == SUCCESS`                                |
| `alreadyClearedResult()` | `status() == ALREADY_CLEARED`                        |
| `before()`               | 변경 전 잔액                                         |
| `after()`                | 변경 후 잔액. 실패나 이미 완납이면 `before()`와 같음 |

## DebtClearedEvent

`dev.gotiger.gTDebt.debt.DebtClearedEvent`

빚이 0원보다 많은 상태에서 0원이 될 때 **메인 스레드에서** 발생합니다. 취소할 수 없습니다. 다시 빚이 생겼다가 0원이 되면
또 발생합니다.

| 메서드            | 반환   | 설명                                |
| ----------------- | ------ | ----------------------------------- |
| `getPlayerUuid()` | `UUID` | 완납한 플레이어. 오프라인일 수 있음 |

```java
@EventHandler
public void onCleared(DebtClearedEvent event) {
    Player player = Bukkit.getPlayer(event.getPlayerUuid());
    if (player != null) {
        player.getInventory().addItem(new ItemStack(Material.DIAMOND));
    }
}
```
