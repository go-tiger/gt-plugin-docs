---
sidebar_position: 2
title: 빌드
---

# 빌드

```bash
cd GTWoodcutter
./gradlew build
```

| 결과물                               | 비고                 |
| ------------------------------------ | -------------------- |
| `build/libs/GTWoodcutter-<버전>.jar` | 외부 라이브러리 없음 |

- Java 17 toolchain, Spigot API 1.20.1로 컴파일합니다. 실행은 데이터팩 인챈트를 지원하는 Paper 1.21 이상에서 합니다.
- 버전은 `gradle.properties`의 `version`에서 바꾸고, `plugin.yml`에 자동으로 들어갑니다.
- 데이터팩(`datapack/`)은 JAR에 포함되지 않습니다. 배포할 때 따로 묶어 주세요.
