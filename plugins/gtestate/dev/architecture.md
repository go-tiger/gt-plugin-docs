---
sidebar_position: 1
title: 구조
---

# 구조

## 패키지

| 패키지                 | 역할                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTEstate` | 메인 클래스 `GTEstate`. 구성 요소 조립, `getEstateManager()` 제공                                               |
| `command`              | `/gtestate`                                                                                                     |
| `database`             | SQLite 연결과 단일 DB 스레드(`DatabaseManager`), 테이블 입출력(`EstateRepository`)                              |
| `economy`              | Vault 연동(`VaultHook`). 경제 서비스가 늦게 등록되는 경우 재시도                                                |
| `estate`               | `Estate`, `EstateType`, 캐시와 CRUD(`EstateManager`), 구매 처리(`PurchaseService`)                              |
| `listener`             | 표시판 클릭(`SignInteractListener`), 보호(`SignProtectListener`), 청크 로드 시 표시판 갱신(`ChunkLoadListener`) |
| `sign`                 | 표시판 형식(`SignFormat`)과 렌더링(`SignRenderer`)                                                              |
| `util`                 | 메시지                                                                                                          |

## 캐시

서버 시작 시 DB의 모든 매물을 메모리에 올리고, ID, 위치(`world:x:y:z`), 이름(소문자)으로 인덱싱합니다. 표시판 클릭과
보호 검사는 DB를 조회하지 않고 캐시만 봅니다. 변경은 DB에 먼저 반영한 뒤 메인 스레드에서 캐시와 표시판을 갱신합니다.

## 표시판 렌더링

- 표시판 **앞면**만 갱신합니다.
- 청크가 로드되지 않았으면 건너뛰고, `ChunkLoadEvent`에서 그 청크에 있는 매물을 다시 렌더링합니다.
- 매물 위치의 블록이 표시판이 아니면(관리자가 웅크린 채 부순 경우 등) 경고 로그만 남깁니다.

## 구매 처리

```
우클릭 (메인 스레드)
  │  권한, 판매 여부, 경제 연동, 소지금 조건, 최대 소유 수 확인
  │  processing에 매물 ID 등록 (이미 있으면 purchase-busy)
  │  소지금 차감
  ▼  DB 스레드: UPDATE ... WHERE id = ? AND owner_uuid IS NULL
  ▼  메인 스레드
  ├─ 갱신 1행 ──▶ 거래 이력 기록, 캐시와 표시판 갱신, 알림
  └─ 0행 또는 오류 ──▶ 차감한 금액 환불, purchase-failed
```

Vault 호출은 메인 스레드에서 해야 안전하므로 소지금을 먼저 차감합니다. 같은 매물을 두 사람이 동시에 사는 경우는
`processing` 플래그와 `owner_uuid IS NULL` 조건부 UPDATE 두 겹으로 막습니다. 환불까지 실패하면 플레이어, UUID, 금액을
SEVERE 로그로 남깁니다.
