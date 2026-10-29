---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목 | 요구 사항 |
|---|---|
| 서버 | Spigot 1.20.1 이상 (Paper 등 Spigot 호환 서버 포함) |
| Java | **21 이상** (GTDonation-Chzzk가 Java 21로 빌드됨) |
| 네트워크 | OAuth 콜백을 받을 포트 1개 (기본 `20154`) 외부 개방 |

:::note
일부 액션은 더 높은 서버 버전이 필요합니다. 예를 들어 GTDonation-Event의 랜덤 크기 변경은 1.20.5 이상에서만 동작합니다.
:::

## 다운로드

각 저장소의 **GitHub Releases**에서 JAR 파일을 받습니다. 릴리스가 없으면 [직접 빌드](#직접-빌드하기)합니다.

| 플러그인 | 파일명 |
|---|---|
| GTDonation-Core | `GTDonation-Core-<버전>.jar` |
| GTDonation-Chzzk | `GTDonation-Chzzk-<버전>.jar` |
| GTDonation-Event | `GTDonation-Event-<버전>.jar` |

## 설치

1. JAR 파일을 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 각 플러그인의 설정 파일이 자동으로 생성됩니다.

Chzzk와 Event는 Core에 의존합니다(`depend: GTDonationCore`). **Core가 없으면 둘 다 로드되지 않습니다.** 로드 순서는 서버가 알아서 맞추므로, 파일을 넣는 순서는 상관없습니다.

## 직접 빌드하기

Chzzk와 Event는 Core를 Maven Local에서 가져오므로, **Core를 먼저 배포**해야 합니다.

```bash
# 1. Core: 빌드 후 Maven Local에 배포
cd GTDonationCore
./gradlew build publishToMavenLocal   # build/libs/GTDonation-Core-<버전>.jar

# 2. Chzzk: 의존 라이브러리를 포함한 shadow JAR
cd ../GTDonationChzzk
./gradlew build                        # build/libs/GTDonation-Chzzk-<버전>.jar

# 3. Event
cd ../GTDonationEvent
./gradlew build                        # build/libs/GTDonation-Event-<버전>.jar
```

다음 단계: [시작하기](./getting-started.md)
