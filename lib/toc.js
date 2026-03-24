import GithubSlugger from "github-slugger";

/**
 * 마크다운 본문에서 ## / ### 제목을 추출해 h2 → h3 중첩 구조로 반환합니다.
 * id는 본문 HTML의 rehype-slug(github-slugger)와 동일하게 맞추기 위해,
 * 문서에 등장하는 모든 ATX 제목(# ~ ######)을 **같은 순서로** slug 처리합니다.
 *
 * @param {string} content
 * @returns {Array<{ id: string; text: string; level: 2; children: Array<{ id: string; text: string; level: 3 }> }>}
 */
export function extractTOC(content) {
  if (typeof content !== "string" || content.trim() === "") {
    return [];
  }

  const slugs = new GithubSlugger();
  const lines = content.split(/\r?\n/);
  const result = [];
  /** @type {{ id: string; text: string; level: 2; children: Array<{ id: string; text: string; level: 3 }> } | null} */
  let currentH2 = null;
  /** @type {Array<{ id: string; text: string; level: 3 }>} */
  let pendingBeforeFirstH2 = [];

  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!m) continue;

    const level = m[1].length;
    const text = m[2].trim();
    const id = slugs.slug(text);

    if (level !== 2 && level !== 3) {
      continue;
    }

    if (level === 2) {
      currentH2 = {
        id,
        text,
        level: 2,
        children: [...pendingBeforeFirstH2],
      };
      pendingBeforeFirstH2 = [];
      result.push(currentH2);
    } else if (level === 3) {
      const item = { id, text, level: 3 };
      if (currentH2) {
        currentH2.children.push(item);
      } else {
        pendingBeforeFirstH2.push(item);
      }
    }
  }

  return result;
}
