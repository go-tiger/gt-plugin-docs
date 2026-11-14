---
sidebar_position: 5
title: 설정
---

# 설정

`plugins/GTJumpPad/config.yml`입니다. 고친 뒤 `/gtjumppad reload`를 실행하세요. 점프패드 블록은 이 파일이 아니라
`/gtjumppad set`으로 등록합니다.

## settings

```yaml
settings:
  launch-pitch-degrees: 35.0
  launch-speed: 2.2
  cooldown-ms: 500
  prevent-fall-damage: true
  protect-from-explosion: true
  enabled-worlds: []
```

| 키                       | 기본값 | 설명                                         |
| ------------------------ | ------ | -------------------------------------------- |
| `launch-pitch-degrees`   | `35.0` | 발사 각도(도). 0이면 수평, 90이면 수직       |
| `launch-speed`           | `2.2`  | 발사 속도                                    |
| `cooldown-ms`            | `500`  | 발사 후 다시 발사될 때까지 최소 간격(밀리초) |
| `prevent-fall-damage`    | `true` | 발사 후 첫 착지의 낙하 피해 방지             |
| `protect-from-explosion` | `true` | 폭발로 부서지지 않게 함                      |
| `enabled-worlds`         | `[]`   | 동작할 월드 이름 목록. 비우면 모든 월드      |

:::tip

수평 거리는 각도가 45도 근처일 때 가장 멉니다. 높이 올리려면 각도를 키우고, 멀리 보내려면 속도를 키우세요. 속도를 너무
키우면 서버가 플레이어 이동을 되돌릴 수 있습니다.

:::

## item

```yaml
item:
  auto-lore: true
  lore:
    - '&b밟으면 바라보는 방향으로 발사됩니다'
```

| 키          | 설명                                                        |
| ----------- | ----------------------------------------------------------- |
| `auto-lore` | `set`할 때 `lore`를 아이템 로어 끝에 붙일지                 |
| `lore`      | 붙일 문구 목록. `&` 색상 코드 사용 가능. 비우면 붙이지 않음 |

## effects

```yaml
effects:
  sound-enabled: true
  sound: ENTITY_SLIME_JUMP
  sound-volume: 1.0
  sound-pitch: 1.0
  particle-enabled: true
  particle: CLOUD
  particle-count: 15
  show-launch-message: false
```

| 키                            | 설명                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `sound`                       | Bukkit `Sound` 이름. 잘못된 이름이면 소리 없이 발사                          |
| `sound-volume`, `sound-pitch` | 소리 크기, 높낮이                                                            |
| `particle`                    | Bukkit `Particle` 이름. 추가 데이터가 필요한 파티클(`DUST` 등)은 나오지 않음 |
| `particle-count`              | 파티클 개수                                                                  |
| `show-launch-message`         | `true`면 발사할 때 액션바에 `messages.launch-message` 표시                   |

소리와 파티클은 발사한 플레이어의 발 위치에서 나며, 주변 플레이어에게도 보이고 들립니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. `launch-message`를 뺀 모든 메시지 앞에 `prefix`가 붙습니다.

| 키                   | 쓰이는 곳                     | 치환자                 |
| -------------------- | ----------------------------- | ---------------------- |
| `prefix`             | 메시지 앞머리                 |                        |
| `no-permission`      | 권한 없음                     |                        |
| `player-only`        | 콘솔에서 플레이어 전용 명령어 |                        |
| `usage`              | 사용법                        |                        |
| `set-success`        | 등록                          |                        |
| `set-overwritten`    | 기존 등록을 덮어씀            |                        |
| `set-empty-hand`     | 손이 비어 있음                |                        |
| `set-not-block`      | 블록이 아님                   |                        |
| `give-success`       | 지급한 사람에게               | `%player%`, `%amount%` |
| `give-received`      | 받은 사람에게                 | `%amount%`             |
| `template-not-set`   | 등록된 블록 없이 `give`       |                        |
| `inventory-full`     | 일부가 바닥에 떨어짐          |                        |
| `amount-invalid`     | 개수가 잘못됨                 |                        |
| `reloaded`           | `reload`                      |                        |
| `player-not-found`   | 플레이어 없음                 | `%player%`             |
| `info-header`        | `info` 제목                   |                        |
| `info-template`      | 등록된 블록                   | `%item%`               |
| `info-template-none` | 등록된 블록 없음              |                        |
| `info-placed`        | 설치된 개수                   | `%count%`              |
| `launch-message`     | 발사 액션바                   |                        |
