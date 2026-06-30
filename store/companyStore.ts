import { create } from 'zustand';

export type CoachingStatus = '진행 중' | '진행 완료' | '진행 전';

export interface Company {
  id: number;
  name: string;
  initials: string;
  industry: string;
  participantCount: number;
  status: CoachingStatus;
  hrName: string;
  hrEmail: string;
  startDate: string;
  endDate: string;
  note: string;
  color: string;
}

const COLORS = [
  'bg-[#55A4DA]', 'bg-[#4A90C4]', 'bg-[#5B9BD5]', 'bg-[#3A7BBF]',
  'bg-[#6AAED6]', 'bg-[#4B8FBF]', 'bg-[#7DB3D0]', 'bg-[#5CA0C8]',
];

const INITIAL: Company[] = [];

interface CompanyStore {
  companies: Company[];
  addCompany: (data: Omit<Company, 'id' | 'initials' | 'color'>) => void;
  updateCompany: (id: number, data: Partial<Omit<Company, 'id' | 'initials' | 'color'>>) => void;
}

function getInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return '??';
  const words = trimmed.split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return trimmed.slice(0, 2).toUpperCase();
}

export const useCompanyStore = create<CompanyStore>((set, get) => ({
  companies: INITIAL,
  updateCompany: (id, data) => {
    set({
      companies: get().companies.map(c =>
        c.id === id ? { ...c, ...data, initials: data.name ? getInitials(data.name) : c.initials } : c
      ),
    });
  },
  addCompany: (data) => {
    const companies = get().companies;
    const id = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    const color = COLORS[id % COLORS.length];
    const newCompany: Company = {
      ...data,
      id,
      initials: getInitials(data.name),
      color,
    };
    set({ companies: [newCompany, ...companies] });
  },
}));
