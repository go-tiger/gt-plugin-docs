---
sidebar_position: 2
title: 데이터 파일
---

# 데이터 파일

모든 데이터는 YAML 파일에 저장합니다. 파일을 직접 고친 뒤에는 `/gtlootchest reload`를 실행하세요.

## tiers/&lt;등급&gt;.yml

파일 이름이 등급 이름입니다. 저장할 때 파일을 읽어 바뀐 경로만 고치므로, 직접 고친 `random-count` 등은 유지됩니다.

```yaml
random-count:
  min: 3
  max: 3
guaranteed-count:
  min: 0
  max: 0
random:
  '0':
    weight: 10
    items:
      '0': rO0ABXNy... # Base64 직렬화 ItemStack (수량 포함)
      '1': rO0ABXNy...
guaranteed:
  '0':
    items:
      '0': rO0ABXNy...
```

| 키                                 | 설명                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| `random-count`, `guaranteed-count` | 뽑을 개수 범위. 음수는 0                                |
| `random.<칸>`, `guaranteed.<칸>`   | 세트. 칸은 세트 목록 GUI 번호(0~53). GUI에는 1부터 표시 |
| `<칸>.weight`                      | 랜덤 풀 가중치. **없으면 0**(추첨 제외)                 |
| `<칸>.items.<칸>`                  | 세트 편집 GUI 칸(0~26)별 아이템                         |

예전 형식인 `<칸>.item`(아이템 하나)도 읽을 수 있고, 아이템 하나짜리 세트로 다룹니다.

## tiers/chests.yml

GTLootChest로 채운 상자 기록입니다. `tiers` 폴더 안에 있지만 등급 파일로 읽지 않습니다(그래서 `chests`는 등급 이름으로
쓸 수 없습니다).

```yaml
chests:
  - world: world
    x: 100
    y: 64
    z: -20
    tier: rare
    filled-at: 1763100000000
```

| 키                     | 설명                                         |
| ---------------------- | -------------------------------------------- |
| `world`, `x`, `y`, `z` | 상자 좌표                                    |
| `tier`                 | 등급 이름. 등급이 삭제되면 키가 없음(미지정) |
| `filled-at`            | 채운 시각 (epoch 밀리초)                     |

상자가 없어져도 기록은 자동으로 지워지지 않습니다. `stop`하면 과녁 자리의 기록은 지워집니다.

## markers.yml

데이터 폴더 바로 아래에 있습니다.

```yaml
active: false
markers:
  - world: world
    x: 100
    y: 64
    z: -20
    tier: rare
    trap: false
```

| 키          | 설명                       |
| ----------- | -------------------------- |
| `active`    | 상자 모드면 `true`         |
| `markers[]` | 과녁 좌표, 등급, 함정 여부 |

형식이 맞지 않는 항목은 경고를 남기고 건너뜁니다.
