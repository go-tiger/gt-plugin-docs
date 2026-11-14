---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 패키지                     | 역할                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `dev.gotiger.gTBattleZone` | 메인 클래스. 설정 로드, 중심 저장, 피해 타이머 관리                                       |
| `command`                  | `/gtbattlezone`                                                                           |
| `zone`                     | 중심과 진행 상태(`ZoneState`), 단계(`ZonePhase`), 진행(`ZoneScheduler`), 최종 단계 이벤트 |
| `damage`                   | 자기장 밖 피해(`ZoneDamageTask`)                                                          |
| `util`                     | 메시지                                                                                    |

데이터 파일은 없습니다. 중심만 `config.yml`의 `state`에 저장하고, 진행 상태는 메모리에만 둡니다.

## 축소 방식

축소는 `WorldBorder.setSize(size, seconds)` 한 번으로 서버가 매끄럽게 처리합니다. 플러그인은 "다음 단계로 넘어갈 시점"을
기다리는 `runTaskLater` 하나만 둡니다.

```
start()
  │  setCenter, 경고, 피해 방식 적용
  │  setSize(phase[0].size)  (즉시)
  ▼  scheduleNext(phase[0].duration)
advance()  (예약 시점 또는 shrink 명령)
  │  setCenter (진행 중 바뀐 중심 반영)
  │  setSize(phase[i+1].size, phase[i].shrink)
  │  phase-advanced 알림
  ▼  scheduleNext(phase[i].shrink + phase[i+1].duration)
마지막 단계면
  ▼  shrinkEndsAt까지 기다린 뒤 finish(): final-phase 알림, BattleZoneFinalPhaseEvent
```

- `start` 시점의 단계 목록을 복사해 두므로, 진행 중 `reload`해도 이번 판의 단계는 바뀌지 않습니다.
- `stop`은 `setSize(getSize())`로 보더를 그 자리에서 고정합니다.
- 상태 표시용으로 `nextTransitionAt`(다음 축소 시작 시각), `shrinkEndsAt`(축소 끝 시각)을 epoch 밀리초로 기록합니다.

## 피해 판정

`ZoneDamageTask`는 `damage-check-interval-seconds`마다 실행되는 메인 스레드 타이머입니다. `reload`하면 새 주기로 다시
만듭니다.

- 진행 중인 월드의 플레이어만 봅니다.
- 보더 중심과 `getSize() / 2`를 기준으로 |dx|, |dz|를 각각 비교합니다(정사각형). 줄어드는 중에는 `getSize()`가 그 순간의
  값이라 그대로 씁니다.
- `player.damage(amount)`로 피해를 줍니다. 공격자 없는 일반 피해입니다.
- 바닐라 방식일 때는 아무것도 하지 않고, 바닐라 보더의 `damageAmount`, `damageBuffer`를 씁니다. 자체 판정일 때는
  `damageAmount`를 0으로 둬 중복 피해를 막습니다.

## 진행 상태와 재시작

`ZoneState.phaseIndex`가 -1이 아니면 진행 중입니다. 이 값은 메모리에만 있어서, `onDisable`에서 타이머를 취소하고 상태를
초기화합니다. 월드보더는 건드리지 않습니다. 그래서 재시작 후에는 보더만 남고 피해 판정과 단계 진행은 멈춘 상태가 됩니다.
