export function normalizeCategory(category) {
  const t = (category || "").trim();
  return t || "미분류";
}
