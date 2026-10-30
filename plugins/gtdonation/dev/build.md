---
sidebar_position: 4
title: 빌드
---

# 빌드

Chzzk와 Event는 Core를 `mavenLocal()`에서 가져옵니다. **Core를 먼저 Maven Local에 배포**해야 나머지가 빌드됩니다.

```bash
cd GTDonationCore  && ./gradlew build publishToMavenLocal
cd ../GTDonationChzzk && ./gradlew build
cd ../GTDonationEvent && ./gradlew build
```

| 모듈  | 결과물                                   | 비고                                             |
| ----- | ---------------------------------------- | ------------------------------------------------ |
| Core  | `build/libs/GTDonation-Core-<버전>.jar`  | `dev.gotiger:GTDonationCore:<버전>`으로 배포     |
| Chzzk | `build/libs/GTDonation-Chzzk-<버전>.jar` | shadow JAR (chzzk4j, sqlite-jdbc, org.json 포함) |
| Event | `build/libs/GTDonation-Event-<버전>.jar` |                                                  |

## Core 버전을 올릴 때

Chzzk와 Event의 `build.gradle.kts`에서 `compileOnly("dev.gotiger:GTDonationCore:<버전>")`도 함께 올려야 합니다.

## 테스트 서버

Core에는 [run-paper](https://github.com/jpenilla/run-task) 플러그인이 설정되어 있습니다.

```bash
cd GTDonationCore
./gradlew runServer
```
