import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { SITE_CATEGORY_DEFS, SITE_NAME } from "./config.js";
import {
  categoryLabelFromSlug,
  isPrivateCategoryLabel,
  normalizeCategory,
} from "./category.js";
import { markdownToHtml } from "./render-markdown.js";
import { buildSeoTagList } from "./seo-tags.js";
import { extractTOC } from "./toc.js";

const POSTS_DIR = path.join(process.cwd(), "posts");

function toSlug(fileName) {
  return fileName.replace(/\.md$/i, "");
}

/** `posts/_template.md` 등 밑줄 접두어 파일은 글 목록·라우트에서 제외 */
function isPublishablePostFileName(fileName) {
  return (
    /\.md$/i.test(fileName) &&
    !fileName.startsWith("_") &&
    !fileName.startsWith(".")
  );
}

function isPublicPostEntry(post) {
  return !isPrivateCategoryLabel(post.category);
}

function formatDateLabel(date) {
  try {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "America/Boise",
    });
  } catch {
    return "";
  }
}

/** YYYY-MM-DD는 달력 날짜 그대로, 시각 포함 값은 ISO 파싱(정렬·표시용) */
function parseFrontmatterDate(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return new Date(`${s}T12:00:00-07:00`);
  }
  const parsed = new Date(s);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** 같은 날짜 글은 파일 수정 시각(최근 작성·편집) 기준으로 최신이 먼저 */
function comparePostsByDateDesc(a, b) {
  const byDate = b.date.localeCompare(a.date);
  if (byDate !== 0) return byDate;
  const aMtime = a.fileMtime ?? "";
  const bMtime = b.fileMtime ?? "";
  return bMtime.localeCompare(aMtime);
}

