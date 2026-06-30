import { create } from 'zustand';
import type { SavedNewsletterContent } from '@/components/newsletter/NewsletterRender';

export type NewsletterStatus = '제작 중' | '제작완료';

export interface Newsletter {
  id: number;
  title: string;
  companyId: number;
  companyName: string;
  leadershipType: string;
  status: NewsletterStatus;
  stepCount: number;
  positiveLeaders: { types: string[]; count: number };
  negativeLeaders: { types: string[]; count: number };
  totalRounds: number;
  completedRounds: number;
  type: 'general' | 'custom';
  leaderType: 'positive' | 'negative';
  totalLeaders: number;
  createdAt: string;
  updatedAt: string;
  savedRounds?: number[];
  // 제작완료 시 저장되는 회차별 생성 본문 (전체본문 + 요약본 미리보기용)
  generatedContent?: SavedNewsletterContent;
}

const MOCK: Newsletter[] = [];

interface NewsletterStore {
  newsletters: Newsletter[];
  addNewsletter: (data: Omit<Newsletter, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNewsletter: (id: number, data: Partial<Omit<Newsletter, 'id'>>) => void;
  removeNewsletter: (id: number) => void;
  toggleRoundSaved: (id: number, roundNum: number) => void;
}

export const useNewsletterStore = create<NewsletterStore>((set, get) => ({
  newsletters: MOCK,
  addNewsletter: (data) => {
    const current = get().newsletters;
    const id = current.length > 0 ? Math.max(...current.map(n => n.id)) + 1 : 1;
    const now = new Date().toISOString().slice(0, 10);
    set({ newsletters: [{ ...data, id, createdAt: now, updatedAt: now }, ...current] });
  },
  updateNewsletter: (id, data) => {
    const now = new Date().toISOString().slice(0, 10);
    set({
      newsletters: get().newsletters.map(n =>
        n.id === id ? { ...n, ...data, updatedAt: now } : n
      ),
    });
  },
  removeNewsletter: (id) => {
    set({ newsletters: get().newsletters.filter(n => n.id !== id) });
  },
  toggleRoundSaved: (id, roundNum) => {
    set({
      newsletters: get().newsletters.map(n => {
        if (n.id !== id) return n;
        const saved = new Set(n.savedRounds ?? []);
        saved.has(roundNum) ? saved.delete(roundNum) : saved.add(roundNum);
        return { ...n, savedRounds: [...saved].sort((a, b) => a - b) };
      }),
    });
  },
}));
