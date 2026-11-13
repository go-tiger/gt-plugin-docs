---
sidebar_position: 6
title: 설정
---

# 설정

`plugins/GTRandomBox/config.yml`을 수정한 뒤 `/gtrandombox 리로드`로 적용합니다. 박스 데이터는 이 파일이 아니라
`boxes/<이름>.yml`에 있습니다.

## settings

| 키                      | 기본값    | 설명                                                                                      |
| ----------------------- | --------- | ----------------------------------------------------------------------------------------- |
| `max-chance`            | `1000000` | 확률에 입력할 수 있는 최댓값                                                              |
| `input-timeout-seconds` | `60`      | 채팅 입력 대기 시간(초)                                                                   |
| `allow-concurrent-open` | `false`   | `false`: 연출이 끝날 때까지 다른 박스를 열 수 없음 (권장)<br/>`true`: 동시에 여러 개 열기 |
| `max-concurrent-open`   | `5`       | `allow-concurrent-open: true`일 때 한 사람이 동시에 열 수 있는 수                         |

## logging

| 키        | 기본값 | 설명                                 |
| --------- | ------ | ------------------------------------ |
| `console` | `true` | 개봉, 지급 로그를 콘솔에 출력        |
| `to-file` | `true` | `logs/open-<날짜>.log` 파일에도 기록 |

연출 도중 접속 종료나 서버 종료로 보상을 받지 못한 경우를 찾으려면 둘 중 하나는 켜 두세요.

## animation

| 키                 | 기본값 | 설명                                     |
| ------------------ | ------ | ---------------------------------------- |
| `enabled`          | `true` | 룰렛 연출. `false`면 바로 지급           |
| `cycle-count`      | `100`  | 아이템이 바뀌는 횟수                     |
| `reveal-last`      | `3`    | 마지막 몇 번을 당첨 아이템으로 보여 줄지 |
| `spin-count`       | `100`  | 당첨 후 회전하는 틱 수                   |
| `spin-degree`      | `7`    | 한 틱에 도는 각도                        |
| `display-scale`    | `0.5`  | 떠오르는 아이템 크기                     |
| `offset-forward`   | `2.0`  | 플레이어 앞쪽 거리(칸)                   |
| `offset-up`        | `1.5`  | 플레이어 발 기준 높이(칸)                |
| `sound-enabled`    | `true` | 소리 (개봉한 플레이어에게만 들림)        |
| `particle-enabled` | `true` | 파티클과 불꽃                            |

아이템이 바뀌는 간격은 고정입니다. 1~50번째는 1틱, 51~75번째는 2틱, 76~90번째는 3틱, 91~95번째는 4틱, 96~97번째는 5틱,
98번째부터는 8틱입니다. `cycle-count`를 늘리면 늘어난 부분은 모두 8틱 간격입니다.

## messages

`&` 색상 코드를 쓸 수 있습니다. `send`로 보내는 메시지 앞에는 `prefix`가 붙고, 도움말(`help-*`)과 표시 이름
안내(`name-prompt-example`, `name-prompt-cancel`), 목록(`list-header`, `list-entry`)에는 붙지 않습니다.

:::note 기본 메시지는 대부분 앞에 이미 `&a[!]`가 들어 있어서, `prefix`(`&a[!] &f`)와 겹쳐 `[!] [!]`처럼 두 번 나옵니다.
하나만 나오게 하려면 `prefix`를 `''`로 비우거나 각 메시지 앞의 `&a[!]`를 지우세요. :::

**관리**

