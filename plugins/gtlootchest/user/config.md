---
sidebar_position: 6
title: 설정
---

# 설정

`plugins/GTLootChest/config.yml`을 수정한 뒤 `/gtlootchest reload`로 적용합니다. 등급과 세트는 [GUI](./tiers.md)와
`tiers/<등급>.yml`로 관리합니다.

## settings

| 키                              | 기본값    | 설명                                                                  |
| ------------------------------- | --------- | --------------------------------------------------------------------- |
| `default-weight`                | `10`      | 랜덤 풀에 새 세트를 만들 때 가중치                                    |
| `max-weight`                    | `1000000` | 입력할 수 있는 가중치 최댓값                                          |
| `input-timeout-seconds`         | `60`      | 가중치 채팅 입력 대기 시간(초)                                        |
| `allow-duplicate-in-draw`       | `false`   | 랜덤 풀에서 한 상자에 같은 세트 중복 허용                             |
| `allow-duplicate-in-guaranteed` | `true`    | 보장 풀에서 한 상자에 같은 세트 중복 허용                             |
| `markers-per-tick`              | `20`      | `start`, `stop` 때 한 틱에 바꿀 과녁 수. 낮출수록 렉이 줄고 오래 걸림 |
| `trap-percent`                  | `10`      | `start` 때 함정으로 바꿀 과녁 비율(%)                                 |
| `trap-poison-amplifier`         | `0`       | 함정 독 레벨. `0`은 독 I, `1`은 독 II. 높을수록 같은 양을 빨리 깎음   |

## tiers/&lt;등급&gt;.yml

| 키                             | 기본값   | 설명                                   |
| ------------------------------ | -------- | -------------------------------------- |
| `random-count.min`, `.max`     | `3`, `3` | 상자마다 랜덤 풀에서 뽑을 세트 수 범위 |
| `guaranteed-count.min`, `.max` | `0`, `0` | 상자마다 보장 풀에서 뽑을 세트 수 범위 |

나머지 키(세트 데이터)는 GUI가 관리합니다. 형식은 [데이터 파일](../dev/data.md)을 참고하세요.

## messages

`&` 색상 코드를 쓸 수 있습니다. 대부분 앞에 `prefix`가 붙고, 목록과 정보(`tier-list-*`, `tier-info-*`), 가중치 입력
안내(`weight-prompt*`)에는 붙지 않습니다.

**등급과 풀**

| 키                           | 치환자                                                            | 사용 시점                            |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------ |
| `tier-created`               | `%tier%`                                                          | 등급 생성                            |
| `tier-already-exists`        |                                                                   | 같은 이름이 있음                     |
| `tier-name-invalid`          |                                                                   | 쓸 수 없는 이름                      |
| `tier-not-found`             | `%tier%`                                                          | 없는 등급                            |
| `tier-deleted`               | `%tier%`                                                          | 등급 삭제                            |
| `tier-delete-in-use`         | `%tier%`, `%count%`                                               | 사용 중인 상자가 있어 다시 입력 요청 |
| `tier-list-header`           |                                                                   | 목록 제목                            |
| `tier-list-entry`            | `%tier%`, `%random_count%`, `%guaranteed_count%`, `%chest_count%` | 목록 항목                            |
| `tier-list-empty`            |                                                                   | 등급 없음                            |
| `tier-info-header`           | `%tier%`                                                          | 정보 제목                            |
| `tier-info-random`           | `%pool_size%`, `%min%`, `%max%`                                   | 랜덤 풀 정보                         |
| `tier-info-guaranteed`       | `%pool_size%`, `%min%`, `%max%`                                   | 보장 풀 정보                         |
| `tier-info-guaranteed-empty` | `%min%`, `%max%`                                                  | 보장 풀이 비었음                     |
| `tier-info-chests`           | `%count%`                                                         | 이 등급의 상자 수                    |
| `tier-info-markers`          | `%count%`                                                         | 이 등급의 과녁 수                    |
| `pool-saved`                 | `%tier%`, `%pool%`, `%set%`                                       | 세트 저장                            |
| `set-deleted`                | `%set%`                                                           | 세트 삭제                            |
| `weight-prompt`              | `%slot%`                                                          | 가중치 입력 요청                     |
| `weight-prompt-cancel`       |                                                                   | 취소 방법 안내                       |
| `weight-invalid`             |                                                                   | 숫자가 아님                          |
| `weight-out-of-range`        | `%max%`                                                           | 범위 밖                              |
| `weight-set`                 | `%slot%`, `%weight%`                                              | 가중치 저장                          |
| `weight-target-gone`         |                                                                   | 입력 중 등급이나 세트가 사라짐       |
| `input-cancelled`            |                                                                   | `취소` 입력                          |
| `input-timeout`              |                                                                   | 입력 시간 초과                       |

**상자**

| 키                      | 치환자                  | 사용 시점                          |
| ----------------------- | ----------------------- | ---------------------------------- |
| `chest-not-found`       |                         | 바라보는 곳에 상자 없음            |
| `chest-not-empty`       |                         | 내용물이 있어 `force` 필요         |
| `chest-filled`          | `%tier%`, `%count%`     | 채우기 완료                        |
| `chest-fill-empty`      | `%tier%`                | 뽑힌 아이템이 없음                 |
| `chest-overflow`        | `%overflow%`            | 칸이 모자라 일부 못 넣음           |
| `chest-info-tier`       | `%tier%`, `%filled_at%` | 상자 정보                          |
| `chest-info-unassigned` |                         | 등급이 삭제된 상자의 `%tier%` 표시 |
| `chest-info-none`       |                         | 기록 없는 상자                     |
| `chest-info-missing`    |                         | 기록은 있는데 상자가 없음          |

**과녁과 모드**

| 키                       | 치환자                            | 사용 시점                    |
| ------------------------ | --------------------------------- | ---------------------------- |
| `marker-started`         | `%count%`, `%traps%`, `%skipped%` | `start` 완료                 |
| `marker-stopped`         | `%count%`, `%skipped%`            | `stop` 완료                  |
| `marker-busy`            |                                   | 전환 진행 중                 |
| `marker-already-started` |                                   | 이미 상자 모드               |
| `marker-already-stopped` |                                   | 이미 배치 모드               |
| `marker-none`            |                                   | 과녁 없음                    |
| `marker-given`           | `%player%`, `%tier%`, `%count%`   | 과녁 지급                    |
| `marker-amount-invalid`  | `%max%`                           | 개수 범위 밖                 |
| `marker-placed`          | `%tier%`                          | 과녁 설치                    |
| `marker-removed`         | `%tier%`                          | 과녁 제거                    |
| `marker-place-active`    |                                   | 상자 모드에서 과녁 설치 시도 |
| `trap-triggered`         |                                   | 함정 상자를 엶               |

**공통**

| 키                                   | 치환자     | 사용 시점                          |
| ------------------------------------ | ---------- | ---------------------------------- |
| `prefix`                             |            | 메시지 앞 접두사                   |
| `no-permission`                      |            | 권한 없음                          |
| `player-only`                        |            | 콘솔에서 플레이어 전용 명령어 실행 |
| `player-not-found`                   | `%player%` | 접속 중이 아닌 플레이어            |
| `usage`, `usage-tier`, `usage-chest` |            | 명령어 형식 오류                   |
| `reloaded`                           |            | 다시 불러오기 완료                 |
