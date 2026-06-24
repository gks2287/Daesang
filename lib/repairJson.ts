/**
 * Claude API가 반환하는 JSON 문자열 내부에 이스케이프되지 않은 따옴표가
 * 포함될 때 발생하는 파싱 오류를 복구합니다.
 */
export function repairJson(raw: string): string {
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (escaped) {
      result += ch;
      escaped = false;
      continue;
    }

    if (ch === '\\') {
      result += ch;
      escaped = true;
      continue;
    }

    if (ch === '"') {
      if (!inString) {
        inString = true;
        result += ch;
        continue;
      }
      // 닫는 따옴표인지 확인: 이후 공백 제거 후 , } ] : 중 하나면 닫는 따옴표
      let j = i + 1;
      while (j < raw.length && (raw[j] === ' ' || raw[j] === '\t' || raw[j] === '\n' || raw[j] === '\r')) j++;
      const next = raw[j];
      if (next === ',' || next === '}' || next === ']' || next === ':' || j >= raw.length) {
        inString = false;
        result += ch;
      } else {
        // 문자열 내부의 이스케이프되지 않은 따옴표 → 이스케이프 처리
        result += '\\"';
      }
      continue;
    }

    // 문자열 내부 줄바꿈 이스케이프
    if (inString && ch === '\n') {
      result += '\\n';
      continue;
    }
    if (inString && ch === '\r') {
      result += '\\r';
      continue;
    }

    result += ch;
  }

  return result;
}

export function safeParseJson<T>(raw: string): T {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSON 블록을 찾을 수 없습니다.');
  const slice = raw.slice(start, end + 1);
  try {
    return JSON.parse(slice) as T;
  } catch {
    return JSON.parse(repairJson(slice)) as T;
  }
}
