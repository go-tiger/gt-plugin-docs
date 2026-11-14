---
sidebar_position: 5
title: 명령어
---

# 명령어

`/전리품`으로도 쓸 수 있습니다. 모든 명령어는 `gtlootchest.admin` 권한이 필요합니다(기본값 OP).

## 등급

| 명령어                                               | 설명                                                    |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `/gtlootchest tier create <등급>`                    | 등급 생성                                               |
| `/gtlootchest tier delete <등급>`                    | 등급 삭제. 사용 중인 상자가 있으면 한 번 더 입력해야 함 |
| `/gtlootchest tier list`                             | 등급 목록                                               |
| `/gtlootchest tier info <등급>`                      | 등급 정보                                               |
| `/gtlootchest tier pool <등급> [random\|guaranteed]` | 풀 편집 GUI. 생략하면 random (플레이어만)               |
| `/gtlootchest tier manage <등급>`                    | 랜덤 풀 편집 GUI (플레이어만)                           |

## 상자

| 명령어                                  | 설명                              |
| --------------------------------------- | --------------------------------- |
| `/gtlootchest chest set <등급> [force]` | 바라보는 상자 채우기 (플레이어만) |
| `/gtlootchest chest info`               | 바라보는 상자 정보 (플레이어만)   |

## 과녁과 모드

| 명령어                                     | 설명                                                             |
| ------------------------------------------ | ---------------------------------------------------------------- |
| `/gtlootchest give <등급> [개수] [닉네임]` | 과녁 지급                                                        |
| `/gtlootchest start`                       | 배치 모드에서 상자 모드로                                        |
| `/gtlootchest stop`                        | 상자 모드에서 배치 모드로                                        |
| `/gtlootchest restart`                     | 되돌린 뒤 다시 start                                             |
| `/gtlootchest reload`                      | `config.yml`과 모든 데이터 파일 다시 불러오기. 전환 중에는 안 됨 |

## 권한

| 권한                | 기본값 | 설명        |
| ------------------- | ------ | ----------- |
| `gtlootchest.admin` | OP     | 모든 명령어 |

상자를 열거나 과녁을 부수는 데에는 권한이 필요 없습니다.
