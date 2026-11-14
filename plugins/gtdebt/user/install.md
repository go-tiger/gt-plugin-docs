---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목          | 요구 사항                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------ |
| 서버          | Spigot 1.20.1 이상 (Paper 등 Spigot 호환 서버 포함)                                              |
| Java          | 17 이상                                                                                          |
| 선택 플러그인 | [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) (플레이스홀더를 쓸 때) |

SQLite 드라이버가 JAR에 포함되어 있으므로 별도 데이터베이스 설치는 필요 없습니다.
[GTDatabase](https://github.com/go-tiger/GTDatabase)가 설치돼 있으면 GTDatabase의 공용 DB를 씁니다.

## 설치

1. `GTDebt-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                        | 설명                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------- |
| `plugins/GTDebt/config.yml` | 최초 빚 금액과 메시지 설정                                                            |
| `plugins/GTDebt/gtdebt.db`  | 빚 잔액과 증감 이력을 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

3. 필요하면 [`config.yml`](./config.md)에서 `default-debt`를 바꾸고 `/gtdebt reload`를 실행합니다.

:::warning `default-debt`는 **처음 접속하는 순간** 한 번만 적용됩니다. 이미 접속한 적이 있는 플레이어의 빚은 설정을
바꿔도 달라지지 않으니, 서버를 열기 전에 정해 두세요. :::

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTDebt] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtdebt.db`로 쓰던 데이터가 있다면 콘솔에서 `/gtdatabase migrate debt plugins/GTDebt/gtdebt.db`로 옮깁니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다. 자세한 내용은
[데이터베이스](../dev/database.md) 문서를 참고하세요.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
