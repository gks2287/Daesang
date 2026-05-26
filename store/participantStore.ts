import { create } from 'zustand';

export type LeadershipType =
  | '독재형'
  | '방관형'
  | '성과압박형'
  | '불통형'
  | '불명확형'
  | '감정기복형'
  | '완벽주의형'
  | '우유부단형'
  | '코칭형'
  | '민주형'
  | '서번트형'
  | '비전형'
  | '관계중심형';

export type DeliveryStatus = '발송완료' | '열람' | '미발송' | '완료';

export interface Participant {
  id: number;
  companyId: number;
  year: number;
  name: string;
  department: string;
  position: string;
  email: string;
  leadershipType: LeadershipType;
  assessmentRound: number;
  deliveryStatus: DeliveryStatus;
  lastOpenedAt: string | null;
  stepCurrent: number;
  stepTotal: number;
}

const MOCK: Participant[] = [
  // LG화학 (id: 1) — 2025
  { id: 101, companyId: 1, year: 2025, name: '김태준', department: '생산기술팀', position: '부장', email: 'kim.tj@lgchem.com', leadershipType: '독재형', assessmentRound: 2, deliveryStatus: '완료', lastOpenedAt: '2025-11-10', stepCurrent: 6, stepTotal: 6 },
  { id: 102, companyId: 1, year: 2025, name: '이수민', department: '품질관리팀', position: '차장', email: 'lee.sm@lgchem.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '완료', lastOpenedAt: '2025-11-08', stepCurrent: 6, stepTotal: 6 },
  { id: 103, companyId: 1, year: 2025, name: '박현우', department: '연구개발팀', position: '부장', email: 'park.hw@lgchem.com', leadershipType: '불통형', assessmentRound: 2, deliveryStatus: '완료', lastOpenedAt: '2025-11-09', stepCurrent: 6, stepTotal: 6 },
  // LG화학 (id: 1) — 2026
  { id: 104, companyId: 1, year: 2026, name: '정미래', department: '영업팀', position: '과장', email: 'jung.mr@lgchem.com', leadershipType: '방관형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 105, companyId: 1, year: 2026, name: '최동혁', department: '인사팀', position: '차장', email: 'choi.dh@lgchem.com', leadershipType: '감정기복형', assessmentRound: 2, deliveryStatus: '발송완료', lastOpenedAt: null, stepCurrent: 2, stepTotal: 6 },
  { id: 106, companyId: 1, year: 2026, name: '김태준', department: '생산기술팀', position: '부장', email: 'kim.tj@lgchem.com', leadershipType: '독재형', assessmentRound: 1, deliveryStatus: '열람', lastOpenedAt: '2026-05-10', stepCurrent: 3, stepTotal: 6 },

  // LG화학 (id: 1) — 2026 추가 (긍정적)
  { id: 107, companyId: 1, year: 2026, name: '박지훈', department: '전략기획팀', position: '부장', email: 'park.jh@lgchem.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 108, companyId: 1, year: 2026, name: '이수현', department: '인사팀', position: '차장', email: 'lee.sh@lgchem.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 109, companyId: 1, year: 2026, name: '김유진', department: '연구개발팀', position: '과장', email: 'kim.yj@lgchem.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 110, companyId: 1, year: 2026, name: '최민서', department: '마케팅팀', position: '차장', email: 'choi.ms@lgchem.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 111, companyId: 1, year: 2026, name: '장도현', department: '영업팀', position: '부장', email: 'jang.dh@lgchem.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 112, companyId: 1, year: 2026, name: '한소진', department: '재무팀', position: '차장', email: 'han.sj@lgchem.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 113, companyId: 1, year: 2026, name: '오지훈', department: '생산기술팀', position: '과장', email: 'oh.jh@lgchem.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 114, companyId: 1, year: 2026, name: '신민준', department: '품질관리팀', position: '부장', email: 'shin.mj@lgchem.com', leadershipType: '서번트형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 115, companyId: 1, year: 2026, name: '권수빈', department: '전략기획팀', position: '차장', email: 'kwon.sb@lgchem.com', leadershipType: '서번트형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 116, companyId: 1, year: 2026, name: '황태양', department: '연구개발팀', position: '부장', email: 'hwang.ty@lgchem.com', leadershipType: '비전형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 117, companyId: 1, year: 2026, name: '임지은', department: '마케팅팀', position: '과장', email: 'lim.je@lgchem.com', leadershipType: '비전형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 118, companyId: 1, year: 2026, name: '송현우', department: '인사팀', position: '차장', email: 'song.hw@lgchem.com', leadershipType: '관계중심형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 119, companyId: 1, year: 2026, name: '안소희', department: '영업팀', position: '과장', email: 'an.sh@lgchem.com', leadershipType: '관계중심형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  // LG화학 (id: 1) — 2026 추가 (부정적 보완)
  { id: 120, companyId: 1, year: 2026, name: '변민국', department: '생산기술팀', position: '부장', email: 'byun.mk@lgchem.com', leadershipType: '독재형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 121, companyId: 1, year: 2026, name: '류성호', department: '품질관리팀', position: '차장', email: 'ryu.sh@lgchem.com', leadershipType: '방관형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 122, companyId: 1, year: 2026, name: '고민재', department: '재무팀', position: '부장', email: 'ko.mj@lgchem.com', leadershipType: '불통형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 123, companyId: 1, year: 2026, name: '도지연', department: '영업팀', position: '과장', email: 'do.jy@lgchem.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 124, companyId: 1, year: 2026, name: '석준호', department: '전략기획팀', position: '차장', email: 'seok.jh@lgchem.com', leadershipType: '감정기복형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 125, companyId: 1, year: 2026, name: '배성현', department: '연구개발팀', position: '부장', email: 'bae.sh@lgchem.com', leadershipType: '완벽주의형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 126, companyId: 1, year: 2026, name: '나유리', department: '품질관리팀', position: '차장', email: 'na.yr@lgchem.com', leadershipType: '완벽주의형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 127, companyId: 1, year: 2026, name: '엄태호', department: '마케팅팀', position: '부장', email: 'um.th@lgchem.com', leadershipType: '우유부단형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 128, companyId: 1, year: 2026, name: '길다현', department: '인사팀', position: '과장', email: 'gil.dh@lgchem.com', leadershipType: '우유부단형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // 현대모비스 (id: 2) — 2026
  { id: 201, companyId: 2, year: 2026, name: '강서연', department: '부품개발팀', position: '부장', email: 'kang.sy@mobis.com', leadershipType: '독재형', assessmentRound: 2, deliveryStatus: '완료', lastOpenedAt: '2026-05-07', stepCurrent: 6, stepTotal: 6 },
  { id: 202, companyId: 2, year: 2026, name: '윤재혁', department: '구매팀', position: '차장', email: 'yoon.jh@mobis.com', leadershipType: '불명확형', assessmentRound: 1, deliveryStatus: '열람', lastOpenedAt: '2026-05-08', stepCurrent: 3, stepTotal: 6 },
  { id: 203, companyId: 2, year: 2026, name: '임소희', department: '생산팀', position: '과장', email: 'lim.sh@mobis.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '발송완료', lastOpenedAt: null, stepCurrent: 1, stepTotal: 6 },

  // 현대모비스 (id: 2) — 2026 추가
  { id: 204, companyId: 2, year: 2026, name: '최현진', department: '제품개발팀', position: '부장', email: 'choi.hj@mobis.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 205, companyId: 2, year: 2026, name: '박도윤', department: '구매팀', position: '차장', email: 'park.dy@mobis.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 206, companyId: 2, year: 2026, name: '정소연', department: '인사팀', position: '과장', email: 'jung.sy@mobis.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 207, companyId: 2, year: 2026, name: '김태호', department: '영업팀', position: '차장', email: 'kim.th@mobis.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 208, companyId: 2, year: 2026, name: '이민혁', department: '품질팀', position: '부장', email: 'lee.mh@mobis.com', leadershipType: '방관형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 209, companyId: 2, year: 2026, name: '조현서', department: '생산팀', position: '차장', email: 'cho.hs@mobis.com', leadershipType: '방관형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 210, companyId: 2, year: 2026, name: '강지원', department: '연구개발팀', position: '부장', email: 'kang.jw@mobis.com', leadershipType: '감정기복형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 211, companyId: 2, year: 2026, name: '윤예지', department: '전략기획팀', position: '과장', email: 'yoon.yj@mobis.com', leadershipType: '감정기복형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // SK하이닉스 (id: 3) — 2026
  { id: 301, companyId: 3, year: 2026, name: '한지원', department: '반도체개발팀', position: '부장', email: 'han.jw@skhynix.com', leadershipType: '방관형', assessmentRound: 1, deliveryStatus: '완료', lastOpenedAt: '2026-04-30', stepCurrent: 6, stepTotal: 6 },
  { id: 302, companyId: 3, year: 2026, name: '오민준', department: '공정팀', position: '차장', email: 'oh.mj@skhynix.com', leadershipType: '독재형', assessmentRound: 2, deliveryStatus: '완료', lastOpenedAt: '2026-04-28', stepCurrent: 6, stepTotal: 6 },
  { id: 303, companyId: 3, year: 2026, name: '신예진', department: '품질팀', position: '부장', email: 'shin.yj@skhynix.com', leadershipType: '감정기복형', assessmentRound: 2, deliveryStatus: '완료', lastOpenedAt: '2026-05-01', stepCurrent: 6, stepTotal: 6 },

  // SK하이닉스 (id: 3) — 2026 추가
  { id: 304, companyId: 3, year: 2026, name: '문서준', department: '반도체연구팀', position: '부장', email: 'moon.sj@skhynix.com', leadershipType: '비전형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 305, companyId: 3, year: 2026, name: '서다은', department: '설계팀', position: '차장', email: 'seo.de@skhynix.com', leadershipType: '비전형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 306, companyId: 3, year: 2026, name: '조민준', department: '공정팀', position: '부장', email: 'cho.mj@skhynix.com', leadershipType: '서번트형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 307, companyId: 3, year: 2026, name: '전지수', department: '품질팀', position: '과장', email: 'jeon.js@skhynix.com', leadershipType: '서번트형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 308, companyId: 3, year: 2026, name: '황성민', department: '반도체개발팀', position: '차장', email: 'hwang.sm@skhynix.com', leadershipType: '불통형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 309, companyId: 3, year: 2026, name: '임도현', department: '설계팀', position: '부장', email: 'lim.dh@skhynix.com', leadershipType: '불통형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 310, companyId: 3, year: 2026, name: '손아현', department: '공정팀', position: '과장', email: 'son.ah@skhynix.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 311, companyId: 3, year: 2026, name: '백준서', department: '품질팀', position: '차장', email: 'baek.js@skhynix.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // 포스코 (id: 4) — 2025
  { id: 401, companyId: 4, year: 2025, name: '장성민', department: '철강생산팀', position: '부장', email: 'jang.sm@posco.com', leadershipType: '불통형', assessmentRound: 2, deliveryStatus: '완료', lastOpenedAt: '2026-02-25', stepCurrent: 6, stepTotal: 6 },
  { id: 402, companyId: 4, year: 2025, name: '류아영', department: '기술연구팀', position: '차장', email: 'ryu.ay@posco.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '완료', lastOpenedAt: '2026-02-24', stepCurrent: 6, stepTotal: 6 },

  // 포스코 (id: 4) — 2026 추가
  { id: 403, companyId: 4, year: 2026, name: '권민준', department: '생산전략팀', position: '부장', email: 'kwon.mj@posco.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 404, companyId: 4, year: 2026, name: '나은지', department: '인사팀', position: '차장', email: 'na.ej@posco.com', leadershipType: '코칭형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 405, companyId: 4, year: 2026, name: '마성훈', department: '철강연구팀', position: '부장', email: 'ma.sh@posco.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 406, companyId: 4, year: 2026, name: '배수진', department: '영업팀', position: '과장', email: 'bae.sj@posco.com', leadershipType: '민주형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 407, companyId: 4, year: 2026, name: '오태준', department: '생산기술팀', position: '부장', email: 'oh.tj@posco.com', leadershipType: '독재형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 408, companyId: 4, year: 2026, name: '전혜진', department: '품질관리팀', position: '차장', email: 'jeon.hj@posco.com', leadershipType: '독재형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 409, companyId: 4, year: 2026, name: '차민서', department: '기술연구팀', position: '부장', email: 'cha.ms@posco.com', leadershipType: '완벽주의형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 410, companyId: 4, year: 2026, name: '최지훈', department: '철강생산팀', position: '차장', email: 'choi.jh@posco.com', leadershipType: '완벽주의형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // 삼성SDI (id: 5) — 2026
  { id: 501, companyId: 5, year: 2026, name: '백승호', department: '배터리개발팀', position: '부장', email: 'baek.sh@samsungsdi.com', leadershipType: '독재형', assessmentRound: 2, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 502, companyId: 5, year: 2026, name: '남지현', department: '전자재료팀', position: '차장', email: 'nam.jh@samsungsdi.com', leadershipType: '불명확형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // KT&G (id: 6) — 2026
  { id: 601, companyId: 6, year: 2026, name: '홍기태', department: '마케팅팀', position: '부장', email: 'hong.kt@ktng.com', leadershipType: '감정기복형', assessmentRound: 2, deliveryStatus: '열람', lastOpenedAt: '2026-05-09', stepCurrent: 3, stepTotal: 6 },
  { id: 602, companyId: 6, year: 2026, name: '전미선', department: '영업전략팀', position: '과장', email: 'jeon.ms@ktng.com', leadershipType: '방관형', assessmentRound: 1, deliveryStatus: '발송완료', lastOpenedAt: null, stepCurrent: 2, stepTotal: 6 },
  { id: 603, companyId: 6, year: 2026, name: '문성준', department: '인사팀', position: '차장', email: 'moon.sj@ktng.com', leadershipType: '독재형', assessmentRound: 2, deliveryStatus: '열람', lastOpenedAt: '2026-05-10', stepCurrent: 4, stepTotal: 6 },

  // KT&G (id: 6) — 2026 추가
  { id: 604, companyId: 6, year: 2026, name: '하은빈', department: '마케팅팀', position: '부장', email: 'ha.eb@ktng.com', leadershipType: '관계중심형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 605, companyId: 6, year: 2026, name: '남수호', department: '전략기획팀', position: '차장', email: 'nam.sh@ktng.com', leadershipType: '관계중심형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 606, companyId: 6, year: 2026, name: '도현아', department: '브랜드팀', position: '부장', email: 'do.ha@ktng.com', leadershipType: '비전형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 607, companyId: 6, year: 2026, name: '석민준', department: '영업전략팀', position: '과장', email: 'seok.mj@ktng.com', leadershipType: '비전형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 608, companyId: 6, year: 2026, name: '엄지현', department: '인사팀', position: '부장', email: 'um.jh@ktng.com', leadershipType: '우유부단형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 609, companyId: 6, year: 2026, name: '길성호', department: '재무팀', position: '차장', email: 'gil.sh@ktng.com', leadershipType: '우유부단형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 610, companyId: 6, year: 2026, name: '표지연', department: '마케팅팀', position: '과장', email: 'pyo.jy@ktng.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 611, companyId: 6, year: 2026, name: '방현준', department: '영업팀', position: '차장', email: 'bang.hj@ktng.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // 롯데케미칼 (id: 7) — 2026
  { id: 701, companyId: 7, year: 2026, name: '서준영', department: '화학연구팀', position: '부장', email: 'seo.jy@lottechem.com', leadershipType: '불통형', assessmentRound: 2, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },

  // 두산에너빌리티 (id: 8) — 2026
  { id: 801, companyId: 8, year: 2026, name: '고은지', department: '에너지솔루션팀', position: '차장', email: 'ko.ej@doosan.com', leadershipType: '성과압박형', assessmentRound: 1, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
  { id: 802, companyId: 8, year: 2026, name: '허정민', department: '발전사업팀', position: '부장', email: 'heo.jm@doosan.com', leadershipType: '독재형', assessmentRound: 2, deliveryStatus: '미발송', lastOpenedAt: null, stepCurrent: 0, stepTotal: 6 },
];

interface ParticipantStore {
  participants: Participant[];
  getByCompany: (companyId: number) => Participant[];
  getYearsByCompany: (companyId: number) => number[];
  addParticipants: (items: Omit<Participant, 'id'>[]) => void;
  updateParticipant: (id: number, data: Partial<Omit<Participant, 'id'>>) => void;
  removeParticipant: (id: number) => void;
}

export const useParticipantStore = create<ParticipantStore>((set, get) => ({
  participants: MOCK,
  getByCompany: (companyId) =>
    get().participants.filter(p => p.companyId === companyId),
  getYearsByCompany: (companyId) => {
    const years = get()
      .participants.filter(p => p.companyId === companyId)
      .map(p => p.year);
    return [...new Set(years)].sort((a, b) => b - a);
  },
  addParticipants: (items) => {
    const current = get().participants;
    const maxId = current.length > 0 ? Math.max(...current.map(p => p.id)) : 0;
    const next = items.map((item, i) => ({ ...item, id: maxId + i + 1 }));
    set({ participants: [...current, ...next] });
  },
  updateParticipant: (id, data) => {
    set({
      participants: get().participants.map(p => p.id === id ? { ...p, ...data } : p),
    });
  },
  removeParticipant: (id) => {
    set({ participants: get().participants.filter(p => p.id !== id) });
  },
}));
