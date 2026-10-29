---
sidebar_position: 5
title: 메시지
---

# 메시지 (messages.yml)

플레이어에게 보이는 메시지는 `plugins/GTDonationEvent/messages.yml`에서 바꿀 수 있습니다. 수정 후 `/gtde reload`로 적용합니다.

- 색상 코드는 `&`를 사용합니다 (`&b`, `&c`, `&l` 등).
- `%이름%` 형식의 플레이스홀더에 값이 들어갑니다.
- 알림 메시지는 Skript 모드에서만 전송됩니다.

## 플레이스홀더

| 플레이스홀더 | 값 | 사용처 |
|---|---|---|
| `%donor%` | 후원자 닉네임 | 대부분의 액션 알림 |
| `%effect%` | 포션 효과 한글 이름 | `random-buff`, `random-debuff` |
| `%item%` | 아이템 이름 | `random-item`, `special-item.result` |
| `%count%` | 개수, 횟수 | `exp-bottle`, 채팅 미니게임 |
| `%chatter%` | 채팅한 시청자 닉네임 | 채팅 미니게임 |
| `%message%` | 채팅 내용 | `chat-shooting` |
| `%projectile%` | 발사체 이름 | `chat-shooting` |
| `%recipient%`, `%enchant%`, `%level%` | 대상, 인챈트, 레벨 | `enchant-fairy.enhanced` |

## 예시

```yaml title="messages.yml"
random-buff:
  msg: "&b[후원] &f%donor%&7님이 &d%effect%&7 버프를 지급"

chat-punch:
  start-title: "&e&l채팅 펀치 시작!"
  start-subtitle: "&f채팅에 '펀치'가 포함되면 넉백됩니다."
  broadcast: "&e[채팅 펀치] &f%chatter%&7님의 펀치! (총 &6%count%회&7)"
```

전체 키 목록은 서버에 생성된 `messages.yml`을 참고하세요.
