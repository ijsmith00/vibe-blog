import { SITE_CATEGORY_DEFS } from "./config.js";

const SLUG_SET = new Set(SITE_CATEGORY_DEFS.map((d) => d.slug));
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
