// 기업 표시용 파생값 — 이니셜/색상. (DB에는 저장하되 생성은 서버에서 일관 처리)
const COMPANY_COLORS = [
  'bg-[#55A4DA]', 'bg-[#4A90C4]', 'bg-[#5B9BD5]', 'bg-[#3A7BBF]',
  'bg-[#6AAED6]', 'bg-[#4B8FBF]', 'bg-[#7DB3D0]', 'bg-[#5CA0C8]',
];

export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '??';
  const words = trimmed.split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return trimmed.slice(0, 2).toUpperCase();
}

export function colorForId(id: number): string {
  return COMPANY_COLORS[id % COMPANY_COLORS.length];
}
