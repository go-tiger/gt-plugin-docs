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

모두 선택 사항인 연동 플러그인입니다. 없으면 해당 기능만 꺼지고 나머지는 정상 동작합니다.

| 플러그인                                                                  | 쓰이는 곳                      |
| ------------------------------------------------------------------------- | ------------------------------ |
| [Vault](https://www.spigotmc.org/resources/vault.34315/)와 경제 플러그인  | 돈 보상                        |
| [Citizens](https://www.spigotmc.org/resources/citizens.13811/)            | NPC 우클릭으로 퀘스트 GUI 열기 |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | `%gtquest_inprogress_count%`   |

## 설치

1. `GTQuest-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                         | 설명                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `plugins/GTQuest/config.yml` | GUI 설정, 경제 연동, 메시지                                                                        |
| `plugins/GTQuest/gtquest.db` | 퀘스트 정의와 플레이어 진행 기록을 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

3. [퀘스트 만들기](./creating.md)를 보고 퀘스트를 만듭니다.

:::warning 퀘스트는 `config.yml`이 아니라 **`gtquest.db`에 저장**됩니다(GTDatabase를 쓰면 공용 DB). 백업하거나 다른
서버로 옮길 때 꼭 포함하세요. :::

## GTDatabase와 함께 쓰기

[GTDatabase](https://github.com/go-tiger/GTDatabase)가 설치돼 있으면 GTQuest가 공용 DB를 씁니다.

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTQuest] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtquest.db`로 쓰던 데이터가 있다면 콘솔에서 `/gtdatabase migrate quest plugins/GTQuest/gtquest.db`로 옮긴 뒤
   서버를 재시작합니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다. 자세한 내용은
[데이터베이스](../dev/database.md) 문서를 참고하세요.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