| 키                          | 치환자     | 사용 시점                                                  |
| --------------------------- | ---------- | ---------------------------------------------------------- |
| `no-permission`             |            | 권한 없음                                                  |
| `player-only`               |            | 콘솔에서 플레이어 전용 명령어 실행                         |
| `help-header`, `help-*`     |            | 도움말                                                     |
| `reload-success`            |            | 리로드 완료                                                |
| `name-required`             |            | 생성, 삭제에 이름이 없음                                   |
| `box-name-required`         |            | 그 밖의 명령어에 이름이 없음                               |
| `box-not-found`             |            | 없는 박스. 삭제된 박스를 열 때도 나옴                      |
| `box-already-exists`        |            | 이미 있는 이름, 또는 쓸 수 없는 문자                       |
| `box-created`               | `%name%`   | 생성                                                       |
| `box-deleted`               | `%name%`   | 삭제                                                       |
| `box-delete-failed`         |            | 파일 삭제 실패                                             |
| `list-header`, `list-entry` | `%name%`   | 목록                                                       |
| `list-empty`                |            | 박스 없음                                                  |
| `setting-saved`             | `%name%`   | 설정 GUI 닫음                                              |
| `boxitem-saved`             | `%name%`   | 박스 아이템 지정                                           |
| `boxitem-empty-hand`        |            | 손이 비어 있음                                             |
| `boxitem-not-set`           | `%name%`   | 박스 아이템 없이 지급                                      |
| `give-success`              | `%name%`   | 지급                                                       |
| `player-not-found`          | `%player%` | 접속 중이 아닌 플레이어. 콘솔에서 닉네임 없이 지급하면 `?` |

**확률, 표시 이름 입력**

| 키                    | 치환자               | 사용 시점                                  |
| --------------------- | -------------------- | ------------------------------------------ |
| `chance-prompt`       | `%slot%`             | 확률 입력 요청                             |
| `chance-invalid`      |                      | 숫자가 아님 (입력 대기는 유지)             |
| `chance-out-of-range` | `%max%`              | 0~`max-chance` 밖 (입력 대기는 유지)       |
| `chance-set`          | `%slot%`, `%chance%` | 확률 저장                                  |
| `name-prompt`         | `%slot%`             | 표시 이름 입력 요청                        |
| `name-prompt-example` |                      | 입력 예시                                  |
| `name-prompt-cancel`  |                      | 취소 방법 안내                             |
| `name-set`            | `%slot%`, `%name%`   | 표시 이름 저장                             |
| `input-cancelled`     |                      | `취소` 입력 (확률 입력 취소에도 이 메시지) |
| `input-timeout`       |                      | 입력 시간 초과                             |

**개봉**

| 키              | 치환자                                    | 사용 시점                               |
| --------------- | ----------------------------------------- | --------------------------------------- |
| `open-no-items` |                                           | 보상 없음                               |
| `open-no-space` |                                           | 인벤토리에 빈칸 없음                    |
| `open-already`  |                                           | 이미 여는 중                            |
| `open-result`   | `%box%`, `%item%`, `%amount%`, `%chance%` | 당첨 결과. `%chance%`는 확률(가중치) 값 |
| `open-dropped`  |                                           | 인벤토리가 가득 차 바닥에 떨어뜨림      |

관리 GUI의 아이템 설명 문구와 GUI 제목은 플러그인에 고정되어 있습니다.

## 기본 설정 파일

