---
sidebar_position: 2
title: API
---

# GTDonationAPI

Core 이벤트를 발생시키는 정적 메서드 모음입니다. 플랫폼 연동 플러그인을 직접 만들거나, 테스트용으로 후원을 흉내 낼 때 사용합니다.

`dev.gotiger.gTDonationCore.api.GTDonationAPI`

## 의존성 추가

Core를 Maven Local에 배포한 뒤([빌드](../build.md)) 의존성을 추가합니다.

```kotlin title="build.gradle.kts"
repositories {
    mavenLocal()
}

dependencies {
    compileOnly("dev.gotiger:GTDonationCore:0.1.0")
}
```

```yaml title="plugin.yml"
depend: [GTDonationCore]
```

## 메서드

모두 `Bukkit.getPluginManager().callEvent()`를 그대로 호출합니다. **메인 스레드에서 호출하세요.** 비동기 스레드에서 받은 데이터라면 `Bukkit.getScheduler().runTask(...)`로 넘긴 뒤 호출합니다.

### callDonationEvent

```java
GTDonationAPI.callDonationEvent(Player player, String donorName, int amount, String message, Platform platform)
```

[`DonationEvent`](./events.md#donationevent)를 발생시킵니다.

### callChatEvent

```java
GTDonationAPI.callChatEvent(Player player, String chatterName, String message, Platform platform)
```

[`ChatEvent`](./events.md#chatevent)를 발생시킵니다.

### callConnectionEvent

```java
GTDonationAPI.callConnectionEvent(Player player, Platform platform, boolean connected)
```

[`ConnectionEvent`](./events.md#connectionevent)를 발생시킵니다.

## 예시: 테스트 후원 명령어

```java
@Override
public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
    Player player = (Player) sender;
    int amount = Integer.parseInt(args[0]);
    GTDonationAPI.callDonationEvent(player, "테스트", amount, "테스트 후원", Platform.CHZZK);
    return true;
}
```
