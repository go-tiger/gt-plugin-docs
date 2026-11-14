---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

GTHardcoreVersus는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다.

| 조건                                    | 저장소                                                            | 테이블 이름                                               |
| --------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)                         | `gt_hardcoreversus_` 접두사 (`gt_hardcoreversus_players`) |
| 그 밖의 경우                            | `plugins/GTHardcoreVersus/gthardcoreversus.db` (SQLite, WAL 모드) | `gthcvs_` 접두사 (아래 이름 그대로)                       |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTHardcoreVersus] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTHardcoreVersus] 데이터베이스: 자체 SQLite(gthardcoreversus.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `문자열(36)`은 MySQL에서 `VARCHAR(36)`, `큰 정수`는 `BIGINT`이고,
SQLite에서는 `TEXT`, `INTEGER`로 취급합니다.

모든 데이터는 활성화 시 메모리에 올라가고, 메모리를 기준으로 동작합니다. 서버가 켜져 있을 때 DB를 직접 고치면 반영되지
않고 덮어써집니다.

## gthcvs_players

팀 배정.

| 컬럼          | 타입          | 설명          |
| ------------- | ------------- | ------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID |
| `team`        | 문자열(32)    | `A`, `B`      |
| `assigned_at` | 큰 정수       | 배정 시각     |

배정을 해제하는 명령어가 없으므로, 해제하려면 서버를 끈 상태에서 행을 지우세요.

## gthcvs_teams

팀 상태.

| 컬럼           | 타입          | 설명                                           |
| -------------- | ------------- | ---------------------------------------------- |
| `team`         | 문자열(32) PK | `A`, `B`                                       |
| `world_set_id` | 텍스트        | 현재 월드 세트. 게임 전이나 `stop` 후에는 NULL |
| `wipe_count`   | 정수          | 전멸 횟수                                      |
| `updated_at`   | 큰 정수       | 마지막 변경 시각                               |

## gthcvs_respawn_timers

관전 대기 중인 플레이어. 행이 있으면 대기 중입니다.

| 컬럼          | 타입          | 설명           |
| ------------- | ------------- | -------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID  |
| `respawn_at`  | 큰 정수       | 부활 예정 시각 |

## gthcvs_instakill_stacks

전멸 판정용 즉사 횟수. 팀이 새 세트로 옮기면 그 팀원의 행을 지웁니다.

| 컬럼          | 타입          | 설명          |
| ------------- | ------------- | ------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID |
| `stack`       | 정수          | 즉사 횟수     |

## gthcvs_player_stats

누적 기록. 자동으로 초기화되지 않습니다.

| 컬럼          | 타입          | 설명                  |
| ------------- | ------------- | --------------------- |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID         |
| `deaths`      | 정수          | 사망 횟수 (즉사 포함) |
| `instakills`  | 정수          | 즉사 받은 총 횟수     |

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행하고 서버를
재시작합니다. 기존 테이블의 `gthcvs_` 접두사를 떼고 옮겨야 하므로 `--strip-prefix`를 꼭 붙이세요.

```
/gtdatabase migrate hardcoreversus plugins/GTHardcoreVersus/gthardcoreversus.db --strip-prefix=gthcvs_
```

옮기면 `gthcvs_players`가 `gt_hardcoreversus_players`가 되는 식으로 이름이 바뀝니다.

## 다음 게임을 위한 완전 초기화

`stop`은 월드와 세트 기록만 지웁니다. 팀 배정과 기록까지 모두 처음부터 시작하려면 서버를 끈 상태에서 실행합니다. 공용
DB에서는 `gthcvs_` 대신 `gt_hardcoreversus_`를 붙이세요.

```sql
DELETE FROM gthcvs_players;
DELETE FROM gthcvs_teams;
DELETE FROM gthcvs_respawn_timers;
DELETE FROM gthcvs_instakill_stacks;
DELETE FROM gthcvs_player_stats;
```
