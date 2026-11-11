---
sidebar_position: 1
title: 구조
---

# 구조

GTStarter는 외부에 공개하는 API나 이벤트가 없습니다.

## 패키지

| 패키지                  | 역할                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTStarter` | 메인 클래스 `GTStarter`. 구성 요소 조립                                                                                          |
| `command`               | `/gtstarter` 명령어                                                                                                              |
| `database`              | SQLite 연결과 단일 DB 스레드(`DatabaseManager`)                                                                                  |
| `economy`               | Vault 연동(`VaultHook`). 경제 서비스가 늦게 등록되는 경우 재시도                                                                 |
| `gui`                   | 지급 아이템 편집 GUI와 저장 리스너                                                                                               |
| `kit`                   | 지급 목록(`KitManager`), 지급 기록(`GrantDataManager`), 지급 처리(`KitGrantService`), 보류 지급 주기 작업(`PendingDeliveryTask`) |
| `listener`              | 접속 시 지급, 퇴장 시 캐시 정리                                                                                                  |
| `util`                  | 아이템 직렬화, 메시지                                                                                                            |

## 지급 흐름

```
PlayerJoinEvent
   │  DB 스레드: granted_players 조회
   ├─ 지급 완료 ──▶ 종료
   │  DB 스레드: pending_items, money_grants 조회
   ▼  메인 스레드
 보류 아이템 없음 ──▶ grant(): 소지금 + 지급 목록 전체
 보류 아이템 있음 ──▶ grantPending(): 보류분만
   │
   ├─ 전부 들어감 ──▶ pending 비우고 granted_players 기록
   └─ 남음      ──▶ 남은 분량을 pending_items에 저장
```

`PendingDeliveryTask`는 15초마다 지급이 끝나지 않은 접속자 중 빈 칸이 있는 플레이어의 보류 아이템을 이어서 지급합니다.

## 동시성

- 모든 DB 작업은 `GTStarter-DB` 단일 스레드에서 순서대로 실행됩니다.
- 지급 목록은 메모리(`CopyOnWriteArrayList`)에 올려 두고 읽기는 메모리에서만 합니다. 쓰기는 DB에 비동기로 반영합니다.
- 접속 지급, 보류 지급 주기, `give` 명령어가 같은 플레이어를 동시에 처리하면 아이템이 중복 지급될 수 있습니다. 그래서
  `GrantDataManager.beginProcessing()`으로 플레이어별 처리 중 상태를 걸고, 이미 처리 중이면 건너뜁니다.

## 유실과 중복 방지

| 상황                        | 처리                                                                         |
| --------------------------- | ---------------------------------------------------------------------------- |
| 인벤토리가 가득 참          | 남은 분량을 `pending_items`에 저장. 지급 완료는 보류분까지 다 준 뒤에만 기록 |
| 보류 중 재접속              | 보류분만 이어서 지급. 소지금은 `money_grants`로 따로 확인해 중복 입금 방지   |
| 지급 기록 조회 실패         | "지급됨"으로 간주해 중복 지급 방지                                           |
| 편집 GUI 닫기               | GUI 안 아이템은 사본이므로 플레이어에게 돌려주지 않음 (돌려주면 복제 버그)   |
| 저장된 아이템 역직렬화 실패 | 서버 버전 변경 등. 그 항목만 건너뛰고 경고 로그                              |

## 아이템 저장

`ItemSerializer`가 `BukkitObjectOutputStream`으로 `ItemStack`을 직렬화한 뒤 Base64로 저장합니다. NBT 정보(인챈트, 이름,
설명, 커스텀 모델 데이터 등)가 그대로 보존됩니다.

지급 아이템은 수량 1짜리 원본과 수량(`amount`)을 따로 저장합니다(`KitItem`). 그래서 최대 스택보다 많은 수량도 저장할 수
있고, 지급할 때 최대 스택 단위로 나눕니다.
