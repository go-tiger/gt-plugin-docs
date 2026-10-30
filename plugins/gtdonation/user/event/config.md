---
sidebar_position: 1
title: 동작 모드와 설정
---

# 동작 모드와 설정

GTDonation-Event의 설정 파일은 `plugins/GTDonationEvent/` 아래에 있습니다.

| 파일           | 내용                                                                |
| -------------- | ------------------------------------------------------------------- |
| `config.yml`   | 동작 모드, 금액별 액션, 액션별 세부 설정                            |
| `messages.yml` | 플레이어에게 보이는 메시지 → [메시지](./messages.md)                |
| `targets.yml`  | `ALL`/`RANDOM` 대상에서 제외할 플레이어 → [대상 지정](./targets.md) |
| `example.sk`   | Skript 예제 (모든 액션 사용 예시)                                   |

수정 후 `/gtde reload`로 다시 불러옵니다. 단, `script-mode` 변경은 **서버 재시작**이 필요합니다.

## 동작 모드

`script-mode` 값에 따라 후원을 처리하는 방식이 달라집니다.

|                      | Skript 모드 (`true`, 기본값)               | config 모드 (`false`)                                    |
| -------------------- | ------------------------------------------ | -------------------------------------------------------- |
| 처리 방식            | Skript에서 `DonationEvent`를 받아 API 호출 | `config.yml`의 `events`에 적힌 금액과 일치하면 액션 실행 |
| 사용 가능 액션       | **전체**                                   | 25종 ([목록](./actions.md)에서 config 이름이 있는 것)    |
| 알림 메시지          | 전송                                       | 전송 안 함                                               |
| `RANDOM` 추첨 연출   | 재생                                       | 재생 안 함                                               |
| 금액 범위, 조건 분기 | 자유롭게 작성                              | 정확히 일치하는 금액만                                   |

**대부분의 경우 Skript 모드를 권장합니다.** Skript 모드에서는 `config.yml`의 `events`가 무시되고, 후원이 들어오면 콘솔에
`[SCRIPT] 후원자 -> 플레이어 : 금액` 로그만 남깁니다. 작성 방법은 [Skript 연동](../../dev/event/skript.md)을 참고하세요.

## config 모드: 금액별 액션

```yaml title="config.yml"
script-mode: false

events:
  1000:
    action: BUFF
    target: player
  5000:
    action: WEAK_MONSTER
    target: random
  10000:
    action: DEBUFF
    target: all
```

| 키              | 설명                                                             |
| --------------- | ---------------------------------------------------------------- |
| `events.<금액>` | 후원 금액. **정확히 일치할 때만** 실행됩니다                     |
| `action`        | 실행할 액션 이름 (대소문자 무관). [액션 목록](./actions.md) 참고 |
| `target`        | `player` / `random` / `all`. [대상 지정](./targets.md) 참고      |

:::warning config 모드에서 BREAD, STEAK, TOTEM config 모드에서는 이 세 액션이 **후원 금액만큼** 아이템을 지급합니다.
예를 들어 1000원 후원에 `BREAD`를 지정하면 빵 1000개가 지급됩니다. 개수를 정하려면 Skript 모드에서
`getBread(player, 개수)`를 사용하세요. :::

없는 액션 이름을 쓰면 해당 후원은 조용히 무시됩니다.

## 공통 설정

```yaml
config-version: 1.0
script-mode: true
random-action-same-result-for-all: true
```

| 키                                  | 기본값 | 설명                                                                                                                                                                    |
| ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config-version`                    | `1.0`  | 설정 파일 버전. 플러그인이 관리하므로 직접 수정하지 마세요                                                                                                              |
| `script-mode`                       | `true` | 동작 모드. 위 표 참고                                                                                                                                                   |
| `random-action-same-result-for-all` | `true` | 랜덤 요소가 있는 액션(버프, 몬스터, 아이템, 크기 등)을 `ALL`로 실행할 때 `true`면 전원이 같은 결과를, `false`면 각자 다른 결과를 받습니다. Skript 모드에서만 적용됩니다 |

액션별 세부 설정(지속 시간, 반경, 후보 목록 등)은 [액션 목록](./actions.md)에서 각 액션과 함께 설명합니다.
