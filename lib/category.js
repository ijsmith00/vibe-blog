import { SITE_CATEGORY_DEFS } from "./config.js";

const SLUG_SET = new Set(SITE_CATEGORY_DEFS.map((d) => d.slug));

const PRIVATE_SLUG_SET = new Set(
  SITE_CATEGORY_DEFS.filter((d) => d.private === true).map((d) => d.slug),
);
const slugToLabel = Object.fromEntries(
  SITE_CATEGORY_DEFS.map((d) => [d.slug, d.label]),
);
const labelToSlug = Object.fromEntries(
  SITE_CATEGORY_DEFS.map((d) => [d.label, d.slug]),
);

export function normalizeCategory(category) {
  const t = (category || "").trim();
  return t || "미분류";
}

/** @param {string} slug URL 세그먼트(디코딩된 값) */
export function categoryLabelFromSlug(slug) {
  const s = (slug || "").trim();
  return slugToLabel[s] ?? null;
}

/** @param {string} label 글 frontmatter·표시용 라벨 */
export function categorySlugFromLabel(label) {
  const n = normalizeCategory(label);
  return labelToSlug[n] ?? null;
}

export function isKnownCategorySlug(slug) {
  return SLUG_SET.has((slug || "").trim());
}

/** 비공개 카테고리 — 네비·목록·사이트맵 등에서 제외 */
export function isPrivateCategorySlug(slug) {
  return PRIVATE_SLUG_SET.has((slug || "").trim());
}

/** 글 frontmatter `category` 라벨 기준 */
export function isPrivateCategoryLabel(label) {
  const slug = categorySlugFromLabel(label);
  if (!slug) return false;
  return isPrivateCategorySlug(slug);
}
