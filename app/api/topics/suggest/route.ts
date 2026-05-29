import { NextRequest, NextResponse } from 'next/server';
import { callClaude } from '@/lib/api/claude';

type Topic = { title: string; description: string };

export async function POST(req: NextRequest) {
  const { leadershipTypes, companyName, kind, stepTitle, roundIndex } = await req.json() as {
    leadershipTypes: string[];
    companyName: string;
    kind: string;
    stepTitle?: string;
    roundIndex?: number;
  };

  const typeLabel = leadershipTypes?.filter(Boolean).join(', ') || '리더십';
  const stepLabel = stepTitle ? `${stepTitle} 단계` : '';
  const roundLabel = roundIndex ? `${roundIndex}회차` : '';

  const prompt = `당신은 기업 리더십 코칭 뉴스레터 기획자입니다.
아래 조건에 맞는 뉴스레터 주제 3가지를 제안해주세요.

[조건]
- 대상 기업: ${companyName || '미지정'}
- 리더십 유형: ${typeLabel} (${kind || '일반형'})
- 스토리라인 단계: ${stepLabel || '미지정'}
- 회차: ${roundLabel || '미지정'}

[작성 기준]
- 해당 스토리라인 단계(${stepLabel})의 목적에 부합하는 주제
- ${typeLabel} 유형 리더가 현장에서 바로 적용할 수 있는 실용적인 내용
- 각 주제는 4~5분 분량의 뉴스레터로 다룰 수 있어야 함
- 주제 간 중복 없이 다양한 각도로 접근
- title은 독자가 읽고 싶어지도록 구체적이고 흥미롭게 (10~25자)
- description은 주제를 한 줄로 명확하게 설명 (30~50자)

반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 포함 금지:
{"topics": [{"title": "주제명", "description": "한 줄 설명"}, {"title": "주제명", "description": "한 줄 설명"}, {"title": "주제명", "description": "한 줄 설명"}]}`;

  try {
    const raw = await callClaude(prompt);
    const jsonStart = raw.indexOf('{');
    const jsonEnd = raw.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('JSON 파싱 실패');
    }
    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as { topics: Topic[] };
    const topics = (parsed.topics ?? []).slice(0, 3);
    return NextResponse.json({ topics });
  } catch (err) {
    console.error('[topics/suggest]', err);
    return NextResponse.json({ error: '주제 추천 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
