// 문서화 대상 플러그인 목록. 여기에 추가하면 docs 인스턴스, 네비바, 메인 카드가 함께 생성된다.
export type GTPlugin = { id: string; name: string; summary: string };

export const gtPlugins: GTPlugin[] = [
  { id: 'gtdebt', name: 'GTDebt', summary: '빚 시스템' },
  { id: 'gtdonation', name: 'GTDonation', summary: '방송 후원 연동 시스템' },
  { id: 'gtstarter', name: 'GTStarter', summary: '초반 지급템 시스템' },
  { id: 'gtstorage', name: 'GTStorage', summary: '개인 창고 시스템' },
];
