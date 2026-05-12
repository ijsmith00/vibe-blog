import { stripMarkdownBold } from "./post-title.js";

/** @type {Set<string>} */
const STOPWORDS = new Set(
  [
    "the",
    "and",
    "for",
    "with",
    "from",
    "this",
    "that",
    "have",
    "has",
    "been",
    "will",
    "your",
    "our",
    "are",
    "was",
    "were",
    "not",
    "can",
    "may",
    "its",
    "등",
    "및",
    "또는",
    "그리고",
    "하지만",
    "그러나",
    "그래서",
    "때문",
    "위해",
    "통해",
    "관련",
    "대한",
    "있는",
    "없는",
    "있습니다",
    "없습니다",
    "합니다",
    "됩니다",
    "같은",
    "다른",
    "모든",
    "각각",
    "여러",
    "몇몇",
    "어떤",
    "어느",
    "매우",
    "아주",
    "너무",
    "잘",
    "또",
    "다시",
    "이미",
    "항상",
    "보통",
    "일반",
    "가능",
    "방법",
    "이용",
    "사용",
    "있을",
    "없을",
    "있고",
    "없고",
    "있으며",
    "있으나",
    "것으로",
    "것이",
    "것을",
    "것은",
    "수있",
    "수있는",
    "수있습니다",
  ].map((w) => w.toLowerCase()),
);

/**
 * @param {string} raw
 */
function normalizeTag(raw) {
  const t = String(raw ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'「」]+|["'「」]+$/g, "");
  return t;
}

/**
 * @param {string} s
 * @param {number} max
 */
function clipPhrase(s, max) {
  if (s.length <= max) return s;
  let t = s.slice(0, max - 1).trimEnd();
  t = t.replace(/[\s·,./|]+$/g, "");
  t = t.replace(/["'`「」]+$/g, "");
  return `${t}…`;
}

/**
 * @param {string} md
 */
function stripMarkdownForTokens(md) {
  return String(md ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+.+$/gm, " ")
    .replace(/[#>*_~\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} md
 * @returns {string[]}
 */
function extractHeadingPhrases(md) {
  const out = [];
  let inFence = false;
  for (const line of String(md ?? "").split(/\r?\n/)) {
    const tr = line.trim();
    if (tr.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = tr.match(/^#{2,3}\s+(.+)$/);
    if (!m) continue;
    let text = stripMarkdownBold(m[1].trim());
    text = text.replace(/\*\*?[^*]+\*\*?/g, " ").replace(/\s+/g, " ").trim();
    text = text.replace(/["'`]/g, "");
    if (text.length > 48) text = clipPhrase(text, 48);
    if (text.length >= 2) out.push(text);
  }
  return out;
}

/**
 * @param {string} text
 * @returns {Map<string, number>}
 */
function tokenFrequencies(text) {
  const plain = stripMarkdownForTokens(text);
  /** @type {Map<string, number>} */
  const freq = new Map();

  const ko = plain.match(/\p{Script=Hangul}{3,10}/gu) || [];
  for (const w of ko) {
    const k = w.trim();
    if (k.length < 3) continue;
    if (STOPWORDS.has(k.toLowerCase())) continue;
    freq.set(k, (freq.get(k) || 0) + 1);
  }

  const en = plain.match(/[A-Za-z][A-Za-z0-9-]{2,}/g) || [];
  for (const w of en) {
    const k = w.trim();
    if (k.length < 3) continue;
    if (STOPWORDS.has(k.toLowerCase())) continue;
    freq.set(k, (freq.get(k) || 0) + 1);
  }

  return freq;
}

/**
 * 제목·요약·본문·frontmatter 태그·카테고리에서 SEO용 키워드 목록을 만듭니다.
 * (검색 엔진용 보조 텍스트·JSON-LD `keywords`에 쓰기 적합한 길이·개수로 제한)
 *
 * @param {{
 *   title: string;
 *   description: string;
 *   markdownBody: string;
 *   frontmatterTags: string[];
 *   category: string;
 * }} input
 * @returns {string[]}
 */
export function buildSeoTagList({
  title,
  description,
  markdownBody,
  frontmatterTags,
  category,
}) {
  const maxTags = 14;
  /** @type {string[]} */
  const ordered = [];
  /** @type {Set<string>} */
  const seen = new Set();

  const titlePlain = normalizeTag(stripMarkdownBold(title));

  /**
   * 글별로 키워드 칩에서 빼고 싶은 고정/반복 패턴
   * @param {string} tagText
   */
  function isHardExcluded(tagText) {
    const n = normalizeTag(tagText);
    if (!n) return true;
    if (titlePlain && n === titlePlain) return true;
    if (n === "준비 단계 - 얼마짜리 집을 살 수 있을까?") return true;
    if (n.startsWith("대출 사전 승인 받기 -")) return true;
    if (n.startsWith("클로징 - 드디어")) return true;
    if (n.includes("북부 아이다호 바이어스 마켓에서")) return true;
    return false;
  }

  /**
   * @param {string} raw
   * @param {{ allowShort?: boolean }} [opts]
   */
  function push(raw, opts = {}) {
    const t = normalizeTag(raw);
    if (!t) return;
    if (isHardExcluded(t)) return;
    const minLen = opts.allowShort ? 2 : 3;
    if (t.length < minLen || t.length > 48) return;
    const key = t.toLowerCase();
    if (seen.has(key)) return;
    if (STOPWORDS.has(key)) return;
    seen.add(key);
    ordered.push(t);
  }

  for (const tag of frontmatterTags || []) {
    push(String(tag), { allowShort: true });
    if (ordered.length >= maxTags) return ordered;
  }

  const cat = normalizeTag(category || "");
  if (cat && cat !== "미분류") {
    push(cat, { allowShort: true });
    if (ordered.length >= maxTags) return ordered;
  }

  if (ordered.length >= maxTags) return ordered;

  for (const h of extractHeadingPhrases(markdownBody)) {
    push(h);
    if (ordered.length >= maxTags) return ordered;
  }

  const bodyFreq = tokenFrequencies(
    `${markdownBody}\n${description}\n${titlePlain}`,
  );
  const byCount = [...bodyFreq.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0].length - a[0].length;
  });

  for (const [word, count] of byCount) {
    if (count < 2 && word.length < 5) continue;
    push(word);
    if (ordered.length >= maxTags) break;
  }

  return ordered.slice(0, maxTags);
}
