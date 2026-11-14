---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목 | 요구 사항                          |
| ---- | ---------------------------------- |
| 서버 | Spigot 1.20.1 이상. **Paper 권장** |
| Java | 17 이상                            |

:::tip Paper에서는 점프를 `PlayerJumpEvent`로 정확하게 감지합니다. Spigot에서는 이동 이벤트로 점프를 추정하므로, 가끔
점프해도 올라가지 않거나 계단을 오를 때 반응할 수 있습니다. 현재 방식은 `/gtelevator info`에서 확인할 수 있습니다. :::

[GTDatabase](https://github.com/go-tiger/GTDatabase)는 선택 사항입니다. 설치돼 있으면 `gtelevator.db` 대신 GTDatabase의
공용 DB를 씁니다.

## 설치

1. `GTElevator-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일이 자동으로 생성됩니다.

| 파일                               | 설명                                                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `plugins/GTElevator/config.yml`    | 이동 규칙, 효과, 메시지 설정                                                                                        |
| `plugins/GTElevator/gtelevator.db` | 엘리베이터 블록 아이템, 설치된 블록 위치, 층 이름을 저장하는 SQLite 데이터베이스. GTDatabase를 쓰면 만들어지지 않음 |

3. 게임에 들어가 엘리베이터로 쓸 블록을 들고 `/gtelevator set`을 실행합니다. 자세한 방법은 [사용 방법](./usage.md)을
   참고하세요.

## GTDatabase와 함께 쓰기

1. GTDatabase를 설치하고 설정합니다.
2. 서버를 실행하고 로그에서 `[GTElevator] 데이터베이스: GTDatabase(...) 공용 연결을 사용합니다.`를 확인합니다.
3. 이미 `gtelevator.db`로 쓰던 데이터가 있다면 콘솔에서
   `/gtdatabase migrate elevator plugins/GTElevator/gtelevator.db`로 옮긴 뒤 서버를 재시작합니다.

GTDatabase가 설치돼 있어도 공용 연결에 실패하면 자체 SQLite로 동작합니다.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
