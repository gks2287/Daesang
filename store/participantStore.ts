import { create } from 'zustand';

export type LeadershipType =
  | '코칭형'
  | '민주형'
  | '서번트형'
  | '비전형'
  | '관계중심형'
  | '독재형'
  | '방관형'
  | '불통형'
  | '불명확형'
  | '성과압박형'
  | '감정기복형'
  | '완벽주의형'
  | '우유부단형';

export const POSITIVE_TYPES: LeadershipType[] = ['코칭형', '민주형', '서번트형', '비전형', '관계중심형'];
export const NEGATIVE_TYPES: LeadershipType[] = ['독재형', '방관형', '불통형', '성과압박형', '감정기복형', '완벽주의형', '우유부단형'];

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
  token?: string;
}

export function participantToken(p: Participant): string {
  return p.token ?? `nl-${p.id}`;
}

const MOCK: Participant[] = [];

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
