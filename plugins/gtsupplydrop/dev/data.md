---
sidebar_position: 2
title: 데이터 파일
---

# 데이터 파일

## loot.yml

`plugins/GTSupplyDrop/loot.yml`. GUI로 편집할 때마다 파일 전체를 다시 씁니다.

```yaml
sets:
  '0':
    weight: 3
    items:
      '0': rO0ABXNy... # Base64 직렬화 ItemStack (수량 포함)
      '1': rO0ABXNy...
  '5':
    weight: 1
    items:
      '0': rO0ABXNy...
```

| 키                     | 설명                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `sets.<칸>`            | 세트. 칸은 세트 목록 GUI의 칸 번호(0~53). GUI에는 1부터 표시                                                |
| `sets.<칸>.weight`     | 가중치 (0~1,000,000). 없으면 1                                                                              |
| `sets.<칸>.items.<칸>` | 세트 편집 GUI 칸 번호(0~26)별 아이템. `BukkitObjectOutputStream`으로 직렬화한 `ItemStack`을 Base64로 인코딩 |

- 파일을 직접 고친 뒤에는 `/gtsupplydrop reload`를 실행하세요.
- 아이템이 하나도 없는 세트는 읽을 때 버립니다.
- 역직렬화에 실패한 아이템(서버 버전 변경 등)은 경고 로그를 남기고 건너뜁니다.

## 이전 형식 변환

예전 버전의 보상 형식은 처음 읽을 때 **아이템 하나짜리 세트**로 한 번 변환해 저장합니다.

| 이전 형식                                             | 위치         | 변환                                               |
| ----------------------------------------------------- | ------------ | -------------------------------------------------- |
| `items.<칸>.item`, `weight`, `max-amount`             | `loot.yml`   | 아이템 1개 세트. 수량은 `max-amount`로 고정        |
| `loot-pool` 목록 (`material`, `weight`, `max-amount`) | `config.yml` | `loot.yml`이 없을 때만. 순서대로 0번 칸부터 세트로 |

`config.yml`의 `loot-pool`은 변환 후에도 지워지지 않지만, `loot.yml`이 있으면 다시 읽지 않습니다.
