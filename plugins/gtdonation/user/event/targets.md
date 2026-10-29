---
sidebar_position: 3
title: 대상 지정
---

# 대상 지정

액션은 세 가지 대상 중 하나에 적용됩니다.

| 대상 | config 모드 | Skript | 설명 |
|---|---|---|---|
| 본인 | `player` | `DonationTarget.PLAYER` | 후원을 받은 플레이어(스트리머) 본인 |
| 랜덤 | `random` | `DonationTarget.RANDOM` | 접속 중인 플레이어 중 1명 |
| 전체 | `all` | `DonationTarget.ALL` | 접속 중인 모든 플레이어 |

Skript에서 대상을 생략하면 `PLAYER`로 실행됩니다.

## 대상 추첨 연출

Skript 모드에서 `RANDOM`을 쓰면, 대상을 고르기 전에 서버 전체에 **"[대상 추첨]" 룰렛 타이틀**이 약 2.6초(52틱) 동안 재생되고, 연출이 끝난 뒤 당첨자에게 액션이 적용됩니다.

## 제외 규칙 (targets.yml)

`RANDOM`과 `ALL`의 후보에서 특정 플레이어를 뺄 수 있습니다. `PLAYER`(본인)에는 적용되지 않습니다.

```yaml title="targets.yml"
exclusion:
  exclude-spectator: true
  exclude-op: false
  exclude-players: [ ]
```

| 키 | 기본값 | 설명 |
|---|---|---|
| `exclude-spectator` | `true` | 관전자 모드 플레이어 제외 |
| `exclude-op` | `false` | OP 제외 |
| `exclude-players` | `[]` | 제외할 플레이어 UUID 목록. 닉네임이 바뀌어도 유지됩니다 |

`exclude-players`는 직접 수정하기보다 명령어로 관리하는 것이 편합니다.

```
/gtde ignore add [플레이어]
/gtde ignore remove [플레이어]
```

→ [명령어](./commands.md)
