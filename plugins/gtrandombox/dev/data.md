---
sidebar_position: 2
title: 데이터 파일
---

# 데이터 파일

GTRandomBox는 데이터베이스를 쓰지 않고 박스마다 YAML 파일 하나에 저장합니다. 박스 목록은 `boxes/` 폴더의 파일 목록에서
만듭니다.

## boxes/&lt;이름&gt;.yml

```yaml
bind-item:
  item: rO0ABXNy... # 박스 아이템 (Base64)
items:
  '0':
    item: rO0ABXNy... # 보상 아이템 (Base64, 수량 포함)
    chance: 1
    displayname: 다이아몬드 검
  '13':
    item: rO0ABXNy...
    chance: 0
    displayname: ''
```

| 키                         | 설명                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `bind-item.item`           | 박스 아이템. `BukkitObjectOutputStream`으로 직렬화한 `ItemStack`을 Base64로 인코딩 |
| `items.<슬롯>`             | 보상. 슬롯은 설정 GUI 칸 번호(0~53)                                                |
| `items.<슬롯>.item`        | 보상 아이템. 수량까지 저장됨                                                       |
| `items.<슬롯>.chance`      | 확률(가중치). 0이면 자동 분배                                                      |
| `items.<슬롯>.displayname` | 표시 이름. 빈 문자열이면 아이템 이름 사용                                          |

- 파일을 직접 고친 뒤에는 `/gtrandombox 리로드`를 실행하세요.
- 역직렬화에 실패한 아이템(서버 버전 변경 등)은 경고 로그를 남기고 건너뜁니다.
- 파일 이름이 곧 박스 이름입니다. 파일 이름을 바꾸면 박스 이름도 바뀌고, 예전 이름으로 지급된 박스는 열리지 않습니다.

## logs/open-&lt;날짜&gt;.log

```
[2026-11-13 14:02:11] [GTRandomBox] 개봉: player=Steve (uuid=...) box=무기상자 → 당첨: 다이아몬드 검 x1 (확률 1)
[2026-11-13 14:02:21] [GTRandomBox] 지급완료: player=Steve box=무기상자 item=다이아몬드 검 x1
```

날짜별로 파일이 나뉘고 계속 이어서 기록됩니다. 오래된 파일은 자동으로 지워지지 않습니다.
