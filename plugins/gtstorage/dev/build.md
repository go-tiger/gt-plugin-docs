---
sidebar_position: 3
title: 빌드
---

# 빌드

```bash
cd GTStorage
./gradlew build
```

| 결과물                            | 비고                          |
| --------------------------------- | ----------------------------- |
| `build/libs/GTStorage-<버전>.jar` | shadow JAR (sqlite-jdbc 포함) |

- Java 17 toolchain, Spigot API 1.20.1
- 버전은 `gradle.properties`의 `version`에서 바꾸고, `plugin.yml`에 자동으로 들어갑니다.
- `org.sqlite` 패키지는 재배치(relocate)하지 않습니다. 재배치하면 shadow 플러그인이 sqlite-jdbc를 처리하다 빌드가
  실패합니다.
