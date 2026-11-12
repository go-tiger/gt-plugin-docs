---
sidebar_position: 2
title: API
---

# API

GTQuest는 외부용으로 따로 설계한 API나 이벤트가 없습니다. 다만 메인 클래스가 주요 구성 요소를 public getter로 열어 두고
있어서, 다른 플러그인에서 진행 상태를 조회할 수 있습니다.

## 의존성 추가

GTQuest는 Maven 저장소에 배포되어 있지 않습니다. JAR를 직접 참조합니다.

```kotlin
dependencies {
    compileOnly(files("libs/GTQuest-1.0.jar"))
}
```

```yaml
# plugin.yml
depend: [GTQuest]
```

## 구성 요소 가져오기

```java
GTQuest gtQuest = (GTQuest) Bukkit.getPluginManager().getPlugin("GTQuest");
QuestManager quests = gtQuest.getQuestManager();
PlayerDataManager players = gtQuest.getPlayerDataManager();
```

## 조회

메모리 캐시를 읽으므로 메인 스레드에서 바로 호출해도 됩니다.

**QuestManager**

| 메서드                      | 반환                | 설명                    |
| --------------------------- | ------------------- | ----------------------- |
| `getQuest(int id)`          | `Quest`             | 퀘스트. 없으면 `null`   |
| `getAllQuests()`            | `Collection<Quest>` | 전체 퀘스트 (읽기 전용) |
| `getQuestsByNpc(int npcId)` | `List<Quest>`       | NPC에 연결된 퀘스트     |

**PlayerDataManager**

| 메서드                            | 반환          | 설명                                                           |
| --------------------------------- | ------------- | -------------------------------------------------------------- |
| `getStatus(UUID, Quest)`          | `QuestStatus` | `AVAILABLE`, `LOCKED`, `IN_PROGRESS`, `COMPLETED`, `ABANDONED` |
| `isCompleted(UUID, int questId)`  | `boolean`     | 완료했는지                                                     |
| `isInProgress(UUID, int questId)` | `boolean`     | 진행 중인지                                                    |
| `isPrerequisiteMet(UUID, Quest)`  | `boolean`     | 선행 퀘스트를 완료했는지 (선행이 없으면 `true`)                |

:::warning 플레이어 기록은 **접속 중인 플레이어만** 캐시에 있습니다. 오프라인 플레이어를 조회하면 기록이 없는 것으로
나옵니다(`isCompleted`는 `false`). 접속 직후에도 비동기로 불러오는 동안 잠깐 비어 있을 수 있습니다. :::

## 변경

`PlayerDataManager`의 `acceptQuest`, `abandonQuest`, `completeQuest`, `resetQuest`와 `QuestManager`의 생성, 수정, 삭제
메서드도 public이지만 내부용입니다. 보상 지급, 아이템 차감, 메시지는 GUI와 명령어 쪽에서 처리하기 때문에, 이 메서드만
호출하면 상태만 바뀝니다. 외부에서는 가능하면 명령어(`/gtquest complete`, `/gtquest reset`)를 콘솔로 실행하세요.

## 예시

```java
// 1번 퀘스트를 완료한 플레이어만 특정 지역에 들어가게 하기
if (!players.isCompleted(player.getUniqueId(), 1)) {
    event.setCancelled(true);
    player.sendMessage("광부의 부탁 퀘스트를 먼저 완료하세요.");
}
```
