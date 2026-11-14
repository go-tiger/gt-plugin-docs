---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목 | 요구 사항                                           |
| ---- | --------------------------------------------------- |
| 서버 | Spigot 1.20.1 이상 (Paper 등 Spigot 호환 서버 포함) |
| Java | 17 이상                                             |

다른 플러그인은 필요 없습니다. SQLite 드라이버는 JAR에 들어 있습니다.

## 설치

1. `GTJumpPad-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행하면 `plugins/GTJumpPad/` 폴더에 `config.yml`과 `gtjumppad.db`가 생성됩니다.
3. 점프패드로 쓸 블록을 손에 들고 `/gtjumppad set`으로 등록합니다.
4. `/gtjumppad give`로 점프패드 블록을 받아 설치합니다.

:::warning

`gtjumppad.db`에 등록한 블록과 설치된 점프패드 좌표가 모두 들어 있습니다. 지우면 설치해 둔 점프패드가 모두 일반 블록이
됩니다.

:::

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
