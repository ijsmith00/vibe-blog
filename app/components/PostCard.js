import Link from "next/link";

/**
 * @param {Object} props
 * @param {{ slug: string; title: string; description: string; dateLabel: string; category?: string; cardThumbnail?: string | null }} props.post
 */
export default function PostCard({ post }) {
  const {
    slug,
    title,
    description,
    dateLabel,
    category = "",
    cardThumbnail,
  } = post;

  const categoryLabel = category.trim() || "미분류";

  return (
    <Link
      href={`/posts/${slug}`}
      className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-main shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-dm-border dark:bg-dm-card dark:hover:shadow-black/40">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-secondary dark:bg-dm-bg">
          {cardThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardThumbnail}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[140px] w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary to-primary/10 px-4 text-center dark:from-primary/25 dark:via-dm-card dark:to-primary/15">
              <span className="line-clamp-2 text-base font-semibold text-primary dark:text-blue-400 sm:text-lg">
                {categoryLabel}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className="inline-flex w-fit max-w-full shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {categoryLabel}
          </span>

          <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-text-main group-hover:text-primary dark:text-dm-text dark:group-hover:text-blue-400">
            {title}
          </h2>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
            {description}
          </p>

          <time
            dateTime={post.date}
            className="mt-4 text-xs font-medium text-text-sub dark:text-dm-muted"
          >
            {dateLabel}
          </time>
        </div>
      </article>
    </Link>
  );
}
