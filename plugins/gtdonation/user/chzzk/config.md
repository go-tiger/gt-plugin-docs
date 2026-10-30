---
sidebar_position: 1
title: 설정
---

# 설정 (config.yml)

설정 파일은 `plugins/GTDonationChzzk/config.yml`입니다. 서버를 처음 실행하면 자동으로 생성되며, **변경 사항은 서버를
재시작해야 적용됩니다.**

:::info 이전 버전 사용자 예전에는 `config.json`을 사용했지만, 현재는 Bukkit 표준인 `config.yml`을 사용합니다. 키 이름은
같으니 값만 옮겨 적으면 됩니다. :::

## 기본값

```yaml title="config.yml"
CLIENT_ID: ''
CLIENT_SECRET: ''
displayHost: localhost
port: 20154
https: false
callbackPath: /callback
debug: false
```

## 항목

| 키              | 타입    | 기본값      | 설명                                                                                     |
| --------------- | ------- | ----------- | ---------------------------------------------------------------------------------------- |
| `CLIENT_ID`     | string  | `""`        | 치지직 앱의 Client ID                                                                    |
| `CLIENT_SECRET` | string  | `""`        | 치지직 앱의 Client Secret                                                                |
| `displayHost`   | string  | `localhost` | Redirect URI의 호스트 부분. **포트가 필요하면 함께 적습니다** (`play.example.com:20154`) |
| `port`          | number  | `20154`     | 내장 콜백 서버가 열리는 포트. 모든 인터페이스(`0.0.0.0`)에서 수신합니다                  |
| `https`         | boolean | `false`     | `true`면 Redirect URI가 `https://`로 시작                                                |
| `callbackPath`  | string  | `/callback` | Redirect URI의 경로. `/`가 없으면 자동으로 붙습니다                                      |
| `debug`         | boolean | `false`     | `true`면 채팅, 후원 수신 로그를 콘솔에 출력                                              |

## Redirect URI

Redirect URI는 다음 규칙으로 만들어집니다. **`port` 값은 들어가지 않습니다.**

```
{https ? "https" : "http"}://{displayHost}{callbackPath}
```

치지직 앱에 등록한 Redirect URI와 **글자 하나까지 같아야** 인증이 성공합니다.

### 포트를 직접 여는 경우

`displayHost`에 포트를 함께 적습니다.

```yaml
displayHost: play.example.com:20154
port: 20154
https: false
callbackPath: /callback
```

→ `http://play.example.com:20154/callback`

### 리버스 프록시를 쓰는 경우

nginx 등에서 HTTPS를 처리하고 내부 `20154` 포트로 넘긴다면 `displayHost`에 포트를 적지 않습니다.

```yaml
displayHost: auth.example.com
port: 20154
https: true
callbackPath: /callback
```

→ `https://auth.example.com/callback`

## 저장 데이터

연동된 플레이어의 토큰은 `plugins/GTDonationChzzk/tokens.db`(SQLite)에 저장됩니다. 이 파일을 지우면 모든 플레이어가 다시
로그인해야 합니다.
