---
sidebar_position: 1
title: 소개
---

# GTDonation

치지직 같은 스트리밍 플랫폼의 **채팅, 후원 이벤트를 마인크래프트 서버에서 활용**할 수 있게 해 주는 플러그인 모음입니다.

## 구성

| 플러그인             | 역할                                                                     | 필수 여부             |
| -------------------- | ------------------------------------------------------------------------ | --------------------- |
| **GTDonation-Core**  | 채팅, 후원, 연결 이벤트와 API를 제공하는 공통 기반                       | 필수                  |
| **GTDonation-Chzzk** | 치지직 계정을 연동해 채팅, 후원을 받아 Core 이벤트로 전달                | 필수 (치지직 사용 시) |
| **GTDonation-Event** | 후원 금액에 따라 인게임 액션(버프, 몬스터 소환, 채팅 미니게임 등)을 실행 | 선택                  |

```
치지직 ──▶ GTDonation-Chzzk ──▶ GTDonation-Core (이벤트 발생)
                                     │
                                     ├──▶ GTDonation-Event (금액별 액션)
                                     └──▶ Skript / 다른 플러그인
```

## 다음 단계

1. [설치하기](./install.md)
2. [시작하기](./getting-started.md): 치지직 앱 등록부터 인게임 후원 수신까지

## 소스 저장소

- [GTDonation-Core](https://github.com/go-tiger/GTDonation-Core)
- [GTDonation-Chzzk](https://github.com/go-tiger/GTDonation-Chzzk)
- [GTDonation-Event](https://github.com/go-tiger/GTDonation-Event)
