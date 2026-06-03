'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useCompanyStore } from '@/store/companyStore';
import { useParticipantStore, type DeliveryStatus, type LeadershipType, type Participant } from '@/store/participantStore';
import { useMemo } from 'react';

const STATUS_TABS = ['전체', '발송완료', '미발송'];

const deliveryBadge: Record<DeliveryStatus, { bg: string; text: string; dot: string }> = {
  '열람':     { bg: 'bg-blue-50',   text: 'text-blue-600',   dot: 'bg-blue-400' },
  '발송완료': { bg: 'bg-yellow-50', text: 'text-yellow-600', dot: 'bg-yellow-400' },
  '미발송':   { bg: 'bg-surface-subtle',  text: 'text-text-secondary',   dot: 'bg-icon' },
  '완료':     { bg: 'bg-emerald-50',text: 'text-emerald-600',dot: 'bg-emerald-400' },
};

const VALID_LEADERSHIP: LeadershipType[] = ['독재형', '방관형', '성과압박형', '불통형', '불명확형', '감정기복형'];

function parseRows(rows: Record<string, string>[], companyId: number, year: number): Omit<Participant, 'id'>[] {
  return rows
    .filter(row => row['이름']?.trim())
    .map(row => ({
      companyId,
      year,
      name: row['이름']?.trim() ?? '',
      department: row['부서']?.trim() ?? '',
      position: row['직책']?.trim() ?? '',
      email: row['이메일']?.trim() ?? '',
      leadershipType: (VALID_LEADERSHIP.includes(row['리더십유형']?.trim() as LeadershipType)
        ? row['리더십유형'].trim()
        : '불명확형') as LeadershipType,
      assessmentRound: 1,
      deliveryStatus: '미발송',
      lastOpenedAt: null,
      stepCurrent: 0,
      stepTotal: 6,
    }));
}

