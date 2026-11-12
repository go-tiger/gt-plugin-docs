---
sidebar_position: 1
title: 구조
---

# 구조

GTWoodcutter는 외부에 공개하는 API나 이벤트가 없고, 데이터를 저장하지 않습니다.

## 패키지

| 패키지                     | 역할                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `dev.gotiger.gTWoodcutter` | 메인 클래스. 구성 요소 조립                                                                                                     |
| `command`                  | `/gtwoodcutter`                                                                                                                 |
| `config`                   | 설정 파싱(`WoodcutterConfig`), 나무 종류별 원목, 잎, 묘목, 지면 매핑(`TreeType`)                                                |
| `enchant`                  | 벌목 인챈트 판별과 부여(`WoodcutterEnchantment`)                                                                                |
| `listener`                 | 벌목 진입점(`BlockBreakListener`), 설치한 원목 기록(`BlockPlaceListener`)                                                       |
| `woodcutter`               | 나무 탐색(`TreeDetector`), 수확(`TreeHarvester`), 묘목 심기(`Replanter`), 토글 상태, 보호 확인용 이벤트(`ProtectionProbeEvent`) |
| `util`                     | 메시지                                                                                                                          |

## 인챈트

Spigot API 1.20.1은 서버가 켜진 뒤 새 `Enchantment`를 등록할 수 없습니다. 그래서 플러그인은 인챈트를 등록하지 않고,
데이터팩이 `gtwoodcutter:woodcutter`라는 진짜 바닐라 인챈트를 등록합니다.

플러그인은 `Enchantment.getByKey(new NamespacedKey("gtwoodcutter", key))`로 그 인챈트를 찾아 아이템에 붙어 있는지만
확인합니다. 데이터팩이 없으면 `null`이 되어 벌목이 발동하지 않을 뿐, 오류는 나지 않습니다.

## 처리 흐름

```
BlockBreakEvent (ignoreCancelled)
  │  ProtectionProbeEvent면 무시
  │  월드, 권한, 토글, 웅크림, 도구, 인챈트 확인
  ▼
TreeDetector.detect()
  │  밑동 판별 → 2x2 밑동 수집 → 26방향 BFS
  ├─ NOT_A_TREE, NOT_A_STUMP ──▶ 종료 (바닐라 파괴만)
  ├─ TOO_LARGE ──▶ tree-too-large
  ▼  SUCCESS
prevent-tool-break 확인
  ▼
event.setDropItems(false)
TreeHarvester.harvest()
  │  블록마다 ProtectionProbeEvent로 보호 확인
  │  드롭 수집 → setType(AIR) → 내구도 소모 → 드롭 또는 인벤토리
  ▼
Replanter.schedule() ──▶ delay-ticks 후 밑동에 묘목
```

## 나무 탐색

- **밑동**: 바로 아래 블록이 같은 종류의 원목이 아니면 밑동으로 봅니다. 정글과 짙은 참나무는 수평 8방향으로 인접한 다른
  밑동까지 모아 2x2를 처리합니다.
- **BFS**: 밑동에서 시작해 26방향(3x3x3)으로 퍼집니다. 다크오크와 아카시아의 대각선 가지를 놓치지 않기 위해서입니다.
  원목과 잎 모두에서 계속 퍼집니다.
- **범위**: 밑동보다 아래, `max-height`보다 위, 캔 블록에서 체비쇼프 거리 `max-radius`보다 먼 블록은 건너뜁니다.
- **상한**: 원목과 잎의 합이 `max-blocks`를 넘는 순간 `TOO_LARGE`로 멈춥니다.
- **설치한 원목**: `protect-placed-blocks`가 켜져 있으면 `BlockPlaceListener`가 메모리에 기록한 위치의 원목은 수집하지
  않습니다.

## 수확

- 블록은 `BlockBreakEvent` 없이 `setType(AIR)`로 바로 지웁니다. 블록마다 `BlockBreakEvent`를 발생시키면 이 플러그인의
  리스너가 다시 반응해 재귀에 빠지기 때문입니다.
- 대신 지역 보호 플러그인과 연동하려고, 캔 밑동을 뺀 블록마다 `ProtectionProbeEvent`(`BlockBreakEvent`의 하위 클래스)를
  발생시켜 취소 여부만 봅니다. 취소되면 그 블록은 건너뜁니다. 자체 리스너는 이 타입을 무시해 재귀를 막습니다.
- 내구도는 원목에만 적용합니다. 수확 전에 내구성 인챈트를 반영해 몇 개까지 캘 수 있는지 시뮬레이션하고, 그 수에 도달하면
  멈춥니다. 실제 소모량은 수확이 끝난 뒤 다시 확률로 계산합니다.
- 캔 밑동의 바닐라 드롭은 `setDropItems(false)`로 끄고, 밑동도 수확 목록에 포함해 직접 드롭합니다.

## 다른 플러그인과의 상호작용

`ProtectionProbeEvent`는 일반 `BlockBreakEvent`로 전달되므로, 블록 파괴를 기록하거나 보상하는 플러그인(로그, 직업, 스킬
플러그인 등)이 이 이벤트를 실제 파괴로 처리할 수 있습니다. 반대로 실제로 지워지는 블록은 `setType`으로 지우므로 이런
플러그인에 기록되지 않습니다.

## 상태 저장

| 상태                        | 저장 위치 | 초기화      |
| --------------------------- | --------- | ----------- |
| 토글 끈 플레이어            | 메모리    | 서버 재시작 |
| 플레이어가 설치한 원목 위치 | 메모리    | 서버 재시작 |
