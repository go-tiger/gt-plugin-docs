---
sidebar_position: 1
title: 이벤트
---

# 이벤트

GTDonation-Core는 세 가지 Bukkit 이벤트를 제공합니다. 모두 **메인 스레드에서** 발생하며, 취소할 수 없습니다.

의존성 설정은 [API](./api.md#의존성-추가)를 참고하세요.

## DonationEvent

후원을 받았을 때 발생합니다.

`dev.gotiger.gTDonationCore.event.DonationEvent`

| 메서드 | 반환 타입 | 설명 |
|---|---|---|
| `getPlayer()` | `Player` | 후원을 받은 플레이어 (계정을 연동한 스트리머) |
| `getDonorName()` | `String` | 후원자 닉네임 |
| `getAmount()` | `int` | 후원 금액 |
| `getMessage()` | `String` | 후원 메시지 |
| `getPlatform()` | `Platform` | 플랫폼 |

```java
@EventHandler
public void onDonation(DonationEvent event) {
    Player player = event.getPlayer();
    player.sendMessage(event.getDonorName() + "님이 " + event.getAmount() + "원 후원: " + event.getMessage());
}
```

## ChatEvent

방송 채팅을 받았을 때 발생합니다.

`dev.gotiger.gTDonationCore.event.ChatEvent`

| 메서드 | 반환 타입 | 설명 |
|---|---|---|
| `getPlayer()` | `Player` | 채팅이 올라온 채널의 플레이어 |
| `getChatterName()` | `String` | 채팅한 시청자 닉네임 |
| `getMessage()` | `String` | 채팅 내용 |
| `getPlatform()` | `Platform` | 플랫폼 |

```java
@EventHandler
public void onChat(ChatEvent event) {
    event.getPlayer().sendMessage("[채팅] " + event.getChatterName() + ": " + event.getMessage());
}
```

## ConnectionEvent

플랫폼 세션이 연결되거나 끊겼을 때 발생합니다.

`dev.gotiger.gTDonationCore.event.ConnectionEvent`

| 메서드 | 반환 타입 | 설명 |
|---|---|---|
| `getPlayer()` | `Player` | 대상 플레이어 |
| `getPlatform()` | `Platform` | 플랫폼 |
| `isConnected()` | `boolean` | `true` = 연결됨, `false` = 끊김 |

GTDonation-Chzzk는 다음 시점에 이 이벤트를 발생시킵니다.

| 시점 | `isConnected()` |
|---|---|
| 인증 또는 자동 재연결로 세션 연결 완료 | `true` |
| 서버 퇴장 또는 `/chzzk unlink`로 세션 종료 | `false` |

```java
@EventHandler
public void onConnection(ConnectionEvent event) {
    if (event.isConnected()) {
        event.getPlayer().sendMessage(event.getPlatform() + " 연결됨");
    }
}
```

## Platform

`dev.gotiger.gTDonationCore.enums.Platform`

| 값 | 설명 |
|---|---|
| `CHZZK` | 치지직 |
| `SOOP` | SOOP. 이벤트 값으로는 정의되어 있지만, 아직 연동 플러그인은 없습니다 |
