---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목          | 요구 사항                                                                        |
| ------------- | -------------------------------------------------------------------------------- |
| 서버          | **Paper 1.21.1 이상**                                                            |
| Java          | 21 이상                                                                          |
| 필수 플러그인 | [Multiverse-Core](https://modrinth.com/plugin/multiverse-core)                   |
| 권장 플러그인 | [Multiverse-NetherPortals](https://modrinth.com/plugin/multiverse-netherportals) |

- Multiverse-Core가 없으면 플러그인이 로드되지 않습니다.
- [GTDatabase](https://github.com/go-tiger/GTDatabase)는 선택 사항입니다. 설치돼 있으면 `gthardcoreversus.db` 대신
  GTDatabase의 공용 DB를 씁니다.
- Multiverse-NetherPortals가 없으면 팀 월드의 네더, 엔드 포털이 그 팀의 네더, 엔드로 연결되지 않습니다. 엔더 드래곤을
  잡으려면 사실상 필수입니다.

:::warning `server.properties`의 `hardcore`는 **`false`**로 두세요. 바닐라 하드코어는 죽으면 영구 관전자가 되는데, 이
플러그인은 바닐라 하드코어 대신 자체 부활 규칙을 씁니다. 난이도는 `world-difficulty` 설정으로 게임 월드에만 적용됩니다.
:::

## 설치

1. Multiverse-Core(와 NetherPortals)를 먼저 설치합니다.
2. `GTHardcoreVersus-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
3. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                                           | 설명                                                                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `plugins/GTHardcoreVersus/config.yml`          | 부활 시간, 월드 세트, 난이도, 즉사 기준, 메시지, 사운드                                                          |
| `plugins/GTHardcoreVersus/gthardcoreversus.db` | 팀 배정, 부활 타이머, 즉사 횟수, 기록, 팀 상태를 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

4. 서버가 켜지면 첫 틱에 `config.yml`에 적힌 월드 세트(기본 `gthcvs_a_1`~`3`, `gthcvs_b_1`~`3`)를 Multiverse로 만듭니다.
   **월드를 만드는 동안 서버가 잠시 멈출 수 있습니다.**

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTHardcoreVersus] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gthardcoreversus.db`로 쓰던 데이터가 있다면 콘솔에서 아래 명령으로 옮긴 뒤 서버를 재시작합니다.
   `/gtdatabase migrate hardcoreversus plugins/GTHardcoreVersus/gthardcoreversus.db --strip-prefix=gthcvs_`

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다. 자세한 내용은
[데이터베이스](../dev/database.md) 문서를 참고하세요.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
