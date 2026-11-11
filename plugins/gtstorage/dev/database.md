---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

`plugins/GTStorage/gtstorage.db` (SQLite, WAL 모드). 테이블은 플러그인 활성화 시 없으면 생성됩니다.

## storage_items

창고 아이템. 빈 칸은 저장하지 않습니다.

| 컬럼          | 타입    | 설명                                 |
| ------------- | ------- | ------------------------------------ |
| `player_uuid` | TEXT    | 창고 주인 UUID                       |
| `page`        | INTEGER | 페이지. 지금은 항상 `0`              |
| `slot`        | INTEGER | 칸 번호 (0부터)                      |
| `item_data`   | TEXT    | Base64로 인코딩한 직렬화 `ItemStack` |

기본 키는 `(player_uuid, page, slot)`이고, `(player_uuid, page)`에 인덱스가 있습니다.

불러올 때 현재 줄 수를 넘는 `slot`의 행은 무시합니다. 그 상태로 창고를 닫으면 저장할 때 행 전체를 다시 쓰므로 그
아이템은 삭제됩니다.

## storage_settings

플레이어별 줄 수. 행이 없으면 `config.yml`의 `default-rows`를 씁니다.

| 컬럼          | 타입    | 설명                     |
| ------------- | ------- | ------------------------ |
| `player_uuid` | TEXT PK | 플레이어 UUID            |
| `rows`        | INTEGER | 줄 수 (1~6)              |
| `updated_at`  | INTEGER | 변경 시각 (epoch 밀리초) |

`/gtstorageadmin setrows`를 실행하면 행이 생깁니다.
