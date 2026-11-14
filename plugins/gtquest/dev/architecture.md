---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 패키지                | 역할                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `dev.gotiger.gTQuest` | 메인 클래스. 구성 요소 조립과 getter 제공                                                                          |
| `command`             | `/gtquest` (인자 없으면 GUI, 있으면 관리 기능)                                                                     |
| `database`            | DB 백엔드(GTDatabase 공용 또는 자체 SQLite) 선택, 스키마, 마이그레이션, 단일 DB 스레드                             |
| `quest`               | 퀘스트 캐시와 CRUD(`QuestManager`), 플레이어 기록(`PlayerDataManager`), 인벤토리 기준 진행도 계산(`QuestProgress`) |
| `quest.model`         | `Quest`, `QuestObjective`, `QuestReward`, `PlayerQuest`, `QuestStatus`                                             |
| `delivery`            | 납품 검사와 아이템 차감(`DeliveryService`)                                                                         |
| `reward`              | 보상 지급(`RewardService`)                                                                                         |
| `gui`                 | 퀘스트 목록 GUI와 클릭 처리. `QuestGuiOpener` 인터페이스로 호출부와 분리                                           |
| `gui.admin`           | 납품 목표, 보상 아이템 편집 GUI                                                                                    |
| `npc`                 | Citizens 연동. Citizens가 있을 때만 리스너 등록                                                                    |
| `economy`             | Vault 연동                                                                                                         |
| `placeholder`         | PlaceholderAPI 확장                                                                                                |
| `util`                | 아이템 직렬화, 메시지                                                                                              |

## 캐시

| 데이터                        | 로드 시점                                  | 비고                             |
| ----------------------------- | ------------------------------------------ | -------------------------------- |
| 퀘스트 정의 (목표, 보상 포함) | 플러그인 활성화 시 전부 (메인 스레드 동기) | 변경 시 DB에 저장한 뒤 캐시 갱신 |
| 플레이어 기록                 | 접속 시 (비동기), 퇴장 시 제거             | 접속 중인 플레이어만 캐시에 있음 |

`PlayerDataManager`의 조회 메서드는 캐시만 봅니다. 오프라인 플레이어는 기록이 없는 것처럼 보입니다.

## 상태

`QuestStatus` 중 `IN_PROGRESS`, `COMPLETED`, `ABANDONED`만 DB에 저장합니다. 기록이 없으면 선행 퀘스트 완료 여부에 따라
`AVAILABLE` 또는 `LOCKED`로 계산합니다.

```
(기록 없음) ──수락──▶ IN_PROGRESS ──납품──▶ COMPLETED
   ▲                     │
   │                   포기
   │                     ▼
 reset              ABANDONED ──수락──▶ IN_PROGRESS
```

## 진행도

진행도는 저장하지 않습니다. GUI를 그릴 때와 납품할 때마다 `QuestProgress.calculate()`가 인벤토리를 훑어 목표별 보유
수량을 셉니다. 아이템 비교는 `ItemStack.isSimilar()`라서 메타(이름, 인챈트, 커스텀 모델 데이터 등)까지 같아야 합니다.

## 납품 흐름

```
쉬프트+좌클릭
  │  완료 여부, 진행 중 여부 확인 (캐시)
  │  QuestProgress로 전부 보유했는지 확인
  │  목표 수량만큼 인벤토리에서 차감
  │  캐시를 바로 COMPLETED로 변경 (저장 전 두 번째 납품을 막음)
  ▼  DB 스레드: status <> 'COMPLETED' 조건부 UPDATE (기록이 없으면 키 충돌 무시 INSERT)
  ▼  메인 스레드: 실제로 바뀐 행이 있을 때만 보상 지급, delivery-success, GUI 다시 그림
```

목표를 모두 가졌는지 먼저 확인한 뒤에 차감하므로, 일부만 빠져나가는 일은 없습니다. 저장에 실패하면 캐시를 이전 상태로
되돌리고 보상은 지급하지 않습니다. 관리자 강제 완료(`/gtquest complete`)는 기존처럼 이미 완료한 퀘스트에도 보상을
줍니다.

## DB 백엔드

| 구현                | 선택 조건                                   | 커넥션                                                                 |
| ------------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `GTDatabaseBackend` | GTDatabase가 켜져 있고 서비스가 등록돼 있음 | 작업마다 공용 풀에서 빌리고 반납. 종료 시 풀은 닫지 않음               |
| `SqliteBackend`     | 그 밖의 경우                                | `gtquest.db` 커넥션 하나를 공유. `close()`해도 실제로 닫히지 않는 래퍼 |

- SQL 방언 차이는 `SqlDialect`가 처리합니다. 저장소 코드는 DB 종류로 분기하지 않습니다.
- GTDatabase API를 import하는 클래스는 `GTDatabaseBackend` 하나뿐입니다.
- 새 퀘스트, 목표, 보상의 ID는 `prepareStatement(sql, new String[]{"id"})`로 받습니다. PostgreSQL에서도 생성된 키를
  돌려받기 위해서입니다.
- `hide_objective_names` 컬럼 마이그레이션은 `addColumnIfNotExists`로 처리해 공용 DB에도 적용됩니다.

## Citizens 연동

`CitizensNpcListener`는 Citizens 클래스를 직접 참조합니다. 그래서 `CitizensHook.setup()`에서 Citizens가 설치된 경우에만
등록합니다. Citizens가 없으면 이 클래스가 로드되지 않아 `NoClassDefFoundError`가 나지 않습니다.
