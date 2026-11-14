---
sidebar_position: 5
title: 명령어
---

# 명령어

`/보급상자`로도 쓸 수 있습니다. 모든 명령어는 `gtsupplydrop.admin` 권한이 필요합니다(기본값 OP).

| 명령어                      | 설명                                             |
| --------------------------- | ------------------------------------------------ |
| `/gtsupplydrop start [분]`  | 정기 드랍 시작. 분을 생략하면 `interval-minutes` |
| `/gtsupplydrop stop`        | 정기 드랍 중단                                   |
| `/gtsupplydrop force`       | 지금 한 번 드랍                                  |
| `/gtsupplydrop zone <구역>` | 활성 구역 변경                                   |
| `/gtsupplydrop loot`        | 보상 세트 GUI (플레이어만)                       |
| `/gtsupplydrop reload`      | `config.yml`과 `loot.yml` 다시 불러오기          |

## 권한

| 권한                 | 기본값 | 설명        |
| -------------------- | ------ | ----------- |
| `gtsupplydrop.admin` | OP     | 모든 명령어 |

떨어진 상자는 누구나 열 수 있습니다. 상자를 보호하려면 다른 보호 플러그인을 쓰세요.

## reload

`config.yml`과 `loot.yml`을 다시 읽습니다. 정기 드랍은 계속 돌지만 **주기는 바뀌지 않습니다.** `interval-minutes`를
바꿨다면 `start`를 다시 실행하세요.
