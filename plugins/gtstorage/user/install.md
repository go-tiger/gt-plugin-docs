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

다른 플러그인은 필요 없습니다. SQLite 드라이버가 JAR에 포함되어 있습니다.
[GTDatabase](https://github.com/go-tiger/GTDatabase)가 설치돼 있으면 GTDatabase의 공용 DB를 씁니다.

## 설치

1. `GTStorage-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                             | 설명                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `plugins/GTStorage/config.yml`   | 기본 줄 수, 자동 저장 주기, 보관 금지 아이템, 메시지 설정                                      |
| `plugins/GTStorage/gtstorage.db` | 창고 내용과 플레이어별 줄 수를 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

3. 필요하면 [`config.yml`](./config.md)을 수정합니다.

:::danger `gtstorage.db`(또는 GTDatabase 공용 DB)에는 **모든 플레이어의 창고 아이템**이 들어 있습니다. 서버를 백업할 때
꼭 포함하세요. :::

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTStorage] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtstorage.db`로 쓰던 데이터가 있다면 콘솔에서 `/gtdatabase migrate storage plugins/GTStorage/gtstorage.db`로
   옮깁니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다.

:::warning 여러 서버가 같은 공용 DB를 쓰는 구성에서는 같은 플레이어의 창고를 두 서버에서 동시에 열면 아이템이 복사될 수
있습니다. 자세한 내용은 [데이터베이스](../dev/database.md) 문서를 참고하세요. :::

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
