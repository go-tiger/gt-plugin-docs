---
sidebar_position: 5
title: PlaceholderAPI
---

# PlaceholderAPI

[PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/)가 설치되어 있으면 자동으로 연동됩니다. 별도
eCloud 다운로드는 필요 없습니다.

| 플레이스홀더                | 예시         | 설명                                                     |
| --------------------------- | ------------ | -------------------------------------------------------- |
| `%gtdebt_amount%`           | `10000000`   | 빚 잔액 (숫자만)                                         |
| `%gtdebt_amount_formatted%` | `10,000,000` | 천 단위 쉼표가 붙은 빚 잔액                              |
| `%gtdebt_iscleared%`        | `true`       | 빚이 0원이면 `cleared-true`, 아니면 `cleared-false` 문구 |

빚 데이터가 없는 플레이어는 0원으로 표시되고, `%gtdebt_iscleared%`도 완납으로 나옵니다.

`%gtdebt_iscleared%`의 문구는 [설정](./config.md#placeholder)에서 바꿀 수 있습니다. 예를 들어 스코어보드에 `완납` 또는
`상환 중`으로 표시하려면 다음처럼 씁니다.

```yaml
placeholder:
  cleared-true: '&a완납'
  cleared-false: '&c상환 중'
```
