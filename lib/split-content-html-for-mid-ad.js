/**
 * 본문 HTML을 중간 광고 삽입 지점 기준으로 둘로 나눈다.
 * `</p>` 개수가 2개 이상이면 절반 지점의 `</p>` 뒤에서 자른다.
 * 그렇지 않고 `</h2>`가 있으면 첫 번째 `</h2>` 뒤에서 자른다(짧은 글·단락 없는 구조 대비).
 * @param {string} html
 * @returns {{ before: string; after: string }} `after`가 빈 문자열이면 중간 삽입을 생략한다.
 */
export function splitContentHtmlForMidAd(html) {
  if (!html || typeof html !== "string") {
    return { before: "", after: "" };
  }

  const closingPs = [...html.matchAll(/<\/p>/gi)];
  if (closingPs.length >= 2) {
    const idx = Math.floor(closingPs.length / 2);
    const pos = closingPs[idx].index + closingPs[idx][0].length;
    return { before: html.slice(0, pos), after: html.slice(pos) };
  }

  const closingH2 = [...html.matchAll(/<\/h2>/gi)];
  if (closingH2.length >= 1) {
    const pos = closingH2[0].index + closingH2[0][0].length;
    const after = html.slice(pos);
    if (after.trim().length > 40) {
      return { before: html.slice(0, pos), after };
    }
  }

  return { before: html, after: "" };
}
