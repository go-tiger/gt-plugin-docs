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
[GTDatabase](https://github.com/go-tiger/GTDatabase)가 설치돼 있으면 `gtjumppad.db` 대신 GTDatabase의 공용 DB를 씁니다.

## 설치

1. `GTJumpPad-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행하면 `plugins/GTJumpPad/` 폴더에 `config.yml`과 `gtjumppad.db`가 생성됩니다.
3. 점프패드로 쓸 블록을 손에 들고 `/gtjumppad set`으로 등록합니다.
4. `/gtjumppad give`로 점프패드 블록을 받아 설치합니다.

:::warning

`gtjumppad.db`(GTDatabase를 쓰면 공용 DB)에 등록한 블록과 설치된 점프패드 좌표가 모두 들어 있습니다. 지우면 설치해 둔
점프패드가 모두 일반 블록이 됩니다.

:::

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTJumpPad] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtjumppad.db`로 쓰던 데이터가 있다면 콘솔에서 `/gtdatabase migrate jumppad plugins/GTJumpPad/gtjumppad.db`로
   옮긴 뒤 서버를 재시작합니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
