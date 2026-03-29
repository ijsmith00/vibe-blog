import GithubSlugger from "github-slugger";

/**
 * 마크다운 본문에서 ##(h2) 제목만 추출해 목차로 씁니다. ### 이하는 목차에 넣지 않습니다.
 * id는 본문 HTML의 rehype-slug(github-slugger)와 동일하게 맞추기 위해,
 * 문서에 등장하는 모든 ATX 제목(# ~ ######)을 **같은 순서로** slug 처리한 뒤 h2만 수집합니다.
 *
 * @param {string} content
 * @returns {Array<{ id: string; text: string }>}
 */
export function extractTOC(content) {
  if (typeof content !== "string" || content.trim() === "") {
    return [];
  }

  const slugs = new GithubSlugger();
  const lines = content.split(/\r?\n/);
  /** @type {Array<{ id: string; text: string }>} */
  const result = [];

  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!m) continue;

    const level = m[1].length;
    const text = m[2].trim();
    const id = slugs.slug(text);

    if (level !== 2) {
      continue;
    }

    result.push({ id, text });
  }

  return result;
}
