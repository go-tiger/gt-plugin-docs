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

1. `GTMine-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                        | 설명                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `plugins/GTMine/config.yml` | 마커, 광산별 확률 풀과 리젠 시간, 효과, 메시지                                                 |
| `plugins/GTMine/gtmine.db`  | 광산 상태와 리젠 포인트 좌표를 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

3. 기본 설정에는 `main` 광산이 들어 있습니다. [광산 만들기](./creating.md)를 보고 리젠 포인트를 깝니다.

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTMine] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtmine.db`로 쓰던 데이터가 있다면 콘솔에서 `/gtdatabase migrate mine plugins/GTMine/gtmine.db`로 옮긴 뒤 서버를
   재시작합니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다. 자세한 내용은
[데이터베이스](../dev/database.md) 문서를 참고하세요.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
