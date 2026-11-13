---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

`plugins/GTHardcoreVersus/gthardcoreversus.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은
모두 epoch 밀리초입니다.

모든 데이터는 활성화 시 메모리에 올라가고, 메모리를 기준으로 동작합니다. 서버가 켜져 있을 때 DB를 직접 고치면 반영되지
않고 덮어써집니다.

## gthcvs_players

팀 배정.

| 컬럼          | 타입    | 설명          |
| ------------- | ------- | ------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID |
| `team`        | TEXT    | `A`, `B`      |
| `assigned_at` | INTEGER | 배정 시각     |

배정을 해제하는 명령어가 없으므로, 해제하려면 서버를 끈 상태에서 행을 지우세요.

## gthcvs_teams

팀 상태.

| 컬럼           | 타입    | 설명                                           |
| -------------- | ------- | ---------------------------------------------- |
| `team`         | TEXT PK | `A`, `B`                                       |
| `world_set_id` | TEXT    | 현재 월드 세트. 게임 전이나 `stop` 후에는 NULL |
| `wipe_count`   | INTEGER | 전멸 횟수                                      |
| `updated_at`   | INTEGER | 마지막 변경 시각                               |

## gthcvs_respawn_timers

관전 대기 중인 플레이어. 행이 있으면 대기 중입니다.

| 컬럼          | 타입    | 설명           |
| ------------- | ------- | -------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID  |
| `respawn_at`  | INTEGER | 부활 예정 시각 |

## gthcvs_instakill_stacks

전멸 판정용 즉사 횟수. 팀이 새 세트로 옮기면 그 팀원의 행을 지웁니다.

| 컬럼          | 타입    | 설명          |
| ------------- | ------- | ------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID |
| `stack`       | INTEGER | 즉사 횟수     |

## gthcvs_player_stats

누적 기록. 자동으로 초기화되지 않습니다.

| 컬럼          | 타입    | 설명                  |
| ------------- | ------- | --------------------- |
| `player_uuid` | TEXT PK | 플레이어 UUID         |
| `deaths`      | INTEGER | 사망 횟수 (즉사 포함) |
| `instakills`  | INTEGER | 즉사 받은 총 횟수     |

## 다음 게임을 위한 완전 초기화

`stop`은 월드와 세트 기록만 지웁니다. 팀 배정과 기록까지 모두 처음부터 시작하려면 서버를 끈 상태에서 실행합니다.

```sql
DELETE FROM gthcvs_players;
DELETE FROM gthcvs_teams;
DELETE FROM gthcvs_respawn_timers;
DELETE FROM gthcvs_instakill_stacks;
DELETE FROM gthcvs_player_stats;
```
