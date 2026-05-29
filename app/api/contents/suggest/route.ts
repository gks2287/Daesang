import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { ContentPoolItem, ContentCategory } from '@/lib/api/contentPool';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const VALID_CATEGORIES: ContentCategory[] = [
  '아티클', '인터뷰', '책 추천', '성공 사례', '카드뉴스', '웹툰',
];

type SearchedContent = {
  title: string;
  category: string;
  duration: number;
  author: string;
  tags: string[];
  body: string;
  thumbnail: string;
};

export async function POST(req: NextRequest) {
  try {
    const { topic, leadershipType, storyStage } = await req.json() as {
      topic: string;
      leadershipType?: string;
      storyStage?: string;
      existingIds?: string[];
    };

    const prompt = `당신은 리더십 코칭 뉴스레터 콘텐츠 큐레이터입니다.
아래 조건에 맞는 콘텐츠를 웹에서 검색해 1~2개 수집해 주세요.

[조건]
- 뉴스레터 주제: ${topic}
- 리더십 유형: ${leadershipType ?? '일반'}
- 스토리 단계: ${storyStage ?? ''}

[분량 제약 — 반드시 준수]
- 뉴스레터 전체 4~5분 분량 중 콘텐츠에 쓸 수 있는 시간은 최대 3분
- duration 1분짜리: 최대 2개 수집 가능
- duration 2분짜리: 1개만 수집
- 콘텐츠는 절대 3개 이상 수집하지 말 것

[수집 기준]
- 주제와 직접 관련된 아티클, 인터뷰, 책, 성공 사례, 카드뉴스, 웹툰만 수집 (영상 제외)
- 신뢰할 수 있는 출처 (언론사, 전문 매체, 학술 자료, 유명 저자 등)
- 한국어 또는 영어 콘텐츠 모두 가능

[body 작성 가이드]
- 뉴닉 뉴스레터 스타일: 친근하고 재밌되 정제된 말투
- 리더(독자)에게 직접 말 거는 2인칭 톤 (예: "여러분은 혹시...")
- 이모지 적절히 활용 (과하지 않게)
- 핵심 내용을 bullet 또는 소제목으로 구조화
- duration 1분 = 400~600자, duration 2분 = 800~1000자
- 원문의 핵심 논점, 데이터, 사례를 구체적으로 포함
- 리더십 맥락(${storyStage ?? ''} 단계)과 연결되는 인사이트로 마무리

반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 포함 금지:
{
  "contents": [
    {
      "title": "콘텐츠 제목 (한국어, 흥미롭게)",
      "category": "아티클|인터뷰|책 추천|성공 사례|카드뉴스|웹툰 중 하나",
      "duration": 1,
      "author": "출처/매체명",
      "tags": ["태그1", "태그2", "태그3"],
      "body": "뉴닉 스타일 본문 (duration 기준 분량 준수)",
      "thumbnail": ""
    }
  ]
}`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools: [{ type: 'web_search_20250305' as const, name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlocks = response.content.filter(b => b.type === 'text');
    const lastText = textBlocks.length > 0
      ? (textBlocks[textBlocks.length - 1] as { type: 'text'; text: string }).text
      : '';

    if (!lastText) return NextResponse.json({ contents: [] });

    const jsonStart = lastText.indexOf('{');
    const jsonEnd = lastText.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) return NextResponse.json({ contents: [] });

    const parsed = JSON.parse(lastText.slice(jsonStart, jsonEnd + 1)) as { contents: SearchedContent[] };
    const now = Date.now();

    const contents: ContentPoolItem[] = (parsed.contents ?? [])
      .slice(0, 2)
      .map((c, i) => ({
        id: `suggested_${now}_${i}`,
        type: 'curation' as const,
        title: String(c.title ?? ''),
        category: VALID_CATEGORIES.includes(c.category as ContentCategory)
          ? (c.category as ContentCategory)
          : '아티클',
        duration: Number(c.duration) === 2 ? 2 : 1,
        author: String(c.author ?? ''),
        tags: Array.isArray(c.tags) ? c.tags.slice(0, 5) : [],
        body: String(c.body ?? ''),
        thumbnail: '',
        createdAt: new Date().toISOString().split('T')[0],
      }));

    return NextResponse.json({ contents });
  } catch (e) {
    console.error('[contents/suggest]', e);
    return NextResponse.json({ error: '콘텐츠 추천 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
