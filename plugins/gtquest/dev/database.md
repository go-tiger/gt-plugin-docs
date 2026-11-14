---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

GTQuest는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다. `item_data`는
Base64로 인코딩한 직렬화 `ItemStack`(수량 1)입니다. 외래키를 쓰므로 어느 저장소든 외래키가 켜진 상태로 동작합니다.

| 조건                                    | 저장소                                                         | 테이블 이름                            |
| --------------------------------------- | -------------------------------------------------------------- | -------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)                      | `gt_quest_` 접두사 (`gt_quest_quests`) |
| 그 밖의 경우                            | `plugins/GTQuest/gtquest.db` (SQLite, WAL 모드, 외래키 활성화) | 아래 이름 그대로                       |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTQuest] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTQuest] 데이터베이스: 자체 SQLite(gtquest.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `큰 정수`는 MySQL에서 `BIGINT`, `긴 텍스트`는 `LONGTEXT`이고,
SQLite에서는 각각 `INTEGER`, `TEXT`입니다. 외래키 컬럼(`quest_id`, `prerequisite_id`)은 참조하는 `id`와 같은
`큰 정수`입니다.

## quests

| 컬럼                   | 타입             | 설명                                                               |
| ---------------------- | ---------------- | ------------------------------------------------------------------ |
| `id`                   | 큰 정수 PK       | 자동 증가. 명령어에서 쓰는 퀘스트 ID                               |
| `name`                 | 텍스트           | 이름                                                               |
| `description`          | 텍스트           | 설명. 줄바꿈은 `\n` 문자                                           |
| `prerequisite_id`      | 큰 정수          | 선행 퀘스트 ID. 선행 퀘스트를 삭제하면 NULL (`ON DELETE SET NULL`) |
| `reward_exp`           | 정수             | 보상 경험치 포인트                                                 |
| `reward_money`         | DOUBLE PRECISION | 보상 돈 (8바이트 실수)                                             |
| `npc_id`               | 정수             | Citizens NPC ID                                                    |
| `display_material`     | 문자열(64)       | GUI 아이콘 Material. 기본 `BOOK`                                   |
| `hide_objective_names` | 정수             | 납품 목표 이름 숨김 (0, 1). 예전 DB에는 활성화 시 자동으로 추가    |

## quest_objectives

납품 목표. 퀘스트를 삭제하면 함께 삭제됩니다(`ON DELETE CASCADE`).

| 컬럼        | 타입       | 설명                                           |
| ----------- | ---------- | ---------------------------------------------- |
| `id`        | 큰 정수 PK | 자동 증가                                      |
| `quest_id`  | 큰 정수    | 퀘스트 ID. 인덱스 `idx_quest_objectives_quest` |
| `item_data` | 긴 텍스트  | 목표 아이템                                    |
| `amount`    | 정수       | 필요 수량                                      |

목표를 바꿀 때는 한 트랜잭션 안에서 기존 목표를 지우고 다시 넣으므로, 중간에 실패해도 이전 목표가 그대로 남습니다.

## quest_rewards

보상 아이템. 구조와 저장 방식은 `quest_objectives`와 같고, 인덱스 이름은 `idx_quest_rewards_quest`입니다.

## player_quests

플레이어별 진행 기록. 기본 키는 `(player_uuid, quest_id)`이고 `player_uuid`에 인덱스 `idx_quest_player_quests_player`가
있습니다. 퀘스트를 삭제하면 함께 삭제됩니다.

| 컬럼           | 타입       | 설명                                    |
| -------------- | ---------- | --------------------------------------- |
| `player_uuid`  | 문자열(36) | 플레이어 UUID                           |
| `quest_id`     | 큰 정수    | 퀘스트 ID                               |
| `status`       | 문자열(16) | `IN_PROGRESS`, `COMPLETED`, `ABANDONED` |
| `accepted_at`  | 큰 정수    | 마지막 수락 시각                        |
| `completed_at` | 큰 정수    | 완료 시각                               |

완료는 `status`가 아직 `COMPLETED`가 아닐 때만 바꾸는 조건부 UPDATE로 기록합니다. 실제로 바뀐 행이 있을 때만 보상을
지급하므로, 같은 퀘스트를 두 번 납품하거나 다른 서버에서 먼저 완료한 경우에는 보상이 다시 나가지 않습니다.

`/gtquest reset`은 이 테이블의 행을 지웁니다.

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate quest plugins/GTQuest/gtquest.db
```

옮긴 뒤에는 서버를 재시작해 GTQuest가 공용 DB의 퀘스트를 캐시에 다시 올리게 하세요.

## 여러 서버에서 같은 DB 쓰기

:::warning 퀘스트 정의는 서버 시작 시 캐시에 올립니다. 한 서버에서 만들거나 고친 퀘스트는 다른 서버를 재시작할 때까지
보이지 않거나 예전 내용으로 보입니다. 퀘스트 편집은 한 서버에서 하고, 다른 서버는 재시작하세요. :::

## 조회 예시

자체 SQLite 기준입니다. 공용 DB에서는 테이블 이름에 `gt_quest_`를 붙이세요. PostgreSQL은 `GROUP BY`가 엄격하므로 아래
예시처럼 SELECT에 쓴 컬럼을 모두 `GROUP BY`에 넣으세요.

```sql
-- 퀘스트별 완료 인원
SELECT q.id, q.name, COUNT(p.player_uuid) AS completed
FROM quests q
LEFT JOIN player_quests p ON p.quest_id = q.id AND p.status = 'COMPLETED'
GROUP BY q.id, q.name
ORDER BY q.id;
```
