---
sidebar_position: 1
title: 구조
---

# 구조

GTDonation은 **플랫폼 연동**과 **이벤트 처리**를 Core 이벤트로 분리한 구조입니다. 새 플랫폼을 붙이거나 후원 처리를 바꿀 때 서로 영향을 주지 않습니다.

```
┌──────────────────┐   callXxxEvent()   ┌───────────────────┐   Bukkit Event   ┌─────────────────────┐
│ GTDonation-Chzzk │ ─────────────────▶ │ GTDonation-Core   │ ───────────────▶ │ GTDonation-Event    │
│ (플랫폼 연동)     │                    │ (이벤트, API)      │                  │ Skript / 다른 플러그인 │
└──────────────────┘                    └───────────────────┘                  └─────────────────────┘
```

## 모듈

| 모듈 | 패키지 | Java | 역할 |
|---|---|---|---|
| GTDonation-Core | `dev.gotiger.gTDonationCore` | 17 | `ChatEvent`, `DonationEvent`, `ConnectionEvent`와 이를 발생시키는 `GTDonationAPI` |
| GTDonation-Chzzk | `dev.gotiger.gTDonationChzzk` | 21 | 치지직 OAuth, 세션 관리, 수신한 채팅, 후원을 Core 이벤트로 변환 |
| GTDonation-Event | `dev.gotiger.gTDonationEvent` | 17 | `DonationEvent`를 받아 금액별 액션 실행, Skript용 `DonationScriptAPI` 제공 |

세 모듈 모두 `spigot-api:1.20.1`에 대해 컴파일됩니다.

## GTDonation-Chzzk

| 클래스 | 역할 |
|---|---|
| `GTDonationChzzk` | `config.yml` 생성, `tokens.db` 테이블 생성, 콜백 서버 시작 |
| `CustomChzzkOauthLoginAdapter` | 내장 HTTP 서버로 OAuth 콜백 수신, `state`(플레이어 UUID)별로 토큰 발급 결과 전달 |
| `PlayerListener` | 접속 시 토큰 확인, 갱신, 재인증, 세션 생성, 채팅, 후원 수신 시 Core API 호출 |
| `ChzzkCommand` | `/chzzk unlink` |

치지직 통신에는 [chzzk4j](https://github.com/R2turnTrue/chzzk4j)를 사용합니다. 세션 이벤트는 비동기 스레드에서 들어오므로, Core 이벤트는 `runTask`로 **메인 스레드에서** 발생시킵니다.

**tokens.db의 PLAYERS 테이블**

| 컬럼 | 내용 |
|---|---|
| `uuid` | 플레이어 UUID (PK) |
| `accessToken`, `refreshToken` | 치지직 토큰 |
| `accessDate`, `refreshDate` | 마지막 갱신 시각 (`yyyy-MM-dd-HH-mm`) |

## GTDonation-Event

| 패키지 | 내용 |
|---|---|
| `action` | `DonationAction` 인터페이스와 `DonationActionRegistry`. 하위 패키지는 카테고리별 액션 (`status`, `movement`, `hazard`, `inventory`, `mob`, `chat`, `misc`) |
| `config` | `config.yml`, `messages.yml`, `targets.yml` 로딩, `DonationTarget`, 대상 추첨 연출(`RandomTargetRouletteManager`) |
| `listener` | config 모드에서 `DonationEvent`를 받아 액션 실행 |
| `command` | `/gtdonationevent` 하위 명령어 |
| `DonationScriptAPI` | Skript 모드용 공개 API |

액션은 두 종류입니다.

- **단발 액션** (`*Action`): `DonationAction`을 구현하고 레지스트리에 등록됩니다. config 모드에서도 이름으로 실행할 수 있습니다.
- **지속형 액션** (`*Manager`): 아이템, 저주, 채팅 미니게임처럼 상태를 유지하고 이벤트를 들어야 하는 액션입니다. 레지스트리에 없으므로 `DonationScriptAPI`로만 실행됩니다.
