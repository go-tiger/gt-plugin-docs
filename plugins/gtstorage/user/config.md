---
sidebar_position: 4
title: 설정
---

# 설정

`plugins/GTStorage/config.yml`을 수정한 뒤 `/gtstorageadmin reload`로 적용합니다.

## settings

| 키                  | 기본값                     | 설명                                                                                                                              | reload 적용     |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `default-rows`      | `3`                        | 기본 창고 줄 수 (1~6). `setrows`로 따로 지정하지 않은 플레이어에게 적용                                                           | O               |
| `title`             | `&8개인 창고`              | 창고 GUI 제목                                                                                                                     | O               |
| `auto-save-seconds` | `60`                       | 열려 있는 창고를 자동 저장하는 주기(초). `0`이면 자동 저장 안 함                                                                  | X (재시작 필요) |
| `blocked-items`     | `BEDROCK`, `COMMAND_BLOCK` | 보관 금지 아이템. [Material 이름](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html)으로 적고, 잘못된 이름은 무시 | O               |

:::danger **운영 중에 `default-rows`를 줄이지 마세요.** 줄 수를 따로 지정하지 않은 플레이어의 창고가 함께 줄어듭니다.
그러면 없어진 칸의 아이템은 창고에 보이지 않고, **창고를 닫는 순간 삭제됩니다.** `setrows`와 달리 아이템이 남아 있는지
확인하지 않습니다.

`default-rows`는 서버를 열기 전에 정하고, 이후에는 늘리기만 하세요. 특정 플레이어만 줄이려면 `setrows`를 쓰세요. :::

`default-rows`는 반드시 1~6 사이로 적어야 합니다. 범위를 벗어나면 창고가 열리지 않습니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. 메시지 앞에는 `prefix`가 붙습니다.

| 키                    | 치환자               | 사용 시점                          |
| --------------------- | -------------------- | ---------------------------------- |
| `prefix`              |                      | 메시지 앞 접두사                   |
| `no-permission`       |                      | 권한 없음                          |
| `player-only`         |                      | 콘솔에서 플레이어 전용 명령어 실행 |
| `usage`               |                      | 관리자 명령어 형식 오류            |
| `storage-opened`      |                      | 창고 열림                          |
| `storage-saved`       |                      | 현재 사용하지 않음                 |
| `storage-busy`        |                      | 다른 사람이 사용 중이거나 저장 중  |
| `storage-load-failed` |                      | 창고를 불러오지 못함               |
| `item-blocked`        | `%item%`             | 보관 금지 아이템을 넣으려 함       |
| `reloaded`            |                      | 다시 불러오기 완료                 |
| `player-not-found`    | `%player%`           | 접속 이력이 없는 닉네임            |
| `rows-updated`        | `%player%`, `%rows%` | 줄 수 변경 완료                    |
| `rows-invalid`        |                      | 줄 수가 1~6이 아님                 |
| `rows-shrink-blocked` |                      | 없어질 칸에 아이템이 있어 거부     |

`%item%`은 아이템에 이름이 있으면 그 이름, 없으면 `BEDROCK` 같은 아이템 ID로 나옵니다.

## 기본 설정 파일

```yaml
settings:
  default-rows: 3
  title: '&8개인 창고'
  auto-save-seconds: 60
  blocked-items:
    - BEDROCK
    - COMMAND_BLOCK

messages:
  prefix: '&8[&6GT&8] &r'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'
  usage: '&7사용법: &f/gtstorageadmin <open|setrows|reload>'

  storage-opened: '&a창고를 열었습니다.'
  storage-saved: '&7창고 내용이 저장되었습니다.'
  storage-busy: '&c이미 창고를 사용 중입니다.'
  storage-load-failed: '&c창고를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
  item-blocked: '&c%item% &c은(는) 창고에 보관할 수 없습니다.'

  reloaded: '&a설정을 다시 불러왔습니다.'
  player-not-found: '&c%player% 님을 찾을 수 없습니다.'
  rows-updated: '&a%player% 님의 창고를 &e%rows%줄&a로 변경했습니다.'
  rows-invalid: '&c줄 수는 1~6 사이여야 합니다.'
  rows-shrink-blocked: '&c줄여질 칸에 아이템이 남아 있어 변경할 수 없습니다.'
```
