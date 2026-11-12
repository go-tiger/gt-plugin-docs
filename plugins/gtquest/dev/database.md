---
sidebar_position: 3
title: 데이터베이스
---

# 데이터베이스

`plugins/GTQuest/gtquest.db` (SQLite, WAL 모드, 외래키 활성화). 테이블은 플러그인 활성화 시 없으면 생성됩니다. 시간은
모두 epoch 밀리초입니다. `item_data`는 Base64로 인코딩한 직렬화 `ItemStack`(수량 1)입니다.

## quests

| 컬럼                   | 타입       | 설명                                                               |
| ---------------------- | ---------- | ------------------------------------------------------------------ |
| `id`                   | INTEGER PK | 자동 증가. 명령어에서 쓰는 퀘스트 ID                               |
| `name`                 | TEXT       | 이름                                                               |
| `description`          | TEXT       | 설명. 줄바꿈은 `\n` 문자                                           |
| `prerequisite_id`      | INTEGER    | 선행 퀘스트 ID. 선행 퀘스트를 삭제하면 NULL (`ON DELETE SET NULL`) |
| `reward_exp`           | INTEGER    | 보상 경험치 포인트                                                 |
| `reward_money`         | REAL       | 보상 돈                                                            |
| `npc_id`               | INTEGER    | Citizens NPC ID                                                    |
| `display_material`     | TEXT       | GUI 아이콘 Material. 기본 `BOOK`                                   |
| `hide_objective_names` | INTEGER    | 납품 목표 이름 숨김 (0, 1). 예전 DB에는 활성화 시 자동으로 추가    |

## quest_objectives

납품 목표. 퀘스트를 삭제하면 함께 삭제됩니다(`ON DELETE CASCADE`).

| 컬럼        | 타입       | 설명                   |
| ----------- | ---------- | ---------------------- |
| `id`        | INTEGER PK | 자동 증가              |
| `quest_id`  | INTEGER    | 퀘스트 ID. 인덱스 있음 |
| `item_data` | TEXT       | 목표 아이템            |
| `amount`    | INTEGER    | 필요 수량              |

## quest_rewards

보상 아이템. 구조는 `quest_objectives`와 같습니다.

## player_quests

플레이어별 진행 기록. 기본 키는 `(player_uuid, quest_id)`이고 `player_uuid`에 인덱스가 있습니다. 퀘스트를 삭제하면 함께
삭제됩니다.

| 컬럼           | 타입    | 설명                                    |
| -------------- | ------- | --------------------------------------- |
| `player_uuid`  | TEXT    | 플레이어 UUID                           |
| `quest_id`     | INTEGER | 퀘스트 ID                               |
| `status`       | TEXT    | `IN_PROGRESS`, `COMPLETED`, `ABANDONED` |
| `accepted_at`  | INTEGER | 마지막 수락 시각                        |
| `completed_at` | INTEGER | 완료 시각                               |

`/gtquest reset`은 이 테이블의 행을 지웁니다.

## 조회 예시

```sql
-- 퀘스트별 완료 인원
SELECT q.id, q.name, COUNT(p.player_uuid) AS completed
FROM quests q
LEFT JOIN player_quests p ON p.quest_id = q.id AND p.status = 'COMPLETED'
GROUP BY q.id
ORDER BY q.id;
```
