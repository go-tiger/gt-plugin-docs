---
sidebar_position: 3
title: 시작하기
---

# 시작하기

플러그인 설치 후 치지직 후원을 인게임에서 받기까지의 전체 흐름입니다.

## 1. 치지직 앱 등록

[치지직 Developers](https://developers.chzzk.naver.com)에서 앱을 등록하고 **Client ID**와 **Client Secret**을 발급받습니다.

앱 등록 시 다음 API Scope를 선택합니다.

| Scope | 용도 |
|---|---|
| 유저 조회 | OAuth 로그인 후 채널 정보 확인 |
| 채팅 메시지 조회 | 채팅 수신 (`ChatEvent`) |
| 후원 조회 | 후원 수신 (`DonationEvent`) |

**Redirect URI**는 다음 단계의 설정값으로 만들어지는 주소를 그대로 등록합니다. → [Redirect URI 규칙](./chzzk/config.md#redirect-uri)

## 2. GTDonation-Chzzk 설정

`plugins/GTDonationChzzk/config.yml`을 수정합니다.

```yaml title="plugins/GTDonationChzzk/config.yml"
CLIENT_ID: "발급받은 Client ID"
CLIENT_SECRET: "발급받은 Client Secret"
displayHost: play.example.com:20154
port: 20154
https: false
callbackPath: /callback
debug: false
```

위 설정이면 Redirect URI는 `http://play.example.com:20154/callback`입니다. 저장 후 **서버를 재시작**합니다.

## 3. 플레이어 계정 연동

플레이어가 처음 접속하면 채팅창에 로그인 링크가 나옵니다.

```
[CHZZK] 로그인 링크를 클릭하세요: 여기를 클릭
```

링크를 눌러 치지직 계정으로 로그인하면 연동이 끝납니다.

```
[CHZZK] 인증이 완료되었습니다.
```

이후에는 접속할 때마다 자동으로 연결됩니다. 자세한 흐름은 [OAuth 연동 흐름](./chzzk/oauth.md)을 참고하세요.

## 4. 수신 확인

`debug: true`로 두면 채팅, 후원이 들어올 때 서버 콘솔에 로그가 찍힙니다.

```
[CHZZK] 채팅 수신: 시청자닉네임 -> 안녕하세요!
[CHZZK] 후원 수신: 시청자닉네임 -> 1000
```

## 5. 인게임 액션 연결 (선택)

후원 금액에 따라 인게임 효과를 주려면 GTDonation-Event를 설치합니다.

- 간단하게: [config.yml로 금액별 액션 지정](./event/config.md)
- 세밀하게: [Skript로 직접 처리](../dev/event/skript.md) (기본값)
