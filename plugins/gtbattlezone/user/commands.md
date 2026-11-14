---
sidebar_position: 4
title: 명령어
---

# 명령어

`/자기장`으로도 쓸 수 있습니다. 모든 명령어는 `gtbattlezone.admin` 권한이 필요합니다(기본값 OP).

| 명령어                              | 설명                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| `/gtbattlezone center [월드] [x z]` | 자기장 중심 지정. 좌표를 생략하면 내 위치 (콘솔은 좌표 필수) |
| `/gtbattlezone start`               | 자기장 시작                                                  |
| `/gtbattlezone stop`                | 진행 중단. 보더는 그대로                                     |
| `/gtbattlezone shrink`              | 바로 다음 단계로 축소 시작                                   |
| `/gtbattlezone status`              | 진행 상태                                                    |
| `/gtbattlezone reset`               | 진행을 멈추고 보더 초기화                                    |
| `/gtbattlezone reload`              | `config.yml` 다시 불러오기                                   |

## 권한

| 권한                  | 기본값 | 설명                                               |
| --------------------- | ------ | -------------------------------------------------- |
| `gtbattlezone.admin`  | OP     | 모든 명령어                                        |
| `gtbattlezone.bypass` | 없음   | 자기장 밖 피해를 받지 않음 (자체 판정 방식일 때만) |

`gtbattlezone.bypass`는 OP에게도 기본으로 주어지지 않습니다. 진행자가 피해를 받지 않으려면 권한 플러그인으로 직접 주거나
관전 모드를 쓰세요.

## reload

`config.yml`을 다시 읽고 피해 판정 주기와 피해 방식을 바로 적용합니다.

- 진행 중인 판의 **단계 목록은 바뀌지 않습니다.** `start` 시점의 `phases`를 끝까지 씁니다.
- 보더 경고 거리, 경고 시간은 다음 `start`부터 적용됩니다.
- 중심도 다시 읽습니다. 진행 중이면 다음 축소 때 적용됩니다.
