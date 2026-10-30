---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 패키지               | 역할                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| `dev.gotiger.gTDebt` | 메인 클래스 `GTDebt`. 초기화와 정적 API 진입점                         |
| `command`            | 명령어. 인자 파싱과 결과 메시지만 담당하고 로직은 `DebtService`에 위임 |
| `debt`               | `DebtService`(핵심 로직), `DebtResult`, `DebtClearedEvent`             |
| `database`           | SQLite 연결과 단일 DB 스레드(`DatabaseManager`), 테이블별 저장소       |
| `listener`           | 접속 시 최초 빚 부여, 퇴장 시 캐시 제거                                |
| `placeholder`        | PlaceholderAPI 확장                                                    |
| `util`               | 메시지 포맷, 숫자 포맷                                                 |

## 처리 흐름

```
명령어 / Java API
      │
      ▼
 DebtService ──▶ GTDebt-DB 스레드 (SQLite 갱신 + 이력 기록)
      │
      ├──▶ 캐시 갱신 (DB 성공 후에만)
      └──▶ 0원 도달 시 메인 스레드에서 완납 연출 + DebtClearedEvent
```

## 스레드 모델

- 모든 DB 작업은 `GTDebt-DB`라는 **단일 스레드**에서 실행됩니다. SQLite 커넥션 하나를 공유하므로 "database is locked"
  오류가 생기지 않고, 같은 플레이어에 대한 변경도 순서대로 처리됩니다.
- `DebtService`의 비동기 메서드는 `CompletableFuture`를 반환합니다. 결과 콜백은 DB 스레드에서 실행되므로, Bukkit API를
  써야 한다면 `runTask`로 메인 스레드에 넘겨야 합니다.
- 완납 연출과 `DebtClearedEvent`는 플러그인이 직접 메인 스레드로 넘겨서 실행합니다.

## 캐시

- 접속 중인 플레이어의 빚 잔액을 메모리에 캐시합니다. 최초 부여나 증감, 설정이 성공했을 때 채워지고, 퇴장할 때
  지워집니다.
- DB가 항상 먼저 갱신되므로 퇴장이나 서버 종료 시 따로 저장(flush)할 필요가 없습니다.
- 캐시에 없으면 DB에서 조회합니다. 데이터가 없는 플레이어는 0원으로 취급합니다.

## 종료

`onDisable`에서 DB 스레드에 남은 작업을 최대 10초 기다린 뒤 커넥션을 닫습니다.
