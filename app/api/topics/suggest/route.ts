import { NextRequest, NextResponse } from 'next/server';

type Topic = { title: string; description: string };

const MOCK_TOPICS: Record<string, Topic[]> = {
  '독재형': [
    { title: '지시에서 영향력으로: 권위 대신 신뢰를 선택하라', description: '명령이 아닌 동기부여로 팀을 이끄는 리더십 전환 방법을 다룹니다.' },
    { title: '심리적 안전감이 만드는 고성과 팀', description: '두려움 없이 의견을 말할 수 있는 팀 환경을 구축하는 실전 전략을 소개합니다.' },
    { title: '위임의 기술: 통제에서 자율로', description: '팀원의 자율성을 높이고 리더의 역할을 재정의하는 위임 프레임워크를 제시합니다.' },
  ],
  '방관형': [
    { title: '존재감 있는 리더십: 팀을 이끄는 리더의 역할', description: '소극적 태도에서 벗어나 팀에 방향을 제시하는 리더십 행동 변화를 다룹니다.' },
    { title: '피드백 문화 만들기: 지금 당장 시작하는 법', description: '정기적이고 건설적인 피드백을 통해 팀 성장을 이끄는 실천 방법을 소개합니다.' },
    { title: '갈등을 기회로: 리더의 조정 역할', description: '팀 내 갈등 상황에서 리더가 적극적으로 개입하고 조율하는 방법을 제시합니다.' },
  ],
  '성과압박형': [
    { title: '지속 가능한 성과: 번아웃 없는 팀 만들기', description: '단기 성과보다 장기적 팀 역량 유지를 위한 균형 잡힌 리더십을 다룹니다.' },
    { title: '과정을 보는 리더십: 결과만이 전부가 아니다', description: '성과 지표 너머 팀원의 성장 과정을 함께 살피는 리더십 관점을 소개합니다.' },
    { title: '코칭 리더십: 답을 주지 말고 질문하라', description: '팀원 스스로 해답을 찾게 하는 코칭 기반 리더십 대화법을 제시합니다.' },
  ],
  '불통형': [
    { title: '경청이 만드는 신뢰의 리더십', description: '말하기보다 듣기를 통해 팀원과의 신뢰를 쌓는 경청 기술을 다룹니다.' },
    { title: '1on1 미팅으로 소통 격차 좁히기', description: '정기적인 1대1 대화를 통해 팀원과의 거리를 좁히는 실전 운영법을 소개합니다.' },
    { title: '소통 채널 다각화: 상황에 맞는 커뮤니케이션', description: '회의, 메신저, 보고서 등 다양한 채널을 상황에 맞게 활용하는 전략을 제시합니다.' },
  ],
  '불명확형': [
    { title: '명확한 방향 제시: 팀이 움직이게 하는 리더의 언어', description: '모호한 지시를 구체적인 기대치로 전환하는 커뮤니케이션 방법을 다룹니다.' },
    { title: '목표 설정과 우선순위: OKR 실전 적용', description: '팀의 에너지를 집중시키는 목표 설정 프레임워크와 우선순위 정렬 방법을 소개합니다.' },
    { title: '기대치 정렬: 오해 없는 팀 운영의 시작', description: '리더와 팀원 간 기대치 불일치를 해소하고 명확한 역할 정의를 하는 방법을 제시합니다.' },
  ],
  '감정기복형': [
    { title: '감정 지능(EQ)으로 리더십 안정화', description: '자신의 감정을 인식하고 조절하는 EQ 역량이 리더십에 미치는 영향을 다룹니다.' },
    { title: '스트레스 상황에서 침착함 유지하기', description: '위기 상황에서도 일관된 리더십을 발휘하는 자기조절 전략과 루틴을 소개합니다.' },
    { title: '리더의 감정이 팀 문화를 만든다', description: '리더의 감정 표현이 팀 분위기와 성과에 미치는 영향과 건강한 감정 표현법을 제시합니다.' },
  ],
};

const DEFAULT_TOPICS: Topic[] = [
  { title: '리더십 역량 개발의 첫 걸음', description: '자기 인식에서 시작하는 리더십 성장의 기초를 다룹니다.' },
  { title: '팀을 성장시키는 리더의 역할', description: '팀원의 역량 개발을 지원하는 리더십 접근법을 소개합니다.' },
  { title: '변화를 이끄는 리더십 전략', description: '조직 변화 상황에서 팀을 효과적으로 이끄는 방법을 제시합니다.' },
];

export async function POST(req: NextRequest) {
  const { leadershipTypes, companyName, kind } = await req.json() as {
    leadershipTypes: string[];
    companyName: string;
    kind: string;
  };

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const type = leadershipTypes?.[0];
    const topics = (type && MOCK_TOPICS[type]) ? MOCK_TOPICS[type] : DEFAULT_TOPICS;
    return NextResponse.json({ topics, source: 'mock' });
  }

  const typeLabel = leadershipTypes?.join(', ') ?? '리더십';
  const prompt = `당신은 기업 리더십 교육 뉴스레터 기획자입니다.
${companyName} 기업의 ${typeLabel} 유형(${kind}) 리더를 대상으로 하는 맞춤형 뉴스레터 주제 3가지를 제안해주세요.
각 주제는 4-5분 분량의 뉴스레터로 다룰 수 있어야 하며, 실용적이고 행동 가능한 내용이어야 합니다.
반드시 다음 JSON 형식으로만 응답해주세요:
{"topics": [{"title": "주제명", "description": "한 줄 설명"}, {"title": "주제명", "description": "한 줄 설명"}, {"title": "주제명", "description": "한 줄 설명"}]}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status}`);
    }

    const data = await res.json() as {
      choices: Array<{ message: { content: string } }>;
    };
    const parsed = JSON.parse(data.choices[0].message.content) as { topics: Topic[] };
    return NextResponse.json({ topics: parsed.topics, source: 'openai' });
  } catch (err) {
    console.error('OpenAI API failed:', err);
    return NextResponse.json({ error: 'AI 추천 실패' }, { status: 500 });
  }
}
