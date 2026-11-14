---
sidebar_position: 3
title: 빌드
---

# 빌드

```bash
cd GTBattleZone
./gradlew build
```

| 결과물                               | 비고                                           |
| ------------------------------------ | ---------------------------------------------- |
| `build/libs/GTBattleZone-<버전>.jar` | 일반 JAR. 외부 라이브러리 없음 (shadow 미사용) |

- Java 17 toolchain, Spigot API 1.20.1
- 버전은 `gradle.properties`의 `version`에서 바꾸고, `plugin.yml`에 자동으로 들어갑니다.
