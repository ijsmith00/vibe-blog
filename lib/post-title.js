/**
 * 글 제목에 쓰인 `**강조**` 마크다운을 메타·스키마용으로 제거한다.
 * @param {string | null | undefined} title
 */
export function stripMarkdownBold(title) {
  return String(title ?? "").replace(/\*\*([^*]+)\*\*/g, "$1");
}
