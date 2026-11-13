// 문서화 대상 플러그인 목록. 여기에 추가하면 docs 인스턴스, 네비바, 메인 카드가 함께 생성된다.
export type GTPlugin = { id: string; name: string; summary: string };

export const gtPlugins: GTPlugin[] = [
  { id: 'gtdonation', name: 'GTDonation', summary: '방송 후원 연동 시스템' },
  { id: 'gtdebt', name: 'GTDebt', summary: '빚 시스템' },
  { id: 'gtstarter', name: 'GTStarter', summary: '초반 지급템 시스템' },
  { id: 'gtstorage', name: 'GTStorage', summary: '개인 창고 시스템' },
  { id: 'gtestate', name: 'GTEstate', summary: '부동산 시스템' },
  { id: 'gtwoodcutter', name: 'GTWoodcutter', summary: '벌목 시스템' },
  { id: 'gtquest', name: 'GTQuest', summary: '퀘스트 시스템' },
  { id: 'gtelevator', name: 'GTElevator', summary: '엘리베이터 시스템' },
  { id: 'gtvault', name: 'GTVault', summary: '경제 시스템' },
  { id: 'gtrandombox', name: 'GTRandomBox', summary: '랜덤박스 시스템' },
  { id: 'gthardcoreversus', name: 'GTHardcoreVersus', summary: '하드코어 팀전 시스템' },
  { id: 'gtmine', name: 'GTMine', summary: '광산 리젠 시스템' },
];
