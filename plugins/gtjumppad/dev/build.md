---
sidebar_position: 3
title: 빌드
---

# 빌드

```bash
cd GTJumpPad
./gradlew build
```

| 결과물                            | 비고                         |
| --------------------------------- | ---------------------------- |
| `build/libs/GTJumpPad-<버전>.jar` | shadow JAR. SQLite JDBC 포함 |

- Java 17 toolchain, Spigot API 1.20.1
- 일반 `jar` 작업은 꺼져 있고 `build`가 `shadowJar`를 실행합니다.
- `org.sqlite`는 재배치하지 않습니다. 재배치하면 shadow의 리매퍼와 충돌해 빌드가 실패합니다. 그래서 다른 플러그인이 다른
  버전의 sqlite-jdbc를 넣고 있으면 충돌할 수 있습니다.
- 버전은 `gradle.properties`의 `version`에서 바꾸고, `plugin.yml`에 자동으로 들어갑니다.
