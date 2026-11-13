---
sidebar_position: 1
title: 소개
---

# GTVault

서버의 **경제 플러그인**입니다. 플레이어 소지금을 관리하고 [Vault](https://www.spigotmc.org/resources/vault.34315/)에
경제 서비스로 등록되어, Vault를 쓰는 다른 플러그인(상점, GTStarter, GTEstate, GTQuest 등)이 이 소지금을 사용합니다.

## 주요 기능

| 기능            | 설명                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| 개인 소지금     | 플레이어마다 정수 금액. 0원 아래로 내려가지 않음                          |
| Vault 경제 제공 | 다른 플러그인의 입금, 출금, 잔액 조회를 처리                              |
| 공용 지갑       | 이름을 붙인 공용 금고. 이벤트 상금, 길드 자금 등에 사용. 지갑별 기여 순위 |
| 거래 로그       | 모든 입출금을 SQLite에 기록                                               |

공용 지갑은 Vault에는 노출되지 않습니다. 관리자 명령어나 [API](../dev/api.md)로만 다룹니다.

## 다음 단계

1. [설치하기](./install.md)
2. [명령어](./commands.md)
3. [설정](./config.md)

## 소스 저장소

- [GTVault](https://github.com/go-tiger/GTVault)
