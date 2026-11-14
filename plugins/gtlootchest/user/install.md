---
sidebar_position: 2
title: 설치하기
---

# 설치하기

## 요구 사항

| 항목 | 요구 사항                                           |
| ---- | --------------------------------------------------- |
| 서버 | Spigot 1.20.1 이상 (Paper 등 Spigot 호환 서버 포함) |
| Java | 17 이상                                             |

다른 플러그인은 필요 없습니다.

## 설치

1. `GTLootChest-<버전>.jar`를 서버의 `plugins/` 폴더에 넣습니다.
2. 서버를 실행합니다. 다음 파일과 폴더가 생깁니다.

| 경로                                   | 설명                                    |
| -------------------------------------- | --------------------------------------- |
| `plugins/GTLootChest/config.yml`       | 가중치, 중복, 함정, 메시지 설정         |
| `plugins/GTLootChest/tiers/<등급>.yml` | 등급마다 하나. 뽑을 개수와 두 풀의 세트 |
| `plugins/GTLootChest/tiers/chests.yml` | GTLootChest로 채운 상자 좌표 기록       |
| `plugins/GTLootChest/markers.yml`      | 설치한 과녁 좌표와 현재 모드            |

3. [등급과 풀 만들기](./tiers.md)를 보고 등급을 만듭니다.

## 직접 빌드하기

[빌드](../dev/build.md) 문서를 참고하세요.
