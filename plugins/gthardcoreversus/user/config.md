---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTHardcoreVersus/config.yml`을 수정한 뒤 `/gthardcoreversus reload`로 적용합니다.

:::warning `start`와 `stop`은 `settings.event-started`를 바꾸면서 **`config.yml`을 덮어써서 저장**합니다. 파일을
수정하는 중이라면 `reload`를 먼저 하세요. 그러지 않으면 저장할 때 수정한 내용이 사라질 수 있습니다. 덮어쓸 때 파일의
주석도 사라질 수 있습니다. :::

## settings

| 키                     | 기본값      | 설명                                                                                   |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `respawn-seconds`      | `30`        | 부활까지 대기 시간(초)                                                                 |
| `respawn-display`      | `actionbar` | 남은 시간 표시 위치. `actionbar` 또는 `title`                                          |
| `prepare-ahead`        | `2`         | 현재 세트 다음으로 미리 만들어 둘 세트 수                                              |
| `world-difficulty`     | `hard`      | 게임 월드 난이도. `peaceful`, `easy`, `normal`, `hard`. 월드를 만들거나 불러올 때 적용 |
| `instakill-wipe-stack` | `2`         | 접속 중인 팀원 전원의 즉사 횟수가 이 값 이상이면 전멸. 최소 1                          |
| `event-started`        | `false`     | 게임 진행 중 여부. `start`, `stop` 명령어로 바꿈                                       |

`prepare-ahead`는 전멸 순간에 월드를 만들면 서버가 멈추는 문제를 막으려는 설정입니다. 서버 시작 시, `start` 시, 새
세트로 옮긴 5초 뒤에 미리 만듭니다.

## teams

`A`, `B` 아래에 각각 씁니다.

| 키                   | 기본값 (A / B)                                          | 설명                                  |
| -------------------- | ------------------------------------------------------- | ------------------------------------- |
| `display-name`       | `A팀` / `B팀`                                           | 메시지에 보일 팀 이름. 색상 코드 가능 |
| `initial-world-set`  | `gthcvs_a_1` / `gthcvs_b_1`                             | 처음 시작하는 월드 세트               |
| `reserve-world-sets` | `[gthcvs_a_2, gthcvs_a_3]` / `[gthcvs_b_2, gthcvs_b_3]` | 전멸 시 순서대로 옮겨 갈 세트         |

- 예비 목록을 다 쓰면 `initial-world-set` 끝의 숫자를 이어 붙여 이름을 만듭니다(`gthcvs_a_4`, `gthcvs_a_5` ...).
- 두 팀의 세트 이름이 겹치지 않게 하세요. 승리 판정이 세트 이름으로 팀을 찾습니다.
- 이름은 숫자로 끝나게 짓는 것을 권장합니다. 숫자로 끝나지 않으면 `<이름>_2`, `<이름>_3`처럼 만듭니다.

:::danger `stop`은 `initial-world-set` 이름 규칙(`gthcvs_a_` + 숫자)에 맞는 월드를 모두 지웁니다. 게임과 상관없는 월드가
이 이름 규칙에 걸리지 않게 하세요. :::

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다(`win-title`, `respawn-waiting` 제외). `%team%` 계열
치환자에는 `display-name`이 들어갑니다.

| 키                            | 치환자                                 | 사용 시점                                |
| ----------------------------- | -------------------------------------- | ---------------------------------------- |
| `prefix`                      |                                        | 메시지 앞 접두사                         |
| `no-permission`               |                                        | 권한 없음                                |
| `player-only`                 |                                        | 현재 사용하지 않음                       |
| `player-not-found`            | `%player%`                             | 플레이어를 찾을 수 없음                  |
| `team-assigned`               | `%player%`, `%team%`                   | 팀 배정                                  |
| `team-reassigned`             | `%player%`, `%old_team%`, `%new_team%` | 팀 변경                                  |
| `team-invalid`                |                                        | 팀이 A, B가 아님                         |
| `respawn-waiting`             | `%seconds%`                            | 부활 대기 남은 시간 (액션바, 타이틀)     |
| `respawn-done`                |                                        | 부활                                     |
| `spectate-other-team-blocked` |                                        | 관전 중 상대 팀에게 이동 시도            |
| `wipe-broadcast`              | `%team%`                               | 전멸 (전체)                              |
| `wipe-no-reserve`             | `%team%`                               | 다음 세트를 불러오지 못함 (관리자, 콘솔) |
| `world-set-assigned`          | `%team%`, `%world_set%`                | `setworld` 완료                          |
| `world-set-load-failed`       | `%world_set%`                          | 월드 세트를 불러오지 못함                |
| `instakill-recorded`          | `%player%`, `%stack%`                  | 즉사 처리 (실행자에게)                   |
| `instakill-wipe-broadcast`    | `%team%`, `%stack%`                    | 즉사 전멸 (전체)                         |
| `stats-reset`                 | `%player%`, `%target%`                 | 기록 초기화                              |
| `stats-target-deaths` 등      |                                        | `stats-reset`의 `%target%` 문구          |
| `win-broadcast`               | `%team%`                               | 승리 (전체)                              |
| `win-title`                   | `%team%`                               | 승리 타이틀                              |
| `event-started`               |                                        | 게임 시작 (전체)                         |
| `event-rule-notice`           |                                        | 시작 시 규칙 안내 (전체)                 |
| `event-already-started`       |                                        | 이미 시작됨                              |
| `event-stopped`               |                                        | 게임 종료 (전체)                         |
| `world-sets-deleted`          | `%count%`                              | 삭제한 월드 수                           |
| `event-not-started`           |                                        | 진행 중인 게임 없음                      |
| `reloaded`                    |                                        | 다시 불러오기 완료                       |

## sounds

메시지와 함께 재생할 소리입니다. 키는 `messages`의 키와 같습니다.

```yaml
sounds:
  enabled: true
  respawn-done:
    sound: ENTITY_PLAYER_LEVELUP
    volume: 1.0
    pitch: 1.0
```

- `enabled: false`이면 모든 소리를 끕니다.
- 항목을 지우면 그 메시지는 소리 없이 나갑니다. 다른 메시지 키를 추가하면 그 메시지에도 소리가 납니다.
- `sound`는 [Sound 이름](https://jd.papermc.io/paper/1.21.1/org/bukkit/Sound.html)입니다. 잘못된 이름이면 경고 로그만
  남깁니다.
- 전체 알림 메시지는 모든 플레이어에게, 개인 메시지는 받는 사람에게만 재생됩니다.

| 기본으로 소리가 있는 메시지   | 소리                          |
| ----------------------------- | ----------------------------- |
| `spectate-other-team-blocked` | `ENTITY_VILLAGER_NO`          |
| `respawn-done`                | `ENTITY_PLAYER_LEVELUP`       |
| `instakill-wipe-broadcast`    | `ENTITY_WITHER_DEATH`         |
| `wipe-broadcast`              | `ENTITY_WITHER_SPAWN`         |
| `wipe-no-reserve`             | `BLOCK_NOTE_BLOCK_BASS`       |
| `event-started`               | `ENTITY_ENDER_DRAGON_GROWL`   |
| `win-broadcast`               | `UI_TOAST_CHALLENGE_COMPLETE` |
