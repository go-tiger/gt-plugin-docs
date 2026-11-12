---
sidebar_position: 4
title: 명령어
---

# 명령어

`/벌목`으로도 쓸 수 있습니다.

| 명령어                        | 권한                 | 설명                                                  |
| ----------------------------- | -------------------- | ----------------------------------------------------- |
| `/gtwoodcutter toggle`        | `gtwoodcutter.use`   | 내 자동 벌목 켜기, 끄기 (플레이어만)                  |
| `/gtwoodcutter give [닉네임]` | `gtwoodcutter.admin` | 손에 든 도끼에 벌목 인챈트 부여. 닉네임을 생략하면 나 |
| `/gtwoodcutter reload`        | `gtwoodcutter.admin` | `config.yml` 다시 불러오기                            |

## 권한

| 권한                 | 기본값        | 설명                |
| -------------------- | ------------- | ------------------- |
| `gtwoodcutter.use`   | 모든 플레이어 | 벌목 발동, `toggle` |
| `gtwoodcutter.admin` | OP            | `give`, `reload`    |

## give

대상 플레이어가 **손에 든 도끼**에 인챈트를 붙입니다. 대상은 접속 중이어야 합니다.

| 상황                     | 메시지                  |
| ------------------------ | ----------------------- |
| 손이 비어 있음           | `enchant-empty-hand`    |
| 도끼가 아님              | `enchant-invalid-tool`  |
| 이미 인챈트가 있음       | `enchant-already`       |
| 데이터팩이 설치되지 않음 | `enchant-not-installed` |

이름이 `_AXE`로 끝나는 아이템이면 부여할 수 있습니다. 다만 벌목이 발동하려면 그 도끼가 `allowed-tools`에도 있어야
합니다.

## reload

`config.yml`의 모든 설정을 다시 불러옵니다. 재시작하지 않아도 바로 적용됩니다.
