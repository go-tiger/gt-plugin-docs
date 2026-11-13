---
sidebar_position: 4
title: 빌드
---

# 빌드

```bash
cd GTHardcoreVersus
./gradlew build
```

| 결과물                                   | 비고                          |
| ---------------------------------------- | ----------------------------- |
| `build/libs/GTHardcoreVersus-<버전>.jar` | shadow JAR (sqlite-jdbc 포함) |

- **Java 21** toolchain. Paper 1.21.x API가 Java 21 클래스 파일로 배포되므로 17로는 컴파일되지 않습니다.
- `paper-api:1.21.1-R0.1-SNAPSHOT`(compileOnly). 다른 GT 플러그인과 달리 spigot-api가 아닙니다.
- Multiverse는 API가 아니라 콘솔 명령어로 호출하므로 컴파일 의존성이 없습니다.
- 버전은 `gradle.properties`의 `version`에서 바꾸고, `plugin.yml`에 자동으로 들어갑니다.
- `org.sqlite` 패키지는 재배치(relocate)하지 않습니다. 재배치하면 shadow 플러그인이 sqlite-jdbc를 처리하다 빌드가
  실패합니다.