export default function ParticipantsPage() {
  const params = useParams();
  const companyId = Number(params.companyId);

  const company = useCompanyStore(s => s.companies.find(c => c.id === companyId));
  const rawParticipants = useParticipantStore(s => s.participants);
  const addParticipants = useParticipantStore(s => s.addParticipants);
  const allParticipants = useMemo(
    () => rawParticipants.filter(p => p.companyId === companyId),
    [rawParticipants, companyId],
  );
  const years = useMemo(
    () => [...new Set(allParticipants.map(p => p.year))].sort((a, b) => b - a),
    [allParticipants],
  );

  const [activeYear, setActiveYear] = useState<number | null>(null);
  const selectedYear = activeYear ?? years[0] ?? new Date().getFullYear();

  const participants = useMemo(
    () => allParticipants.filter(p => p.year === selectedYear),
    [allParticipants, selectedYear],
  );

  const [activeTab, setActiveTab] = useState('전체');
  const [search, setSearch] = useState('');
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ count: number; error?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    try {
      const { read, utils } = await import('xlsx');
      const buffer = await file.arrayBuffer();
      const wb = read(buffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = utils.sheet_to_json<Record<string, string>>(ws, { defval: '' });
      const parsed = parseRows(rows, companyId, selectedYear);
      if (parsed.length === 0) {
        setUploadResult({ count: 0, error: '유효한 데이터가 없습니다. 헤더를 확인해주세요.' });
      } else {
        addParticipants(parsed);
        setUploadResult({ count: parsed.length });
      }
    } catch {
      setUploadResult({ count: 0, error: '파일을 읽는 중 오류가 발생했습니다.' });
    }
    setTimeout(() => setUploadResult(null), 4000);
  }

  const filtered = participants
    .filter(p => activeTab === '전체' || p.deliveryStatus === activeTab)
    .filter(p =>
      p.name.includes(search) ||
      p.position.includes(search) ||
      p.leadershipType.includes(search) ||
      p.email.includes(search)
    );

  if (!company) {
    return (
      <div className="flex items-center justify-center h-full text-text-secondary text-sm">
        존재하지 않는 기업입니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 업로드 토스트 */}
      {uploadResult && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium transition-all ${
          uploadResult.error ? 'bg-red-500 text-white' : 'bg-gray-900 text-white'
        }`}>
          {uploadResult.error ? (
            <>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {uploadResult.error}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span><span className="text-emerald-400 font-bold">{uploadResult.count}명</span>이 목록에 추가됐습니다.</span>
            </>
          )}
        </div>
      )}

      {/* 상단 토퍼 */}
      <div className="bg-surface border-b border-border-light px-8 h-[65px] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[15px] text-text-primary">
          <Link href="/admin/dashboard" className="text-text-secondary font-medium hover:text-text-primary transition-colors">
            진단 대상
          </Link>
          <span className="text-icon">›</span>
          <span className="font-bold">{company.name}</span>
        </div>

        <Link
          href={`/admin/companies/${companyId}/edit`}
          className="flex items-center gap-1.5 text-sm text-text-secondary font-medium px-3.5 py-2 rounded-lg border border-border-light hover:border-gray-300 hover:text-text-primary transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          기업 정보 편집
        </Link>
      </div>

      {/* 본문 */}
      <div className="flex-1 px-8 py-6 flex flex-col overflow-hidden bg-surface">
        {/* 기업 요약 뱃지 */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl ${company.color} flex items-center justify-center flex-shrink-0`}>
            <span className="text-text-onBrand text-xs font-bold">{company.initials}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-base font-bold text-text-primary">{company.name}</h2>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                company.status === '진행 중'   ? 'bg-blue-50 text-blue-600' :
                company.status === '진행 완료' ? 'bg-emerald-50 text-emerald-600' :
                company.status === '진행 전'   ? 'bg-yellow-50 text-yellow-600' :
                                                 'bg-surface-subtle text-text-secondary'
              }`}>
                {company.status}
              </span>
            </div>
            <p className="text-xs text-text-secondary">{company.industry} · 대상 리더 {company.participantCount}명</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {years.length > 0 && years.map(y => (
              <button
                key={y}
                onClick={() => { setActiveYear(y); setActiveTab('전체'); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  y === selectedYear
                    ? 'bg-brand text-text-onBrand'
                    : 'bg-surface-subtle text-text-secondary hover:bg-gray-200'
                }`}
              >
                {y}년
              </button>
            ))}
          </div>
        </div>

        {/* 탭 */}
        <div className="flex items-end justify-between border-b border-border-light mb-5">
          <div className="flex gap-6">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-brand text-brand'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
              {tab !== '전체' && (
                <span className="ml-1.5 text-xs text-text-secondary">
                  {participants.filter(p => p.deliveryStatus === tab).length}
                </span>
              )}
            </button>
          ))}
          </div>

          {/* 검색 + 직책자 추가 */}
          <div className="flex items-center gap-3 pb-2">
            <div className="flex items-center gap-2 bg-surface-subtle border border-border-light rounded-lg px-3 py-1.5">
              <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="이름, 직책, 유형 검색"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-text-secondary placeholder-placeholder outline-none w-32"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setAddMenuOpen(prev => !prev)}
                className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-text-onBrand text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                직책자 추가
                <svg className={`w-3.5 h-3.5 transition-transform ${addMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {addMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setAddMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-surface border border-border-light rounded-2xl shadow-xl z-20 overflow-hidden p-1.5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button
                      onClick={() => { setAddMenuOpen(false); fileInputRef.current?.click(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-primary hover:bg-brand/10 hover:text-brand-dark transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-surface-subtle group-hover:bg-brand/15 flex items-center justify-center transition-colors flex-shrink-0">
                        <svg className="w-4 h-4 text-text-secondary group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <div className="text-left">
                        <p className="text-sm font-semibold">파일로 추가</p>
                        <p className="text-[11px] text-text-secondary font-normal">엑셀·CSV 일괄 업로드</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setAddMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-primary hover:bg-brand/10 hover:text-brand-dark transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-surface-subtle group-hover:bg-brand/15 flex items-center justify-center transition-colors flex-shrink-0">
                        <svg className="w-4 h-4 text-text-secondary group-hover:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <div className="text-left">
                        <p className="text-sm font-semibold">개별 추가</p>
                        <p className="text-[11px] text-text-secondary font-normal">직접 정보 입력</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-surface rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden flex-1">
          {/* 테이블 헤더 바 */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border-light bg-surface-subtle/60">
            <p className="text-sm text-text-secondary font-medium">직책자 목록</p>
            <div className="flex items-center gap-2">
              {/* 리더십 유형 필터 */}
              <div className="relative">
                <select className="appearance-none text-xs font-medium text-text-secondary bg-surface border border-border-light rounded-lg pl-3 pr-7 py-1.5 outline-none cursor-pointer hover:border-brand/60 focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all">
                  <option value="">리더십 유형</option>
                  <option>독재형</option>
                  <option>방관형</option>
                  <option>성과압박형</option>
                  <option>불통형</option>
                  <option>불명확형</option>
                  <option>감정기복형</option>
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {/* 직책 필터 */}
              <div className="relative">
                <select className="appearance-none text-xs font-medium text-text-secondary bg-surface border border-border-light rounded-lg pl-3 pr-7 py-1.5 outline-none cursor-pointer hover:border-brand/60 focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all">
                  <option value="">직책</option>
                  <option>부장</option>
                  <option>차장</option>
                  <option>과장</option>
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {/* 발송 회차 필터 */}
              <div className="relative">
                <select className="appearance-none text-xs font-medium text-text-secondary bg-surface border border-border-light rounded-lg pl-3 pr-7 py-1.5 outline-none cursor-pointer hover:border-brand/60 focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all">
                  <option value="">발송 회차</option>
                  <option>1회차</option>
                  <option>2회차</option>
                  <option>3회차</option>
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 컬럼 헤더 */}
          <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1fr_80px] px-6 py-2.5 bg-surface-subtle border-b border-border-light">
            {['이름', '부서', '직책', '리더십 유형', '발송 현황', '발송 회차', ''].map(h => (
              <p key={h} className="text-xs font-semibold text-text-secondary tracking-wider uppercase">{h}</p>
            ))}
          </div>

          {/* 행 */}
          <div className="divide-y divide-border-light overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-text-secondary">
                해당 직책자가 없습니다.
              </div>
            ) : (
              filtered.map(p => {
                const badge = deliveryBadge[p.deliveryStatus];
                return (
                  <Link
                    key={p.id}
                    href={`/admin/companies/${companyId}/participants/${p.id}`}
                    className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1fr_80px] px-6 py-4 items-center hover:bg-blue-50/40 transition-colors cursor-pointer"
                  >
                    {/* 이름 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand text-xs font-bold">{p.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{p.name}</p>
                        <p className="text-xs text-text-secondary">{p.email}</p>
                      </div>
                    </div>

                    {/* 부서 */}
                    <p className="text-sm text-text-secondary">{p.department}</p>

                    {/* 직책 */}
                    <p className="text-sm text-text-secondary">{p.position}</p>

                    {/* 리더십 유형 */}
                    <span className="inline-flex items-center text-xs font-semibold px-1.5 h-6 rounded bg-surface-ui text-text-primary w-fit">
                      {p.leadershipType}
                    </span>

                    {/* 발송 현황 */}
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${badge.dot}`} />
                      <span className={`text-sm font-medium ${badge.text}`}>{p.deliveryStatus}</span>
                    </div>

                    {/* 발송 회차 */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-surface-subtle rounded-full h-1.5 max-w-[48px]">
                        <div
                          className="bg-brand h-1.5 rounded-full transition-all"
                          style={{ width: `${(p.assessmentRound / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary whitespace-nowrap">{p.assessmentRound}/3</span>
                    </div>

                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
