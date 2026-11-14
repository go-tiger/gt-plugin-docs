---
sidebar_position: 1
title: 구조
---

# 구조

GTLootChest는 외부에 공개하는 API나 이벤트가 없고, 데이터베이스 없이 YAML 파일에 저장합니다.

## 패키지

| 패키지                    | 역할                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTLootChest` | 메인 클래스. 구성 요소 조립, 종료 시 전환 마무리와 GUI 저장                                           |
| `command`                 | 최상위(`LootChestCommand`), `tier`, `chest`, 과녁과 모드(`MarkerCommand`)                             |
| `tier`                    | 등급(`LootTier`), 세트(`LootEntry`), 캐시와 CRUD(`TierManager`), 등급 파일(`TierStorage`)             |
| `chest`                   | 추첨과 채우기(`ChestFillService`), 채운 상자 기록(`ChestStorage`, `ChestRecord`)                      |
| `marker`                  | 과녁 아이템 PDC, 설치와 파괴, 보호, 함정(`MarkerListener`), 모드 전환(`MarkerService`), `markers.yml` |
| `gui`                     | 세트 목록, 세트 편집 GUI와 리스너                                                                     |
| `input`                   | 가중치 채팅 입력                                                                                      |
| `util`                    | 아이템 직렬화, 메시지                                                                                 |

## 추첨

`ChestFillService.draw(tier)`:

1. **보장 풀**: 개수를 `guaranteed-count` 범위에서 정하고, 세트를 균등 무작위로 뽑습니다. 가중치는 보지 않습니다.
2. **랜덤 풀**: 개수를 `random-count` 범위에서 정하고, 가중치 0인 세트를 뺀 뒤 가중치 누적합으로 뽑습니다(`long` 합계).
3. 중복을 허용하지 않으면 뽑힌 세트를 후보에서 뺍니다. 후보가 개수보다 적으면 그 상자만 중복을 허용합니다.
4. 결과 목록은 보장 풀 아이템이 앞에 옵니다.

`fill()`은 빈칸을 섞은 순서대로 목록 앞부터 넣습니다. 그래서 칸이 모자라면 뒤쪽(랜덤 풀) 아이템이 빠집니다. 빠진
아이템은 종류와 수량을 콘솔에 남깁니다.

## 모드 전환

`MarkerService`는 과녁 목록을 큐에 넣고, 1틱마다 `markers-per-tick`개씩 처리합니다. 먼 과녁의 청크를 불러오는 렉을
나누기 위해서입니다.

| 전환      | 과녁 하나 처리                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------- |
| `start`   | 블록이 `TARGET`이고 등급이 있으면 `CHEST` 또는 `TRAPPED_CHEST`로 바꾸고 채움, `chests.yml`에 기록 |
| `stop`    | 상자면 내용물을 비운 뒤 `TARGET`으로. 빈자리면 `TARGET` 복구. 다른 블록이면 건너뜀. 기록 삭제     |
| `restart` | `stop` 처리 후 이어서 `start`                                                                     |

- `start`는 시작할 때 `active = true`로 바꾸고, `stop`은 끝날 때 `false`로 바꿉니다. 그래서 전환 중에 과녁 설치나 파괴
  기록이 끼어들지 않습니다.
- 함정은 `start` 직전에 `assignTraps(trap-percent)`로 무작위로 정해 `markers.yml`에 저장합니다.
- 서버 종료 중에 전환이 진행 중이면 `finishNow()`로 남은 과녁을 한 번에 처리해, 절반만 바뀐 채로 남지 않게 합니다.

## 함정

`InventoryOpenEvent`에서 상자 모드이고, 연 상자가 `TRAPPED_CHEST`이며, 그 좌표의 과녁 기록이 함정이면 독을 겁니다. 큰
상자는 양쪽을 모두 확인합니다.

바닐라 독은 `25 >> 레벨` 틱마다 1 피해를 줍니다. 깎을 횟수를 `floor(현재 체력 / 2)`로 정하고, 지속 시간을 `횟수 × 간격`
틱으로 합니다.

## 과녁 추적

과녁 아이템에는 PDC `gtlootchest:marker_tier`(STRING, 등급 이름)를 심습니다. 블록이 되면 PDC가 사라지므로
`BlockPlaceEvent`에서 좌표와 등급을 `markers.yml`에 기록합니다.

배치 모드에서만 폭발과 피스톤을 막습니다. 상자 모드의 상자는 바닐라 상자로 취급합니다.