function stripMarkdown(text) {
  // Excerpt generator for templates/SEO fallbacks.
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraphExcerpt(markdown) {
  const cleaned = markdown.replace(/\r\n/g, "\n").trim();
  const parts = cleaned.split(/\n\s*\n/);
  const first = parts[0] ?? cleaned;
  const plain = stripMarkdown(first);
  return plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function isValidSlug(slug) {
  // Prevent path traversal but allow most Unicode/file-name characters.
  if (typeof slug !== "string" || slug.trim() === "") return false;
  if (slug.includes("/") || slug.includes("\\")) return false;
  if (slug.includes("..")) return false;
  return true;
}

const DEFAULT_PLACEHOLDER_THUMBNAIL_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="60" y="70" width="1080" height="490" rx="28" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/><text x="50%" y="46%" text-anchor="middle" dominant-baseline="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="56" fill="white" opacity="0.95">Image placeholder</text><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="24" fill="white" opacity="0.85">${SITE_NAME}</text></svg>`;

const DEFAULT_PLACEHOLDER_IMAGE =
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    DEFAULT_PLACEHOLDER_THUMBNAIL_SVG,
  )}`;

function localPublicPathFromSrc(src) {
  // Only handle local public assets like "/images/foo.jpg".
  if (!src || typeof src !== "string") return null;
  if (!src.startsWith("/")) return null;
  const relative = src.replace(/^\//, "");
  return path.join(process.cwd(), "public", relative);
}

/** 절대·상대 URL을 pathname 기준으로 비교 (썸네일 vs 본문 첫 img 중복) */
function normalizeAssetPathForCompare(src) {
  if (!src || typeof src !== "string") return "";
  const noQuery = src.trim().split(/[?#]/)[0];
  try {
    if (/^https?:\/\//i.test(noQuery)) {
      const u = new URL(noQuery);
      return u.pathname.replace(/\/+$/, "") || "/";
    }
  } catch {
    /* ignore */
  }
  let p = noQuery.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  return p.replace(/\/{2,}/g, "/");
}

/** 본문 HTML에서 첫 img의 src */
function firstImgSrcInHtml(html) {
  if (!html || typeof html !== "string") return null;
  const m = /<img\b[^>]*?\bsrc\s*=\s*(["'])(.*?)\1/is.exec(html);
  return m ? m[2].trim() : null;
}

function leadThumbnailDuplicatesFirstBodyImage(thumbnailUrl, contentHtml) {
  const a = normalizeAssetPathForCompare(thumbnailUrl);
  const b = normalizeAssetPathForCompare(firstImgSrcInHtml(contentHtml));
  return Boolean(a && b && a === b);
}

async function resolveThumbnailSrc(thumbnail) {
  if (typeof thumbnail !== "string" || thumbnail.trim() === "") {
    return DEFAULT_PLACEHOLDER_IMAGE;
  }

  const localPath = localPublicPathFromSrc(thumbnail.trim());
  if (!localPath) return thumbnail;

  const exists = await fileExists(localPath);
  if (exists) return thumbnail;
  return DEFAULT_PLACEHOLDER_IMAGE;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractAltFromImgTag(imgTag) {
  const m = /alt\s*=\s*("([^"]*)"|'([^']*)')/i.exec(imgTag);
  if (!m) return "";
  return (m[2] ?? m[3] ?? "").trim();
}

/**
 * 본문 HTML의 img에 대해:
 * - alt가 없거나 빈 문자열이면 포스트 제목을 기본 alt로 삽입
 * - loading 속성이 없으면 loading="lazy" 추가
 */
function enhanceImgTags(html, defaultAlt) {
  const altEscaped = escapeHtml(String(defaultAlt));

  return html.replace(/<img\b([^>]*)\/?>/gi, (full, attrs) => {
    let a = (attrs || "").trim();

    if (!/\balt\s*=/i.test(a)) {
      a = `alt="${altEscaped}" ${a}`.trim();
    } else {
      a = a.replace(/\balt\s*=\s*(["'])([^"']*)\1/i, (m, q, inner) => {
        if (String(inner).trim() === "") return `alt="${altEscaped}"`;
        return m;
      });
    }

    if (!/\bloading\s*=/i.test(a)) {
      a = `${a} loading="lazy"`.trim();
    }

    return `<img ${a} />`;
  });
}

/** 단일 이미지 문단을 figure + figcaption(alt)으로 바꿉니다. CSS만으로는 img alt를 캡션에 못 올립니다. */
function wrapLoneImageParagraphsWithFigure(html) {
  return html.replace(
    /<p>\s*(<img\b[^>]*\/?>)\s*<\/p>/gi,
    (full, imgTag) => {
      const alt = extractAltFromImgTag(imgTag);
      if (!alt) return full;
      return `<figure>${imgTag}<figcaption>${escapeHtml(alt)}</figcaption></figure>`;
    },
  );
}

function parseTagsFromFrontmatter(data) {
  const raw = data?.tags;
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/** `seo_keywords`가 있으면 하단 키워드·JSON-LD `keywords`는 이 목록만 사용 (자동 추출 생략) */
function parseSeoKeywordsFromFrontmatter(data) {
  const raw = data?.seo_keywords ?? data?.seoKeywords;
  if (raw == null) return null;
  if (Array.isArray(raw)) {
    const list = raw.map((x) => String(x).trim()).filter(Boolean);
    return list.length ? list : null;
  }
  if (typeof raw === "string") {
    const list = raw
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return list.length ? list : null;
  }
  return null;
}

function estimateReadingMinutes(markdown) {
  const plain = stripMarkdown(markdown);
  const n = plain.length;
  return Math.max(1, Math.ceil(n / 200));
}

async function getThumbnailDisplayUrl(thumbnailRaw) {
  const thumbRaw = (thumbnailRaw || "").trim();
  if (!thumbRaw) return null;
  if (/^https?:\/\//i.test(thumbRaw)) return thumbRaw;
  const pathForPublic = thumbRaw.startsWith("/") ? thumbRaw : `/${thumbRaw}`;
  const localPath = localPublicPathFromSrc(pathForPublic);
  if (localPath && (await fileExists(localPath))) return pathForPublic;
  return null;
}

async function replaceMissingImagesWithPlaceholder(html) {
  const imgTagRegex = /<img\b[^>]*\bsrc=(["'])(.*?)\1[^>]*>/gi;
  const matches = Array.from(html.matchAll(imgTagRegex));
  if (matches.length === 0) return html;

  // Build the output with slicing to avoid async issues inside String.replace.
  let out = "";
  let lastIndex = 0;

  for (const match of matches) {
    const fullTag = match[0];
    const src = (match[2] ?? "").trim();
    const index = match.index ?? -1;

    if (index < 0) continue;

    out += html.slice(lastIndex, index);

    const localPath = localPublicPathFromSrc(src);
    const shouldReplace = !src || (localPath !== null && !(await fileExists(localPath)));

    if (shouldReplace) {
      // Replace with an inline placeholder (works without needing actual image files).
      const altMatch = /alt=(["'])(.*?)\1/i.exec(fullTag);
      const alt = altMatch?.[2]?.trim() ? altMatch[2].trim() : "placeholder image";
      out += `<img src="${DEFAULT_PLACEHOLDER_IMAGE}" alt="${alt}" />`;
    } else {
      out += fullTag;
    }

    lastIndex = index + fullTag.length;
  }

  out += html.slice(lastIndex);
  return out;
}

export async function getAllPosts() {
  let dirents;
  try {
    dirents = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const mdFiles = dirents
    .filter((d) => d.isFile() && isPublishablePostFileName(d.name))
    .map((d) => d.name);

  const posts = await Promise.all(
    mdFiles.map(async (fileName) => {
      const slug = toSlug(fileName);
      const filePath = path.join(POSTS_DIR, fileName);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);

      const stat = await fs.stat(filePath);
      const dateValue =
        parseFrontmatterDate(parsed.data?.date) ?? stat.mtime;

      const title = parsed.data?.title || slug;
      const category = parsed.data?.category || "";
      const description =
        parsed.data?.description ||
        parsed.data?.excerpt ||
        firstParagraphExcerpt(parsed.content);

      const thumbRaw = (parsed.data?.thumbnail || "").trim();
      let cardThumbnail = null;
      if (thumbRaw) {
        if (/^https?:\/\//i.test(thumbRaw)) {
          cardThumbnail = thumbRaw;
        } else {
          const localPath = localPublicPathFromSrc(
            thumbRaw.startsWith("/") ? thumbRaw : `/${thumbRaw}`,
          );
          if (localPath && (await fileExists(localPath))) {
            cardThumbnail = thumbRaw.startsWith("/") ? thumbRaw : `/${thumbRaw}`;
          }
        }
      }

      return {
        slug,
        title,
        category,
        tags: parseTagsFromFrontmatter(parsed.data),
        description,
        thumbnail: parsed.data?.thumbnail || "",
        cardThumbnail,
        date: dateValue.toISOString(),
        dateLabel: formatDateLabel(dateValue),
        fileMtime: stat.mtime.toISOString(),
      };
    }),
  );

  posts.sort(comparePostsByDateDesc);
  return posts;
}

/** 비공개 카테고리 글 제외 — 홈·사이트맵·검색·태그·연관글 등 */
export async function getPublicPosts() {
  const all = await getAllPosts();
  return all.filter(isPublicPostEntry);
}

/**
 * 제목·설명·카테고리·태그에서 대소문자 구분 없이 부분 일치 검색.
 * @param {string} rawQuery
 */
export async function searchPosts(rawQuery) {
  const q = String(rawQuery ?? "").trim();
  if (!q) return [];

  const needle = q.toLowerCase();
  const all = await getAllPosts();

  return all.filter(isPublicPostEntry).filter((p) => {
    if ((p.title || "").toLowerCase().includes(needle)) return true;
    if ((p.description || "").toLowerCase().includes(needle)) return true;
    if (normalizeCategory(p.category).toLowerCase().includes(needle)) return true;
    for (const t of p.tags || []) {
      const label = normalizeTagLabel(String(t));
      if (label && label.toLowerCase().includes(needle)) return true;
    }
    return false;
  });
}

/**
 * URL/검색용 태그 문자열 정규화 (앞뒤 공백 제거, decodeURIComponent는 호출부에서 처리).
 */
function normalizeTagLabel(raw) {
  if (typeof raw !== "string") return "";
  return raw.trim();
}

/**
 * 모든 고유 태그와 해당 태그가 붙은 포스트 수.
 * 한 포스트에 같은 태그가 여러 번 있어도 1회만 집계.
 * @returns {Promise<{ name: string; count: number }[]>}
 */
export async function getAllTags() {
  const posts = await getAllPosts();
  const map = new Map();

  for (const p of posts.filter(isPublicPostEntry)) {
    const unique = [
      ...new Set(
        (p.tags || []).map((t) => normalizeTagLabel(String(t))).filter(Boolean),
      ),
    ];
    for (const name of unique) {
      map.set(name, (map.get(name) || 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

/**
 * 특정 태그가 하나라도 있는 포스트만, 날짜 내림차순.
 * @param {string} tagParam URL 세그먼트(인코딩 가능)
 */
export async function getPostsByTag(tagParam) {
  const target = normalizeTagLabel(
    typeof tagParam === "string"
      ? (() => {
          try {
            return decodeURIComponent(tagParam);
          } catch {
            return tagParam;
          }
        })()
      : "",
  );
  if (!target) return [];

  const posts = await getAllPosts();
  return posts.filter(isPublicPostEntry).filter((p) => {
    const labels = (p.tags || []).map((t) => normalizeTagLabel(String(t)));
    return labels.includes(target);
  });
}

export async function getAllCategories() {
  return SITE_CATEGORY_DEFS.filter((d) => !d.private).map((d) => d.slug);
}

/**
 * 헤더·404 등 — `{ slug, label }[]`
 * @returns {Promise<{ slug: string; label: string }[]>}
 */
export async function getCategoryNavItems() {
  return SITE_CATEGORY_DEFS.filter((d) => !d.private).map(({ slug, label }) => ({
    slug,
    label,
  }));
}

export async function getPostsByCategory(categoryParam) {
  const raw =
    typeof categoryParam === "string" ? categoryParam.trim() : "";
  if (!raw) return [];

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  const label = categoryLabelFromSlug(decoded);
  if (!label) return [];
  if (isPrivateCategoryLabel(label)) return [];

  const posts = await getAllPosts();
  return posts.filter((p) => normalizeCategory(p.category) === label);
}

/**
 * 카테고리별 포스트 수·가장 최근 글 제목 (날짜 내림차순 기준 첫 글).
 * @returns {Promise<{ name: string; count: number; latestPostTitle: string }[]>}
 */
export async function getCategorySummaries() {
  const posts = await getAllPosts();

  return SITE_CATEGORY_DEFS.filter((d) => !d.private).map(({ slug, label }) => {
    const list = posts.filter(
      (p) => normalizeCategory(p.category) === label,
    );
    const count = list.length;
    return {
      slug,
      name: label,
      count,
      latestPostTitle:
        count > 0 ? list[0].title : "아직 등록된 글이 없습니다.",
    };
  });
}

export { normalizeCategory } from "./category.js";

export async function getRecentPosts(limit = 6) {
  const all = await getAllPosts();
  return all.filter(isPublicPostEntry).slice(0, limit);
}

export async function getPostBySlug(slug) {
  if (!isValidSlug(slug)) {
    return null;
  }
  if (slug.startsWith("_")) {
    return null;
  }

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  let raw;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const parsed = matter(raw);
  const tags = parseTagsFromFrontmatter(parsed.data);
  const readingMinutes = estimateReadingMinutes(parsed.content);

  const title = parsed.data?.title || slug;
  const category = parsed.data?.category || "";
  const description =
    parsed.data?.description ||
    parsed.data?.excerpt ||
    firstParagraphExcerpt(parsed.content);

  const stat = await fs.stat(filePath);
  const dateValue =
    parseFrontmatterDate(parsed.data?.date) ?? stat.mtime;

  const updatedRaw = parsed.data?.updated ?? parsed.data?.modified;
  let dateModifiedValue = dateValue;
  if (updatedRaw != null && String(updatedRaw).trim() !== "") {
    const d = new Date(updatedRaw);
    if (!Number.isNaN(d.getTime())) dateModifiedValue = d;
  }

  const thumbnailUrl = await getThumbnailDisplayUrl(parsed.data?.thumbnail);

  let contentHtml = await markdownToHtml(parsed.content);
  contentHtml = await replaceMissingImagesWithPlaceholder(contentHtml);
  contentHtml = enhanceImgTags(contentHtml, title);
  contentHtml = wrapLoneImageParagraphsWithFigure(contentHtml);

  const toc = extractTOC(parsed.content);

  const midAdBeforeHeading =
    typeof parsed.data?.mid_ad_before_heading === "string"
      ? parsed.data.mid_ad_before_heading.trim()
      : "";

  const midAdOlRaw = (parsed.data?.mid_ad_ol ?? "").toString().trim().toLowerCase();
  const midAdOl =
    midAdOlRaw === "before" || midAdOlRaw === "after" ? midAdOlRaw : "";

  const rawOlIdx = parsed.data?.mid_ad_ol_index;
  const midAdOlIndex =
    rawOlIdx == null || String(rawOlIdx).trim() === ""
      ? 1
      : Math.max(1, parseInt(String(rawOlIdx), 10) || 1);

  const explicitSeoKeywords = parseSeoKeywordsFromFrontmatter(parsed.data);
  const seoTags =
    explicitSeoKeywords && explicitSeoKeywords.length > 0
      ? explicitSeoKeywords
      : buildSeoTagList({
          title,
          description,
          markdownBody: parsed.content,
          frontmatterTags: tags,
          category,
        });

  const showLeadThumbnail =
    Boolean(thumbnailUrl) &&
    !leadThumbnailDuplicatesFirstBodyImage(thumbnailUrl, contentHtml);

  return {
    slug,
    title,
    category,
    description,
    tags,
    seoTags,
    readingMinutes,
    thumbnailUrl,
    showLeadThumbnail,
    date: dateValue.toISOString(),
    dateModified: dateModifiedValue.toISOString(),
    dateLabel: formatDateLabel(dateValue),
    contentHtml,
    toc,
    midAdBeforeHeading,
    midAdOl,
    midAdOlIndex,
  };
}

export async function getAdjacentPosts(slug) {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  let prev = null;
  for (let i = idx + 1; i < all.length; i++) {
    if (isPublicPostEntry(all[i])) {
      prev = all[i];
      break;
    }
  }
  let next = null;
  for (let i = idx - 1; i >= 0; i--) {
    if (isPublicPostEntry(all[i])) {
      next = all[i];
      break;
    }
  }
  return { prev, next };
}

/**
 * 관련 포스트 추천 (최대 `limit`개, 현재 글 제외).
 * 1) 같은 카테고리 + 현재 글과 태그 1개 이상 공유
 * 2) 같은 카테고리 (태그 겹침 없음 — 1에서 못 채운 경우)
 * 3) 다른 카테고리 + 태그 1개 이상 공유
 * 각 단계 안에서는 날짜 최신순.
 *
 * @param {string} slug
 * @param {string} category
 * @param {string[]} [tags]
 * @param {number} [limit]
 */
export async function getRelatedPosts(slug, category, tags = [], limit = 3) {
  const cat = normalizeCategory(category);
  const currentTagSet = new Set(
    (tags || []).map((t) => normalizeTagLabel(String(t))).filter(Boolean),
  );

  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== slug).filter(isPublicPostEntry);

  function sameCategory(p) {
    return normalizeCategory(p.category) === cat;
  }

  function sharesTagWithCurrent(p) {
    if (currentTagSet.size === 0) return false;
    for (const t of p.tags || []) {
      const n = normalizeTagLabel(String(t));
      if (n && currentTagSet.has(n)) return true;
    }
    return false;
  }

  function sortByDateDesc(a, b) {
    return comparePostsByDateDesc(a, b);
  }

  const tier1 = others
    .filter((p) => sameCategory(p) && sharesTagWithCurrent(p))
    .sort(sortByDateDesc);
  const tier2 = others
    .filter((p) => sameCategory(p) && !sharesTagWithCurrent(p))
    .sort(sortByDateDesc);
  const tier3 = others
    .filter((p) => !sameCategory(p) && sharesTagWithCurrent(p))
    .sort(sortByDateDesc);

  const seen = new Set();
  const result = [];
  for (const tier of [tier1, tier2, tier3]) {
    for (const p of tier) {
      if (result.length >= limit) break;
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      result.push(p);
    }
    if (result.length >= limit) break;
  }

  return result;
}

