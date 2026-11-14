---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

GTJumpPad는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성됩니다.

| 조건                                    | 저장소                                                                      | 테이블 이름                                        |
| --------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)                                   | `gt_jumppad_` 접두사 (`gt_jumppad_jumppad_blocks`) |
| 그 밖의 경우                            | `plugins/GTJumpPad/gtjumppad.db` (SQLite, WAL 모드, `synchronous = NORMAL`) | 아래 이름 그대로                                   |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTJumpPad] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTJumpPad] 데이터베이스: 자체 SQLite(gtjumppad.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `긴 텍스트`는 MySQL에서 `LONGTEXT`, `문자열(64)`는 `VARCHAR(64)`이고,
SQLite에서는 각각 `TEXT`입니다.

## jumppad_blocks

설치된 점프패드 좌표입니다.

| 컬럼          | 타입       | 설명                     |
| ------------- | ---------- | ------------------------ |
| `world`       | 문자열(64) | 월드 이름                |
| `x`, `y`, `z` | 정수       | 블록 좌표                |
| `placed_by`   | 텍스트     | 설치한 플레이어 UUID     |
| `placed_at`   | 큰 정수    | 설치 시각 (epoch 밀리초) |

기본 키는 `(world, x, y, z)`입니다. 같은 자리에 다시 설치하면 `placed_by`, `placed_at`만 갱신합니다.

## jumppad_template

등록된 점프패드 블록입니다. 행은 `id = 1` 하나만 있습니다.

| 컬럼         | 타입      | 설명                                                       |
| ------------ | --------- | ---------------------------------------------------------- |
| `id`         | 정수      | 항상 1 (`CHECK (id = 1)`)                                  |
| `item_data`  | 긴 텍스트 | `BukkitObjectOutputStream`으로 직렬화한 ItemStack의 Base64 |
| `updated_at` | 큰 정수   | 등록 시각 (epoch 밀리초)                                   |

`CHECK` 제약은 MySQL 8.0.16 미만에서는 무시되지만, 플러그인은 항상 `id = 1`로만 쓰므로 동작에는 차이가 없습니다.

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행하고 서버를
재시작합니다.

```
/gtdatabase migrate jumppad plugins/GTJumpPad/gtjumppad.db
```

## 직접 고칠 때

좌표는 시작할 때만 메모리에 올라갑니다. DB를 직접 고쳤다면 서버를 재시작하세요. `reload`는 DB를 다시 읽지 않습니다.

:::warning

`item_data`를 읽지 못하면 플러그인 활성화 중에 오류가 납니다.

:::
