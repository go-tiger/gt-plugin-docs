---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

`plugins/GTJumpPad/gtjumppad.db` (SQLite, WAL 모드, `synchronous = NORMAL`)

## jumppad_blocks

설치된 점프패드 좌표입니다.

| 컬럼          | 타입    | 설명                     |
| ------------- | ------- | ------------------------ |
| `world`       | TEXT    | 월드 이름                |
| `x`, `y`, `z` | INTEGER | 블록 좌표                |
| `placed_by`   | TEXT    | 설치한 플레이어 UUID     |
| `placed_at`   | INTEGER | 설치 시각 (epoch 밀리초) |

기본 키는 `(world, x, y, z)`입니다. 같은 자리에 다시 설치하면 `placed_by`, `placed_at`만 갱신합니다.

## jumppad_template

등록된 점프패드 블록입니다. 행은 `id = 1` 하나만 있습니다.

| 컬럼         | 타입    | 설명                                                       |
| ------------ | ------- | ---------------------------------------------------------- |
| `id`         | INTEGER | 항상 1 (`CHECK (id = 1)`)                                  |
| `item_data`  | TEXT    | `BukkitObjectOutputStream`으로 직렬화한 ItemStack의 Base64 |
| `updated_at` | INTEGER | 등록 시각 (epoch 밀리초)                                   |

## 직접 고칠 때

좌표는 시작할 때만 메모리에 올라갑니다. DB를 직접 고쳤다면 서버를 재시작하세요. `reload`는 DB를 다시 읽지 않습니다.

:::warning

`item_data`를 읽지 못하면 플러그인 활성화 중에 오류가 납니다.

:::
