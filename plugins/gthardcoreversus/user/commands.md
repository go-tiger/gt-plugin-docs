---
sidebar_position: 4
title: 명령어
---

# 명령어

`/하드코어`로도 쓸 수 있습니다. 모든 명령어는 `gthardcoreversus.admin` 권한이 필요합니다(기본값 OP).

| 명령어                                                              | 설명                                 |
| ------------------------------------------------------------------- | ------------------------------------ |
| `/gthardcoreversus setteam <닉네임> <A\|B>`                         | 팀 배정. 오프라인 플레이어 가능      |
| `/gthardcoreversus info [A\|B]`                                     | 팀 정보 (월드 세트, 전멸 횟수, 팀원) |
| `/gthardcoreversus start`                                           | 게임 시작                            |
| `/gthardcoreversus stop`                                            | 게임 종료. **게임 월드 전부 삭제**   |
| `/gthardcoreversus instakill <닉네임>`                              | 후원 즉사. 대상은 접속 중이어야 함   |
| `/gthardcoreversus setworld <A\|B> <월드세트>`                      | 팀 월드 세트 지정                    |
| `/gthardcoreversus reset <닉네임> [deaths\|instakills\|stack\|all]` | 기록 초기화. 생략하면 `all`          |
| `/gthardcoreversus reload`                                          | `config.yml` 다시 불러오기           |

각 명령어의 동작은 [게임 진행](./running.md)을 참고하세요.

## 권한

| 권한                     | 기본값 | 설명                                     |
| ------------------------ | ------ | ---------------------------------------- |
| `gthardcoreversus.admin` | OP     | 모든 명령어. `wipe-no-reserve` 알림 받기 |

## 참고

- 팀 이름은 명령어에서 항상 `A`, `B`로 씁니다. 메시지에는 `display-name`이 나옵니다.
- 게임이 시작됐는지는 `config.yml`의 `settings.event-started`에 저장됩니다. `start`, `stop`이 이 값을 바꾸고 파일을
  저장합니다. 그래서 서버를 재시작해도 진행 상태가 유지됩니다.
