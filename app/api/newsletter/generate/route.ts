import { NextRequest, NextResponse } from 'next/server';

type GeneratedSection = {
  contentTitle: string;
  contentId: string;
  summary: string;
  keyTakeaway: string;
  emoji: string;
};

type GeneratedNewsletter = {
  subject: string;
  headline: string;
  intro: string;
  sections: GeneratedSection[];
  interactionText: string;
  closing: string;
};

type ContentItem = {
  id: string;
  title: string;
  body?: string;
  tags?: string[];
};

type RoundPayload = {
  id: number;
  topic: string;
  stepLabel: string;
  contents: ContentItem[];
  interactions: string[];
  surveys: string[];
};

const INTERACTION_LABELS: Record<string, string> = {
  quiz: '퀴즈',
  scenario: '선택형 시나리오',
  selfcheck: '셀프 진단/체크리스트',
  reflection: '회고 질문',
  dodont: 'Do & Don\'t 리스트',
};

function makeMockResponse(round: RoundPayload, leadershipType: string, companyName: string): GeneratedNewsletter {
  const topicLabel = round.topic.trim() || '리더십 역량 강화';
  const stepLabel = round.stepLabel || '성장';
  return {
    subject: `[${companyName}] ${topicLabel} — ${stepLabel} 단계 뉴스레터 🚀`,
    headline: `${leadershipType} 리더를 위한 ${topicLabel} 가이드`,
    intro: `안녕하세요! 오늘은 ${topicLabel}에 대해 이야기해볼게요. 🙌 리더십을 바꾸는 건 거창한 결심이 아니라, 오늘 하루의 작은 실천에서 시작됩니다. 함께 살펴볼까요?`,
    sections: round.contents.length > 0
      ? round.contents.slice(0, 4).map((c, i) => ({
          contentTitle: c.title,
          contentId: c.id,
          summary: `${c.title}에서는 ${leadershipType} 리더가 실무에서 바로 적용할 수 있는 핵심 인사이트를 다룹니다. 실제 사례와 함께 변화의 첫 걸음을 제안합니다.`,
          keyTakeaway: `💡 ${['작은 변화가 팀 전체를 바꿉니다.', '신뢰는 하루아침에 쌓이지 않지만, 하루만에 무너질 수 있어요.', '피드백은 선물입니다. 주는 것도, 받는 것도 연습이 필요해요.', '리더의 말 한 마디가 팀의 심리적 안전감을 좌우합니다.'][i % 4]}`,
          emoji: ['📖', '🎯', '💡', '🔑'][i % 4],
        }))
      : [{
          contentTitle: `${topicLabel} 핵심 정리`,
          contentId: 'mock-1',
          summary: `${stepLabel} 단계에서 ${leadershipType} 리더가 집중해야 할 핵심 포인트를 정리했습니다. 실무에서 바로 쓸 수 있는 액션 아이템과 함께 전달드립니다.`,
          keyTakeaway: '💡 오늘 하나만 실천해 보세요. 그 하나가 팀을 바꿉니다.',
          emoji: '📖',
        }],
    interactionText: round.interactions.length > 0
      ? `이번 호에는 ${round.interactions.map(v => INTERACTION_LABELS[v] ?? v).join(', ')} 활동이 준비되어 있어요! 5분이면 충분합니다. 지금 바로 참여해 보세요. 👇`
      : '이번 호 내용을 읽고 나서 팀에 어떻게 적용할지 한 줄로 적어보세요. 작은 메모가 큰 변화를 만듭니다. 📝',
    closing: `${stepLabel} 단계의 여정을 함께해 주셔서 감사합니다. 오늘도 한 걸음 성장하는 리더가 되실 거라 믿어요. 다음 호에서 또 만나요! 💙`,
  };
}

export async function POST(req: NextRequest) {
  const { round, leadershipType, companyName } = await req.json() as {
    round: RoundPayload;
    leadershipType: string;
    companyName: string;
  };

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(makeMockResponse(round, leadershipType, companyName));
  }

  const contentSummary = round.contents.length > 0
    ? round.contents.map((c, i) => `${i + 1}. "${c.title}"${c.tags?.length ? ` (태그: ${c.tags.join(', ')})` : ''}`).join('\n')
    : '(콘텐츠 미선정)';

  const interactionList = round.interactions.length > 0
    ? round.interactions.map(v => INTERACTION_LABELS[v] ?? v).join(', ')
    : '없음';

  const prompt = `당신은 뉴닉 스타일의 B2B 리더십 코칭 뉴스레터 작가입니다.
아래 정보를 바탕으로 뉴스레터 본문을 작성해주세요.

[대상]
- 기업명: ${companyName}
- 리더십 유형: ${leadershipType}
- 스토리라인 단계: ${round.stepLabel}
- 이번 호 주제: ${round.topic.trim() || '(미선정)'}

[이번 호 콘텐츠]
${contentSummary}

[인터랙션]
${interactionList}

[작성 지침]
- 뉴닉 스타일: 친근하고 재밌되 정제된 말투
- 이모지 적절히 활용 (과하지 않게)
- 독자(리더)에게 직접 말 거는 2인칭 톤 ("당신", "여러분")
- 전체 분량: 4~5분 읽기 (약 1000~1500자)
- sections는 콘텐츠 수만큼 생성 (콘텐츠 없으면 1개)
- summary는 2~3문장, keyTakeaway는 한 줄 핵심 교훈

반드시 아래 JSON 형식으로만 응답하세요:
{
  "subject": "이메일 제목 (흥미롭게, 이모지 포함)",
  "headline": "핵심 한 줄 헤드라인",
  "intro": "도입부 2~3문장 (흥미 유발)",
  "sections": [
    {
      "contentTitle": "콘텐츠 제목",
      "contentId": "콘텐츠 id (없으면 임의 string)",
      "summary": "2~3문장 핵심 요약",
      "keyTakeaway": "한 줄 핵심 교훈",
      "emoji": "섹션 대표 이모지 1개"
    }
  ],
  "interactionText": "인터랙션 안내 문구 (1~2문장)",
  "closing": "마무리 문구 (따뜻하게, 1~2문장)"
}`;

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
        temperature: 0.85,
      }),
    });

    if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);

    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    const parsed = JSON.parse(data.choices[0].message.content) as GeneratedNewsletter;
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Newsletter generate error:', err);
    return NextResponse.json(makeMockResponse(round, leadershipType, companyName));
  }
}
