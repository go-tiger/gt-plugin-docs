---
sidebar_position: 1
title: 소개
---

# GTDebt

플레이어마다 **빚 잔액**을 관리하는 플러그인입니다. 처음 접속한 플레이어에게 빚을 자동으로 부여하고, 관리자 명령어나
Skript로 빚을 늘리거나 줄입니다. 빚이 0원이 되면 완납 연출을 보여 주고 이벤트를 발생시킵니다.

## 주요 기능

| 기능           | 설명                                                            |
| -------------- | --------------------------------------------------------------- |
| 최초 빚 부여   | 처음 접속한 플레이어에게 `default-debt` 금액을 자동으로 부여    |
| 빚 관리 명령어 | 조회, 증가, 감소, 설정. 오프라인 플레이어도 대상 가능           |
| 완납 처리      | 빚이 0원이 되면 타이틀, 전체 채팅 알림, `DebtClearedEvent` 발생 |
| PlaceholderAPI | `%gtdebt_amount%` 등으로 빚 잔액 표시                           |
| 증감 이력      | 모든 변경을 SQLite에 기록 (누가, 언제, 얼마나)                  |
| Java API       | 다른 플러그인이나 Skript(skript-reflect)에서 직접 호출          |

## 다음 단계

1. [설치하기](./install.md)
2. [명령어](./commands.md)
3. [설정](./config.md)
4. [PlaceholderAPI](./placeholders.md)

## 소스 저장소

- [GTDebt](https://github.com/go-tiger/GTDebt)
