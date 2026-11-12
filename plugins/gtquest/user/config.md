---
sidebar_position: 6
title: 설정
---

# 설정

`plugins/GTQuest/config.yml`에는 GUI, 경제 연동, 메시지만 있습니다. 퀘스트는 [명령어](./creating.md)로 만듭니다.

GTQuest에는 설정을 다시 불러오는 명령어가 없습니다. 수정한 뒤에는 **서버를 재시작**해야 적용됩니다.

## settings

| 키          | 기본값          | 설명                                                                          |
| ----------- | --------------- | ----------------------------------------------------------------------------- |
| `gui-title` | `&8퀘스트 목록` | 퀘스트 GUI 제목                                                               |
| `gui-size`  | `54`            | GUI 최대 칸 수. 9~54 사이 9의 배수로 맞춰짐. 퀘스트가 적으면 그만큼 작게 열림 |

## economy

| 키              | 기본값 | 설명                                                                                                                                                                             |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | `auto` | `auto`: Vault 경제가 있으면 사용, 없으면 돈 보상만 생략<br/>`true`: 반드시 사용. 경제 서비스가 늦게 등록되면 `retry-seconds` 동안 매초 다시 연결 시도<br/>`false`: 돈 보상 안 함 |
| `retry-seconds` | `10`   | `enabled: true`일 때 재시도할 시간(초)                                                                                                                                           |

## PlaceholderAPI

| 플레이스홀더                 | 설명                |
| ---------------------------- | ------------------- |
| `%gtquest_inprogress_count%` | 진행 중인 퀘스트 수 |

접속 중인 플레이어만 정확한 값이 나옵니다. 오프라인 플레이어는 `0`으로 나옵니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다.

**플레이어**

| 키                          | 치환자    | 사용 시점                           |
| --------------------------- | --------- | ----------------------------------- |
| `prefix`                    |           | 메시지 앞 접두사                    |
| `player-only`               |           | 콘솔에서 플레이어 전용 명령어 실행  |
| `quest-accepted`            | `%quest%` | 수락                                |
| `quest-abandoned`           | `%quest%` | 포기                                |
| `quest-already-completed`   |           | 이미 완료한 퀘스트                  |
| `quest-already-in-progress` |           | 이미 진행 중인 퀘스트               |
| `quest-not-in-progress`     |           | 진행 중이 아닌 퀘스트를 납품하려 함 |
| `prerequisite-not-met`      |           | 선행 퀘스트 미완료                  |
| `not-enough-items`          |           | 납품 아이템 부족                    |
| `delivery-success`          | `%quest%` | 납품 완료                           |

**관리자**

| 키                       | 치환자                | 사용 시점                                                        |
| ------------------------ | --------------------- | ---------------------------------------------------------------- |
| `admin-no-permission`    |                       | 관리 권한 없음                                                   |
| `admin-usage-header`     |                       | 명령어 도움말 제목                                               |
| `admin-quest-not-found`  | `%id%`                | 없는 퀘스트 ID                                                   |
| `admin-invalid-number`   | `%value%`             | 숫자가 아님                                                      |
| `admin-quest-created`    | `%id%`, `%name%`      | 생성 완료                                                        |
| `admin-quest-deleted`    | `%id%`                | 삭제 완료                                                        |
| `admin-quest-updated`    | `%field%`             | 속성 변경 완료. `%field%`는 "이름", "보상 경험치" 같은 한글 이름 |
| `admin-invalid-material` | `%value%`             | 없는 아이템 종류                                                 |
| `admin-npc-not-found`    | `%id%`                | 없는 NPC ID                                                      |
| `admin-npc-cleared`      |                       | NPC 연결 해제                                                    |
| `admin-prereq-cleared`   |                       | 선행 퀘스트 해제                                                 |
| `admin-player-not-found` | `%player%`            | 플레이어를 찾을 수 없음                                          |
| `admin-force-completed`  | `%player%`, `%quest%` | 강제 완료                                                        |
| `admin-reset-done`       | `%player%`            | 기록 초기화 완료                                                 |
| `admin-editor-save-hint` |                       | 편집 GUI 열림                                                    |
| `admin-objectives-saved` | `%count%`             | 납품 목표 저장. `%count%`는 아이템 종류 수                       |
| `admin-rewards-saved`    | `%count%`             | 보상 아이템 저장                                                 |

GUI 로어 문구(상태, 조작 안내 등), `list`, `info`, 사용법 안내는 플러그인에 고정되어 있어 바꿀 수 없습니다.

## 기본 설정 파일

```yaml
settings:
  gui-title: '&8퀘스트 목록'
  gui-size: 54

economy:
  enabled: auto
  retry-seconds: 10

messages:
  prefix: '&6[GTQuest] &r'
  player-only: '&c플레이어만 사용할 수 있는 명령어입니다.'

  quest-accepted: "&a퀘스트 '%quest%'을(를) 수락했습니다."
  quest-abandoned: "&e퀘스트 '%quest%'을(를) 포기했습니다."
  quest-already-completed: '&c이미 완료한 퀘스트입니다.'
  quest-already-in-progress: '&c이미 진행 중인 퀘스트입니다.'
  quest-not-in-progress: '&c진행 중인 퀘스트가 아닙니다.'
  prerequisite-not-met: '&c선행 퀘스트를 먼저 완료해야 합니다.'
  not-enough-items: '&c납품에 필요한 아이템이 부족합니다.'
  delivery-success: "&a'%quest%' 납품 완료!"

  admin-no-permission: '&c이 명령어를 사용할 권한이 없습니다.'
  admin-usage-header: '&6===== /gtquest 관리 명령어 ====='
  admin-quest-not-found: '&c해당 ID의 퀘스트를 찾을 수 없습니다: %id%'
  admin-invalid-number: '&c숫자를 입력해야 합니다: %value%'
  admin-quest-created: '&a퀘스트를 생성했습니다. (ID: %id%, 이름: %name%)'
  admin-quest-deleted: '&a퀘스트를 삭제했습니다. (ID: %id%)'
  admin-quest-updated: "&a퀘스트 '%field%'을(를) 수정했습니다."
  admin-invalid-material: '&c존재하지 않는 아이템 종류입니다: %value%'
  admin-npc-not-found: '&c존재하지 않는 NPC ID입니다: %id%'
  admin-npc-cleared: '&aNPC 연결을 해제했습니다.'
  admin-prereq-cleared: '&a선행 퀘스트를 해제했습니다.'
  admin-player-not-found: '&c해당 플레이어를 찾을 수 없거나 오프라인입니다: %player%'
  admin-force-completed: "&a%player%의 '%quest%'을(를) 강제 완료 처리했습니다."
  admin-reset-done: '&a%player%의 퀘스트를 초기화했습니다.'
  admin-editor-save-hint: '&e아이템을 넣고 인벤토리를 닫으면 저장됩니다.'
  admin-objectives-saved: '&a납품 목표를 저장했습니다. (%count%종)'
  admin-rewards-saved: '&a보상 아이템을 저장했습니다. (%count%종)'
```
