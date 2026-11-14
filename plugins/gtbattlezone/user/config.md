---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTBattleZone/config.yml`을 수정한 뒤 `/gtbattlezone reload`로 적용합니다.

:::warning `/gtbattlezone center`는 `config.yml`을 **덮어써서 저장**합니다. 파일을 수정하는 중이라면 `reload`를 먼저
하세요. 그러지 않으면 수정한 내용이 사라질 수 있고, 저장할 때 주석도 사라질 수 있습니다. :::

## state

| 키             | 기본값 | 설명                                       |
| -------------- | ------ | ------------------------------------------ |
| `center-world` | `''`   | 자기장 중심 월드. 비어 있으면 `start` 불가 |
| `center-x`     | `0`    | 중심 x                                     |
| `center-z`     | `0`    | 중심 z                                     |

`/gtbattlezone center`가 자동으로 바꾸는 값입니다. 직접 고쳐도 됩니다.

## settings

| 키                              | 기본값  | 설명                                                              |
| ------------------------------- | ------- | ----------------------------------------------------------------- |
| `warning-distance`              | `50`    | 보더에 이만큼(칸) 가까워지면 화면 가장자리가 빨개짐               |
| `warning-time`                  | `15`    | 보더가 줄어들어 이 시간(초) 안에 닿게 되면 화면 가장자리가 빨개짐 |
| `damage-check-interval-seconds` | `2`     | 자기장 밖 피해 판정 주기(초). 최소 1                              |
| `damage-per-tick`               | `2`     | 판정마다 주는 피해 (2 = 하트 1개)                                 |
| `use-vanilla-border-damage`     | `false` | 바닐라 월드보더 피해 사용                                         |
| `vanilla-damage-amount`         | `0.2`   | 바닐라 방식: 보더 밖 1칸당 초당 피해                              |
| `vanilla-damage-buffer`         | `5.0`   | 바닐라 방식: 보더 밖에서 피해가 시작되기까지 여유 거리(칸)        |

### 피해 방식

| 방식             | 설정                               | 특징                                                                   |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| 자체 판정 (기본) | `use-vanilla-border-damage: false` | 밖에 있으면 거리와 상관없이 고정 피해. 액션바 경고. `bypass` 권한 적용 |
| 바닐라           | `use-vanilla-border-damage: true`  | 보더에서 멀수록 피해가 큼. 여유 거리 있음. 액션바 경고와 `bypass` 없음 |

두 방식이 겹쳐서 피해가 두 번 들어가지 않도록, 자체 판정을 쓸 때는 바닐라 보더 피해를 0으로 끕니다.

## phases

축소 단계를 순서대로 적습니다.

```yaml
phases:
  - size: 2000
    duration-seconds: 300
    shrink-seconds: 60
  - size: 1000
    duration-seconds: 240
    shrink-seconds: 60
  - size: 400
    duration-seconds: 180
    shrink-seconds: 45
  - size: 100
    duration-seconds: 120
    shrink-seconds: 30
  - size: 0
    duration-seconds: 0
    shrink-seconds: 0
```

| 키                 | 설명                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| `size`             | 정사각형 **한 변의 전체 길이**(반지름이 아님). `2000`이면 중심에서 사방 1000칸 |
| `duration-seconds` | 이 크기로 유지되는 시간                                                        |
| `shrink-seconds`   | 이 단계에서 **다음 단계 크기로** 줄어드는 데 걸리는 시간. `0`이면 한 번에 바뀜 |

- 마지막 단계의 `duration-seconds`, `shrink-seconds`는 쓰이지 않습니다.
- 월드보더는 1보다 작아질 수 없어서 `size: 0`은 1로 줄입니다.
- 커지는 단계를 넣어도 그대로 동작합니다(보더가 넓어짐).
- `size`가 숫자가 아닌 항목은 건너뜁니다. 음수는 0으로 처리합니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. 명령어 응답에는 `prefix`가 붙습니다. 전체 알림(`started`, `phase-advanced`,
`final-phase`), 상태(`status-header`~`status-final`, `status-idle` 제외), 액션바(`outside-zone`)에는 붙지 않습니다.

| 키                    | 치환자                           | 사용 시점                               |
| --------------------- | -------------------------------- | --------------------------------------- |
| `prefix`              |                                  | 메시지 앞 접두사                        |
| `usage`               |                                  | 명령어 형식 오류                        |
| `no-permission`       |                                  | 권한 없음                               |
| `player-only`         |                                  | 콘솔에서 좌표 없이 `center`             |
| `world-not-found`     | `%world%`                        | 없는 월드                               |
| `invalid-coordinate`  |                                  | 좌표가 숫자가 아님                      |
| `center-usage`        |                                  | `center` 형식 오류                      |
| `center-set`          | `%world%`, `%x%`, `%z%`          | 중심 지정                               |
| `center-deferred`     |                                  | 진행 중이라 다음 축소부터 적용          |
| `center-world-locked` | `%world%`                        | 진행 중 다른 월드로 이동 시도           |
| `center-not-set`      |                                  | 중심 없이 `start`                       |
| `no-phases`           |                                  | 단계 없음                               |
| `started`             | `%size%`                         | 시작 (전체, 콘솔에서 실행하면 콘솔에도) |
| `already-started`     |                                  | 이미 진행 중                            |
| `stopped`             |                                  | 중단                                    |
| `border-reset`        | `%world%`                        | 보더 초기화                             |
| `not-started`         |                                  | 진행 중이 아님                          |
| `shrink-forced`       |                                  | 강제 축소                               |
| `already-shrinking`   |                                  | 이미 줄어드는 중                        |
| `already-final`       |                                  | 이미 최종 단계                          |
| `phase-advanced`      | `%phase%`, `%size%`, `%seconds%` | 다음 단계로 축소 시작 (전체)            |
| `final-phase`         |                                  | 최종 단계 도달 (전체)                   |
| `outside-zone`        |                                  | 자기장 밖 (액션바)                      |
| `status-header`       |                                  | 상태 제목                               |
| `status-center`       | `%world%`, `%x%`, `%z%`          | 중심                                    |
| `status-phase`        | `%phase%`, `%total%`             | 단계                                    |
| `status-size`         | `%current%`, `%target%`          | 크기                                    |
| `status-next`         | `%seconds%`                      | 다음 전환까지                           |
| `status-shrinking`    | `%seconds%`                      | 축소 완료까지                           |
| `status-final`        |                                  | 최종 단계                               |
| `status-idle`         |                                  | 진행 중이 아님                          |
| `reloaded`            |                                  | 다시 불러오기 완료                      |
