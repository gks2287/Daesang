'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCompanyStore } from '@/store/companyStore';
import { useParticipantStore, type LeadershipType } from '@/store/participantStore';

const YEARS = ['2026', '2025', '2024'];

const LEADERSHIP_COLORS: Record<LeadershipType, string> = {
  '독재형':    '#2E7DB5',
  '방관형':    '#55A4DA',
  '성과압박형': '#7EC8E3',
  '불통형':    '#A8D8EA',
  '불명확형':  '#4A90C4',
  '감정기복형': '#B8D4E8',
};

const statusDot: Record<string, string> = {
  '진단 중':      'bg-[#55A4DA]',
  '진단 완료':    'bg-emerald-400',
  '진단 시작 전': 'bg-gray-300',
};
const statusText: Record<string, string> = {
  '진단 중':      'text-[#2E7DB5]',
  '진단 완료':    'text-emerald-600',
  '진단 시작 전': 'text-gray-400',
};

function DonutChart({ segments, total }: {
  segments: { type: LeadershipType; count: number }[];
  total: number;
}) {
  let cum = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-40 h-40">
      <g style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}>
        {total === 0 ? (
          <circle cx="50" cy="50" r="32" fill="none" stroke="#f3f4f6" strokeWidth="12" />
        ) : segments.filter(s => s.count > 0).map((seg, i) => {
          const pct = (seg.count / total) * 100;
          const offset = -cum;
          cum += pct;
          return (
            <circle
              key={i}
              cx="50" cy="50" r="32"
              fill="none"
              stroke={LEADERSHIP_COLORS[seg.type]}
              strokeWidth="12"
              pathLength="100"
              strokeDasharray={`${pct} 100`}
              strokeDashoffset={offset}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default function AnalyticsPage() {
  const [activeYear, setActiveYear] = useState('2026');
  const companies = useCompanyStore(s => s.companies);
  const participants = useParticipantStore(s => s.participants);

  const filteredCompanies = useMemo(() =>
    companies.filter(c =>
      c.startDate?.startsWith(activeYear) || c.endDate?.startsWith(activeYear)
    ),
    [companies, activeYear],
  );

  const companyStats = useMemo(() =>
    filteredCompanies.map(company => {
      const members = participants.filter(p => p.companyId === company.id);
      const sent = members.filter(p => p.deliveryStatus !== '미발송').length;
      const opened = members.filter(p => p.deliveryStatus === '열람' || p.deliveryStatus === '완료').length;
      const completed = members.filter(p => p.deliveryStatus === '완료').length;
      const openRate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
      const completionRate = members.length > 0 ? Math.round((completed / members.length) * 100) : 0;

      const leadershipDist = (Object.keys(LEADERSHIP_COLORS) as LeadershipType[]).map(type => ({
        type,
        count: members.filter(p => p.leadershipType === type).length,
      }));

      return { company, total: members.length, openRate, completionRate, leadershipDist };
    }),
    [filteredCompanies, participants],
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 상단 토퍼 */}
      <div className="bg-white border-b border-gray-200 px-8 py-3.5 flex-shrink-0">
        <div className="flex items-center gap-2 text-[15px] text-gray-800 font-bold">
          <span>기업목록</span>
        </div>
      </div>

      {/* 연도 탭 */}
      <div className="bg-white border-b border-gray-200 px-8 flex-shrink-0">
        <div className="flex gap-6">
          {YEARS.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`pb-3 pt-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeYear === year
                  ? 'border-[#55A4DA] text-[#55A4DA]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {companyStats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-300">
            <p className="text-sm">{activeYear}년 기업 데이터가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {companyStats.map(({ company, total, openRate, completionRate, leadershipDist }) => (
              <Link
                key={company.id}
                href={`/admin/analytics/${company.id}`}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:border-[#55A4DA]/40 hover:shadow-md transition-all group flex flex-col"
              >
                {/* 기업 헤더 */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${company.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{company.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-[#55A4DA] transition-colors">{company.name}</p>
                      <p className="text-xs text-gray-400">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[company.status]}`} />
                    <span className={`text-xs font-medium ${statusText[company.status]}`}>{company.status}</span>
                  </div>
                </div>

                {/* 도넛 차트 */}
                <div className="flex flex-col items-center gap-4 py-2">
                  <DonutChart segments={leadershipDist} total={total} />

                  {/* 범례 */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full">
                    {leadershipDist.filter(s => s.count > 0).map(seg => (
                      <div key={seg.type} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: LEADERSHIP_COLORS[seg.type] }} />
                        <span className="text-[10px] text-gray-500 truncate">{seg.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단 지표 */}
                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 mt-4 pt-4">
                  <div className="text-center">
                    <p className="text-base font-bold text-gray-800">{total}<span className="text-xs font-medium text-gray-400 ml-0.5">명</span></p>
                    <p className="text-[10px] text-gray-400 mt-0.5">대상 리더</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-base font-bold text-[#55A4DA]">{openRate}<span className="text-xs font-medium text-gray-400 ml-0.5">%</span></p>
                    <p className="text-[10px] text-gray-400 mt-0.5">열람률</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-emerald-500">{completionRate}<span className="text-xs font-medium text-gray-400 ml-0.5">%</span></p>
                    <p className="text-[10px] text-gray-400 mt-0.5">참여율</p>
                  </div>
                </div>

                {company.startDate && (
                  <p className="text-[10px] text-gray-300 mt-3">{company.startDate} ~ {company.endDate}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
