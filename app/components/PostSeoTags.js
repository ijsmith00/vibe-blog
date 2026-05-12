/**
 * 자동 추출 SEO 키워드(태그) — 링크 없이 본문 하단에 표시
 * @param {{ tags: string[] }} props
 */
export default function PostSeoTags({ tags }) {
  const list = Array.isArray(tags) ? tags.filter(Boolean) : [];
  if (!list.length) return null;

  return (
    <section className="mt-10" aria-label="이 글의 키워드">
      <h2 className="text-sm font-bold uppercase tracking-wide text-text-sub dark:text-dm-muted">
        키워드
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {list.map((tag) => (
          <li key={tag}>
            <span className="inline-block max-w-full truncate rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-text-main dark:border-dm-border dark:bg-dm-card/80 dark:text-dm-text">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
