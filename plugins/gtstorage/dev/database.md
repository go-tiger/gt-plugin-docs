---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

GTStorage는 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성됩니다.

| 조건                                    | 저장소                                              | 테이블 이름                                       |
| --------------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)           | `gt_storage_` 접두사 (`gt_storage_storage_items`) |
| 그 밖의 경우                            | `plugins/GTStorage/gtstorage.db` (SQLite, WAL 모드) | 아래 이름 그대로                                  |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTStorage] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTStorage] 데이터베이스: 자체 SQLite(gtstorage.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `긴 텍스트`는 MySQL에서 `LONGTEXT`, `문자열(36)`은 `VARCHAR(36)`이고,
SQLite에서는 각각 `TEXT`입니다.

## storage_items

창고 아이템. 빈 칸은 저장하지 않습니다.

| 컬럼          | 타입       | 설명                                 |
| ------------- | ---------- | ------------------------------------ |
| `player_uuid` | 문자열(36) | 창고 주인 UUID                       |
| `page`        | 정수       | 페이지. 지금은 항상 `0`              |
| `slot`        | 정수       | 칸 번호 (0부터)                      |
| `item_data`   | 긴 텍스트  | Base64로 인코딩한 직렬화 `ItemStack` |

기본 키는 `(player_uuid, page, slot)`이고, `(player_uuid, page)`에 인덱스 `idx_storage_player`가 있습니다. 저장할 때는
한 트랜잭션 안에서 그 페이지의 행을 지우고 다시 넣으므로, 중간에 실패하면 이전 내용이 그대로 남습니다.

불러올 때 현재 줄 수를 넘는 `slot`의 행은 무시합니다. 그 상태로 창고를 닫으면 저장할 때 행 전체를 다시 쓰므로 그
아이템은 삭제됩니다.

## storage_settings

플레이어별 줄 수. 행이 없으면 `config.yml`의 `default-rows`를 씁니다.

| 컬럼          | 타입          | 설명                     |
| ------------- | ------------- | ------------------------ |
| `player_uuid` | 문자열(36) PK | 플레이어 UUID            |
| `rows`        | 정수          | 줄 수 (1~6)              |
| `updated_at`  | 큰 정수       | 변경 시각 (epoch 밀리초) |

`/gtstorageadmin setrows`를 실행하면 행이 생깁니다.

`rows`는 MySQL 8의 예약어라 직접 SQL을 쓸 때는 따옴표로 감싸야 합니다. MySQL에서는 `` `rows` ``, PostgreSQL과
SQLite에서는 `"rows"`입니다.

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate storage plugins/GTStorage/gtstorage.db
```

## 여러 서버에서 같은 DB 쓰기

:::danger 같은 플레이어의 창고를 **두 서버에서 동시에 열면 아이템이 복사될 수 있습니다.** 창고는 열 때 DB에서 읽고, 닫을
때 그 페이지 전체를 다시 씁니다. 두 서버가 같은 창고를 열어 각자 꺼낸 뒤 닫으면, 나중에 닫은 쪽의 내용이 남아 먼저 꺼낸
아이템이 창고에도 그대로 남습니다. 여러 서버가 공용 DB를 함께 쓴다면 관리자가 다른 플레이어 창고를 여는 기능
(`/gtstorageadmin open`)을 쓸 때 특히 주의하세요. :::
