---
sidebar_position: 2
title: 설치하기
---

# 설치하기

GTWoodcutter는 **플러그인**과 **데이터팩** 두 개를 함께 설치해야 합니다. 플러그인은 벌목 동작을 처리하고, 데이터팩은
벌목 인챈트를 등록합니다.

## 요구 사항

| 항목 | 요구 사항                      |
| ---- | ------------------------------ |
| 서버 | **Paper 1.21 이상**            |
| Java | 21 이상 (Paper 1.21 요구 사항) |

:::warning 데이터팩으로 인챈트를 추가하는 기능은 1.21부터 생겼습니다. Spigot이나 1.20.x 서버에서는 데이터팩이 동작하지
않아 **벌목 인챈트를 부여할 수 없고, 벌목도 발동하지 않습니다.** 플러그인 자체는 오류 없이 켜집니다. :::

## 1. 플러그인 설치

1. `GTWoodcutter-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행하면 `plugins/GTWoodcutter/config.yml`이 생성됩니다.

## 2. 데이터팩 설치

데이터팩은 저장소의 [`datapack/`](https://github.com/go-tiger/GTWoodcutter/tree/main/datapack) 폴더에 있습니다.

1. `datapack` 폴더 전체를 `world/datapacks/gtwoodcutter`로 복사합니다. `world/datapacks/gtwoodcutter/pack.mcmeta`가 바로
   보이는 구조여야 합니다.

```
world/
└── datapacks/
    └── gtwoodcutter/
        ├── pack.mcmeta
        └── data/
```

2. 서버를 재시작합니다. 재시작하지 않으려면 게임에서 다음을 실행합니다.

```
/datapack enable "file/gtwoodcutter"
/reload
```

3. 도끼를 들고 `/gtwoodcutter give`를 실행해 인챈트가 붙는지 확인합니다.

:::note

- 데이터팩의 `pack_format`은 48(1.21, 1.21.1)로 되어 있습니다. 다른 버전에서 데이터팩이 켜지지 않으면 `pack.mcmeta`의
  `pack_format`을 서버 버전에 맞게 바꾸세요.
- 마법부여대에 인챈트가 나오지 않으면 `/reload` 대신 서버를 완전히 재시작하세요. 마법부여대 태그는 재시작해야 제대로
  합쳐집니다. :::

## 데이터팩 설정

`data/gtwoodcutter/enchantment/woodcutter.json`에서 마법부여대와 모루 관련 값을 바꿀 수 있습니다.

| 키                     | 기본값          | 설명                                            |
| ---------------------- | --------------- | ----------------------------------------------- |
| `description`          | `벌목` (하늘색) | 아이템에 표시되는 인챈트 이름                   |
| `weight`               | `2`             | 마법부여대에서 나올 확률 가중치 (높을수록 자주) |
| `min_cost`, `max_cost` | `15`, `65`      | 마법부여대 레벨 범위                            |
| `anvil_cost`           | `4`             | 모루로 합칠 때 비용                             |
| `max_level`            | `1`             | 최대 레벨                                       |

인챈트 키(`woodcutter`)를 바꾸려면 파일 이름, `config.yml`의 `enchantment.key`,
`data/minecraft/tags/enchantment/in_enchanting_table.json`의 값을 모두 같이 바꿔야 합니다.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
