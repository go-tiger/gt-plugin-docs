---
sidebar_position: 4
title: 명령어
---

# 명령어

기본 명령어는 `/gtdonationevent`이고, 별칭 `/gtde`를 쓸 수 있습니다. **모든 명령어에 `gtdonationevent.debug` 권한이 필요합니다.**

| 명령어 | 설명 |
|---|---|
| `/gtde reload` | `config.yml`, `messages.yml`, `targets.yml`을 다시 불러옵니다 |
| `/gtde ignore add [플레이어]` | 플레이어를 `ALL`/`RANDOM` 대상에서 제외합니다 |
| `/gtde ignore remove [플레이어]` | 제외 목록에서 해제합니다 |
| `/gtde effects` | 서버에 등록된 포션 효과 목록을 출력합니다 (버프 제외 목록 작성용) |

## /gtde reload

```
config.yml, messages.yml, targets.yml 리로드 완료.
```

`script-mode` 변경은 리로드로 적용되지 않으므로 서버를 재시작해야 합니다.

## /gtde ignore

플레이어 이름을 생략하면 명령어를 입력한 본인이 대상입니다. 콘솔에서는 이름을 꼭 적어야 합니다.

```
/gtde ignore add Steve
→ Steve님이 후원 대상(ALL/RANDOM)에서 제외되었습니다.
```

변경 내용은 `targets.yml`의 `exclude-players`에 UUID로 저장됩니다.

## /gtde effects

등록된 `PotionEffectType`마다 키, 이름, 번역 키, 한글 이름을 채팅과 콘솔에 출력합니다. `random-buff.exclude-effects`에 넣을 이름을 확인할 때 사용합니다.
