import Link from "next/link";

/**
 * @param {Object} props
 * @param {{ label: string; href?: string | null }[]} props.items
 * @param {string} [props.separator]
 * @param {number} [props.maxLastLength] 마지막(현재) 항목만 이 길이를 넘으면 … 처리. 0이면 생략 안 함.
 */
export default function Breadcrumb({
  items,
  separator = "/",
  maxLastLength = 30,
}) {
  if (!items?.length) return null;

  const last = items.length - 1;

  function truncate(text, max) {
    if (!max || !text || text.length <= max) return text;
    return `${text.slice(0, max)}…`;
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-4 text-xs text-text-sub dark:text-dm-muted"
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === last;
          const label =
            isLast && maxLastLength > 0
              ? truncate(item.label, maxLastLength)
              : item.label;
          const showTitle =
            isLast &&
            maxLastLength > 0 &&
            item.label.length > maxLastLength;

          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span
                  className="text-border select-none dark:text-dm-border"
                  aria-hidden
                >
                  {separator}
                </span>
              ) : null}
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="text-text-sub transition hover:text-text-main hover:underline dark:text-dm-muted dark:hover:text-dm-text"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-text-sub dark:text-dm-muted" : ""}
                  aria-current={isLast ? "page" : undefined}
                  title={showTitle ? item.label : undefined}
                >
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