```yaml
settings:
  max-chance: 1000000
  input-timeout-seconds: 60
  allow-concurrent-open: false
  max-concurrent-open: 5

logging:
  console: true
  to-file: true

animation:
  enabled: true
  cycle-count: 100
  reveal-last: 3
  spin-count: 100
  spin-degree: 7
  display-scale: 0.5
  offset-forward: 2.0
  offset-up: 1.5
  sound-enabled: true
  particle-enabled: true

messages:
  prefix: '&a[!] &f'
  no-permission: '&c권한이 없습니다.'
  player-only: '&c플레이어만 사용할 수 있습니다.'

  help-header: '&a[!] &f랜덤박스 명령어 목록:'
  help-create: '&f| &e/gtrandombox 생성 <이름> &7- 새로운 랜덤박스 생성'
  help-delete: '&f| &e/gtrandombox 삭제 <이름> &7- 랜덤박스 삭제'
  help-list: '&f| &e/gtrandombox 목록 &7- 랜덤박스 목록 보기'
  help-setting: '&f| &e/gtrandombox 설정 <이름> &7- 아이템 설정'
  help-manage: '&f| &e/gtrandombox 관리 <이름> &7- 확률/이름 설정'
  help-boxitem: '&f| &e/gtrandombox 박스설정 <이름> &7- 박스 아이템 설정'
  help-give: '&f| &e/gtrandombox 지급 <이름> &7- 랜덤박스 지급'
  help-reload: '&f| &e/gtrandombox 리로드 &7- 설정 파일 다시 불러오기'

  reload-success: '&a[!] &f설정 파일을 다시 불러왔습니다'
  name-required: '&a[!] &f이름을 입력해주세요'
  box-name-required: '&a[!] &f랜덤박스 이름을 입력해주세요'
  box-not-found: '&a[!] &c존재하지 않는 랜덤박스입니다'
  box-already-exists: '&a[!] &c이미 존재하는 랜덤박스입니다'
  box-created: '&a[!] &f[ &e%name%&f ] 랜덤박스가 &a생성&f되었습니다'
  box-deleted: '&a[!] &f[ &e%name% &f] 랜덤박스가 &c삭제&f되었습니다'
  box-delete-failed: '&c[!] 파일이 존재하지 않아 삭제할 수 없습니다'
  list-header: '&a[!] &f[ 랜덤박스 목록 ]'
  list-entry: '&f| &e%name%'
  list-empty: '&a[!] &7등록된 랜덤박스가 없습니다'
  setting-saved: '&a[!] &f[ &e%name% &f] 설정이 저장되었습니다'
  boxitem-saved: '&a[!] &f[ &e%name% &f] 박스설정이 저장되었습니다'
  boxitem-empty-hand: '&a[!] &c손에 아이템을 들고 명령어를 사용해주세요'
  boxitem-not-set: '&a[!] &f[ &e%name% &f] 박스설정 아이템이 설정되지 않았습니다'
  give-success: '&a[!] &f[ &e%name% &f] 랜덤박스를 지급했습니다'
  player-not-found: '&a[!] &c%player% 님을 찾을 수 없습니다'

  chance-prompt: '&a[!] &e%slot%&f번 슬롯 확률을 입력해주세요 &7(숫자만)'
  chance-invalid: '&a[!] &c숫자만 입력해주세요'
  chance-out-of-range: '&a[!] &c확률은 0 이상 %max% 이하여야 합니다'
  chance-set: '&a[!] &e%slot%&f번 슬롯 확률이 &e%chance%&f% 로 설정되었습니다'
  name-prompt: '&a[!] &e%slot%&f번 슬롯 표시 이름을 입력해주세요'
  name-prompt-example: '&7| &f예시: &e나무 삽&f, &eUMP45 기관단총'
  name-prompt-cancel: '&7| &f취소하려면 &c취소&f를 입력하세요'
  name-set: '&a[!] &e%slot%&f번 슬롯 표시 이름이 &e%name%&f로 설정되었습니다'
  input-cancelled: '&a[!] &f이름 설정이 취소되었습니다'
  input-timeout: '&a[!] &7입력 시간이 초과되어 취소되었습니다'

  open-no-items: '&a[!] &c랜덤박스에 등록된 아이템이 없습니다'
  open-no-space: '&a[!] &c인벤토리에 공간이 없습니다'
  open-already: '&a[!] &c이미 랜덤박스를 여는 중입니다'
  open-result: '&a[!] &7[&e%box%&7] &f랜덤박스를 열어 &e%item% &7(x%amount%)&f를(을) 얻었습니다 &7(%chance%%)'
  open-dropped: '&a[!] &e인벤토리가 가득 차 아이템을 바닥에 떨어뜨렸습니다'
```
