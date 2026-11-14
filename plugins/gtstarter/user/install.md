---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목          | 요구 사항                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------- |
| 서버          | Spigot 1.20.1 이상 (Paper 등 Spigot 호환 서버 포함)                                           |
| Java          | 17 이상                                                                                       |
| 선택 플러그인 | [Vault](https://www.spigotmc.org/resources/vault.34315/)와 경제 플러그인 (소지금을 지급할 때) |

SQLite 드라이버가 JAR에 포함되어 있으므로 별도 데이터베이스 설치는 필요 없습니다.
[GTDatabase](https://github.com/go-tiger/GTDatabase)가 설치돼 있으면 GTDatabase의 공용 DB를 씁니다.

## 설치

1. `GTStarter-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                             | 설명                                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `plugins/GTStarter/config.yml`   | 소지금 금액, 경제 연동, 메시지 설정                                                                       |
| `plugins/GTStarter/gtstarter.db` | 지급 아이템 목록과 플레이어별 지급 기록을 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

3. 처음 실행하면 지급 아이템으로 **스테이크 10개**가 기본 등록됩니다. 게임에 들어가 `/gtstarter edit`로 원하는
   아이템으로 바꿉니다.
4. 소지금 금액을 바꾸려면 [`config.yml`](./config.md)의 `settings.money`를 수정하고 `/gtstarter reload`를 실행합니다.

:::warning 지급 아이템은 `config.yml`이 아니라 **`gtstarter.db`에 저장**됩니다. 다른 서버로 옮길 때는 `config.yml`과
함께 `gtstarter.db`도 복사하세요. GTDatabase를 쓰면 공용 DB에 저장됩니다. :::

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTStarter] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtstarter.db`로 쓰던 데이터가 있다면 콘솔에서 `/gtdatabase migrate starter plugins/GTStarter/gtstarter.db`로
   옮긴 뒤 서버를 재시작합니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다. 자세한 내용은
[데이터베이스](../dev/database.md) 문서를 참고하세요.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
