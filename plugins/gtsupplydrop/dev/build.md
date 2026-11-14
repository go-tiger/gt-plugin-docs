---
sidebar_position: 3
title: 빌드
---

# 빌드

```bash
cd GTSupplyDrop
./gradlew build
```

| 결과물                               | 비고                                           |
| ------------------------------------ | ---------------------------------------------- |
| `build/libs/GTSupplyDrop-<버전>.jar` | 일반 JAR. 외부 라이브러리 없음 (shadow 미사용) |

- Java 17 toolchain, Spigot API 1.20.1
- 낙하 연출에 `BlockDisplay`를 쓰므로 1.19.4 이상의 API가 필요합니다. `api-version`이 1.20이라 실제로는 1.20 이상에서
  동작합니다.
- 버전은 `gradle.properties`의 `version`에서 바꾸고, `plugin.yml`에 자동으로 들어갑니다.
