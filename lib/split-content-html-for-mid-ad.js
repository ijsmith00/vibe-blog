/**
 * @param {string} html
 * @param {number} n 1-based
 * @returns {number} n번째 `<ol` 시작 위치, 없으면 -1
 */
function findNthOlOpenIndex(html, n) {
  if (n < 1) return -1;
  const re = /<ol\b/gi;
  let m;
  let k = 0;
  while ((m = re.exec(html)) !== null) {
    k += 1;
    if (k === n) return m.index;
  }
  return -1;
}

/**
 * @param {string} html
 * @param {number} n 1-based
 * @returns {number} n번째 `</ol>` **닫힌 직후** 인덱스, 없으면 -1
 */
function findAfterNthOlCloseIndex(html, n) {
  if (n < 1) return -1;
  const re = /<\/ol>/gi;
  let m;
  let k = 0;
  while ((m = re.exec(html)) !== null) {
    k += 1;
    if (k === n) return m.index + m[0].length;
  }
  return -1;
}

/**
 * 본문 HTML을 중간 광고 삽입 지점 기준으로 둘로 나눈다.
 *
 * 1) `options.midAdOl`이 `before` 또는 `after`이면, 순서 있는 목록( `<ol>` / `</ol>` ) 기준으로 자른다.
 *    - `before`: n번째 `<ol>` **시작** 직전 (`midAdOlIndex`, 기본 1)
 *    - `after` : n번째 `</ol>` **닫힌** 직후
 * 2) `options.midAdBeforeText`가 있으면, 해당 문자열을 포함하는 `<h2>…</h2>` **바로 앞**에서 자른다.
 * 3) 아니면 `</p>` 개수가 2개 이상이면 절반 지점의 `</p>` 뒤에서 자른다.
 * 4) 그렇지 않고 `</h2>`가 있으면 첫 번째 `</h2>` 뒤에서 자른다(짧은 글·단락 없는 구조 대비).
 *
 * @param {string} html
 * @param {{
 *   midAdOl?: "before" | "after" | "";
 *   midAdOlIndex?: number;
 *   midAdBeforeText?: string;
 * }} [options]
 * @returns {{ before: string; after: string }} `after`가 빈 문자열이면 중간 삽입을 생략한다.
 */
export function splitContentHtmlForMidAd(html, options = {}) {
  if (!html || typeof html !== "string") {
    return { before: "", after: "" };
  }

  const olPos = (options.midAdOl || "").toString().trim().toLowerCase();
  if (olPos === "before" || olPos === "after") {
    const rawIdx = options.midAdOlIndex;
    const idx =
      rawIdx == null || String(rawIdx).trim() === ""
        ? 1
        : Math.max(1, parseInt(String(rawIdx), 10) || 1);
    if (olPos === "before") {
      const at = findNthOlOpenIndex(html, idx);
      if (at !== -1) {
        return { before: html.slice(0, at), after: html.slice(at) };
      }
    } else {
      const at = findAfterNthOlCloseIndex(html, idx);
      if (at !== -1) {
        return { before: html.slice(0, at), after: html.slice(at) };
      }
    }
  }

  const needle = (options.midAdBeforeText || "").trim();
  if (needle) {
    const idx = html.indexOf(needle);
    if (idx !== -1) {
      const h2Open = html.lastIndexOf("<h2", idx);
      if (h2Open !== -1) {
        const h2Close = html.indexOf("</h2>", idx);
        if (h2Close !== -1 && idx < h2Close) {
          return { before: html.slice(0, h2Open), after: html.slice(h2Open) };
        }
      }
    }
  }

  const closingPs = [...html.matchAll(/<\/p>/gi)];
  if (closingPs.length >= 2) {
    const midP = Math.floor(closingPs.length / 2);
    const pos = closingPs[midP].index + closingPs[midP][0].length;
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
