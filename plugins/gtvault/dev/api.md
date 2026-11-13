---
sidebar_position: 2
title: API
---

# API

GTVault를 쓰는 방법은 두 가지입니다.

| 대상        | 방법                                                            |
| ----------- | --------------------------------------------------------------- |
| 개인 소지금 | **Vault Economy API** (권장). GTVault에 직접 의존하지 않아도 됨 |
| 공용 지갑   | `GTVault.getWalletService()`                                    |

이벤트는 제공하지 않습니다.

## 개인 소지금: Vault

일반적인 Vault 사용 방법과 같습니다.

```kotlin
repositories {
    maven("https://jitpack.io")
}
dependencies {
    compileOnly("com.github.MilkBowl:VaultAPI:1.7.1")
}
```

```yaml
# plugin.yml
softdepend: [Vault]
```

```java
RegisteredServiceProvider<Economy> rsp =
        Bukkit.getServicesManager().getRegistration(Economy.class);
Economy economy = rsp.getProvider();

economy.depositPlayer(player, 1000);
EconomyResponse res = economy.withdrawPlayer(player, 500);
if (!res.transactionSuccess()) {
    player.sendMessage("잔액이 부족합니다.");
}
```

GTVault 구현의 특징:

- 금액은 정수로 반올림됩니다.
- `withdrawPlayer`는 잔액이 부족하면 `FAILURE`를 돌려주고 아무것도 빼지 않습니다.
- 메모리에서 바로 처리하므로 메인 스레드에서 호출해도 됩니다. 다른 스레드에서 호출해도 같은 플레이어에 대한 처리는
  순서대로 이뤄집니다.

## 공용 지갑: WalletService

GTVault는 Maven 저장소에 배포되어 있지 않습니다. JAR를 직접 참조합니다.

```kotlin
dependencies {
    compileOnly(files("libs/GTVault-1.0.jar"))
}
```

```yaml
# plugin.yml
depend: [GTVault]
```

```java
GTVault gtVault = (GTVault) Bukkit.getPluginManager().getPlugin("GTVault");
WalletService wallets = gtVault.getWalletService();
```

### 메서드

`name`은 지갑 이름입니다. `wallet-name-case-sensitive` 설정에 따라 대소문자를 무시합니다. 메모리에서 처리하므로 메인
스레드에서 바로 호출해도 됩니다. `top()`만 예외입니다.

| 메서드                                   | 반환                       | 설명                                                                  |
| ---------------------------------------- | -------------------------- | --------------------------------------------------------------------- |
| `exists(name)`                           | `boolean`                  | 지갑이 있는지                                                         |
| `get(name)`                              | `Wallet`                   | 지갑. 없으면 `null`                                                   |
| `list()`                                 | `List<Wallet>`             | 전체 지갑                                                             |
| `isEnabled(name)`                        | `boolean`                  | 활성 상태인지. 없으면 `false`                                         |
| `getBalance(name)`                       | `long`                     | 잔고. 없으면 0                                                        |
| `create(name)`                           | `boolean`                  | 생성 (비활성, 잔고 0). 이미 있으면 `false`                            |
| `setEnabled(name, enabled)`              | `boolean`                  | 활성 여부 변경. 없으면 `false`                                        |
| `give(name, amount, contributor, actor)` | `boolean`                  | 입금. `contributor`(UUID)를 주면 기여도에 누적, `null`이면 누적 안 함 |
| `take(name, amount, actor)`              | `boolean`                  | 출금. 부족하면 0으로 맞춤                                             |
| `set(name, amount, actor)`               | `boolean`                  | 잔고 설정. 음수는 0                                                   |
| `delete(name, actor)`                    | `boolean`                  | 삭제. 확인 절차 없음                                                  |
| `top(name, limit)`                       | `List<WalletContribution>` | 기여 순위. **DB를 조회하므로** 메인 스레드에서 부르지 말 것           |

`actor`는 거래 로그에 남는 실행 주체 이름입니다. 플러그인 이름처럼 구분할 수 있는 값을 넣으세요.

:::warning

- `give`, `take`, `set`은 **비활성 지갑에도 동작합니다.** 활성 여부를 존중하려면 호출 전에 `isEnabled()`를 확인하세요.
- `take`는 잔고가 부족해도 실패하지 않고 0원까지만 빼고 `true`를 돌려줍니다. 정확히 그만큼 빼야 한다면 `getBalance()`로
  먼저 확인하세요. 다만 확인과 차감 사이에 다른 변경이 끼어들 수 있습니다. :::

### Wallet

`record Wallet(String name, long balance, boolean enabled, long createdAt)`

### WalletContribution

`record WalletContribution(UUID playerUuid, long contributed)`

### 예시

```java
// 이벤트 상금 지갑에 플레이어가 기부
if (wallets.isEnabled("event")) {
    wallets.give("event", 10_000, player.getUniqueId(), "MyPlugin");
}
```
