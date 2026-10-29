// 문서화 대상 플러그인 목록. 여기에 추가하면 docs 인스턴스, 네비바, 메인 카드가 함께 생성된다.
export type GTPlugin = {id: string; name: string; summary: string};

export const gtPlugins: GTPlugin[] = [];
