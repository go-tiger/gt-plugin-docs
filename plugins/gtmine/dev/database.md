---
sidebar_position: 2
title: 데이터베이스
---

# 데이터베이스

GTMine은 활성화할 때 저장소를 하나 고릅니다. 테이블은 없으면 생성되고, 시간은 모두 epoch 밀리초입니다.

| 조건                                    | 저장소                                        | 테이블 이름                              |
| --------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| GTDatabase가 켜져 있고 공용 연결에 성공 | GTDatabase 공용 DB (SQLite, H2, MySQL 등)     | `gt_mine_` 접두사 (`gt_mine_mine_areas`) |
| 그 밖의 경우                            | `plugins/GTMine/gtmine.db` (SQLite, WAL 모드) | 아래 이름 그대로                         |

어느 쪽을 쓰는지는 시작 로그로 확인합니다.

```
[GTMine] 데이터베이스: GTDatabase(mysql) 공용 연결을 사용합니다.
[GTMine] 데이터베이스: 자체 SQLite(gtmine.db)를 사용합니다.
```

아래 타입은 DB마다 실제 이름이 다릅니다. 예를 들어 `문자열(64)`는 MySQL에서 `VARCHAR(64)`, `큰 정수`는 `BIGINT`이고,
SQLite에서는 `TEXT`, `INTEGER`로 취급합니다.

모든 데이터는 활성화 시 메모리에 올라갑니다. 서버가 켜져 있을 때 DB를 직접 고치면 반영되지 않고 덮어써집니다.

## mine_areas

| 컬럼         | 타입          | 설명                                   |
| ------------ | ------------- | -------------------------------------- |
| `name`       | 문자열(64) PK | 광산 이름 (최대 64자)                  |
| `active`     | 정수          | 채굴 모드면 1, 배치 모드면 0           |
| `created_at` | 큰 정수       | 처음 생성한 시각. 모드를 바꿔도 그대로 |

마커를 설치하거나 `give`, `setarea`로 광산 이름을 쓰면 행이 생깁니다. 광산을 지우는 명령어는 없습니다.

## mine_points

리젠 포인트. 기본 키는 `(world, x, y, z)`이고 `area`에 인덱스 `idx_mine_points_area`가 있습니다.

| 컬럼               | 타입       | 설명                                                      |
| ------------------ | ---------- | --------------------------------------------------------- |
| `world`            | 문자열(64) | 월드 이름                                                 |
| `x`, `y`, `z`      | 정수       | 블록 좌표                                                 |
| `area`             | 문자열(64) | 소속 광산                                                 |
| `state`            | 문자열(16) | `MARKER`, `ORE`, `MINED`. 알 수 없는 값은 `MARKER`로 읽음 |
| `current_material` | 문자열(64) | 지금 놓인 블록 (`MARKER`이면 NULL)                        |
| `mined_at`         | 큰 정수    | 캔 시각. 리젠 대기가 아니면 NULL                          |

## 기존 데이터 옮기기

자체 SQLite로 쓰던 데이터를 GTDatabase 공용 DB로 옮기려면, GTDatabase를 설치한 뒤 서버 콘솔에서 실행합니다.

```
/gtdatabase migrate mine plugins/GTMine/gtmine.db
```

옮긴 뒤에는 서버를 재시작해 GTMine이 공용 DB의 광산과 포인트를 다시 불러오게 하세요.

:::warning MySQL, MariaDB의 기본 설정은 문자열 비교에서 대소문자를 구분하지 않습니다. 공용 DB가 MySQL이면 `Deep`과
`deep`이 같은 광산으로 저장되니, 대소문자만 다른 광산 이름은 쓰지 마세요. :::

## 광산 통째로 지우기

명령어로는 광산을 지울 수 없습니다. 먼저 `/gtmine stop <광산>`으로 배치 모드로 돌리고 마커를 모두 부수는 것이 정상적인
방법입니다. 마커를 하나하나 부술 수 없는 경우에는 서버를 끈 상태에서 지웁니다. 월드에 남은 블록은 직접 정리해야 합니다.
공용 DB에서는 테이블 이름에 `gt_mine_`를 붙이세요.

```sql
DELETE FROM mine_points WHERE area = 'deep';
DELETE FROM mine_areas  WHERE name = 'deep';
```
