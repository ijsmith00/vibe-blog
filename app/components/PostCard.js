import Image from "next/image";
import Link from "next/link";

import PostTitle from "@/app/components/PostTitle";
import { stripMarkdownBold } from "@/lib/post-title";
import { postDetailPath } from "@/lib/site-config";

/** @param {string} src */
function isNonOptimizableImageSrc(src) {
  return (
    typeof src === "string" &&
    (src.startsWith("data:") || src.startsWith("blob:"))
  );
}

/**
 * @param {Object} props
 * @param {{ slug: string; title: string; description: string; dateLabel: string; cardThumbnail?: string | null }} props.post
 * @param {boolean} [props.priority] LCP — 메인 첫 카드 등에만 true
 */
export default function PostCard({ post, priority = false }) {
  const { slug, title, description, dateLabel, cardThumbnail } = post;

  const titlePlain = stripMarkdownBold(title);

  const sizes =
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <Link
      href={postDetailPath(slug)}
      className="group block h-full w-full max-w-full min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-main shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-dm-border dark:bg-dm-card dark:hover:shadow-black/40">
        <div className="relative aspect-[16/10] w-full min-h-[140px] shrink-0 overflow-hidden bg-secondary dark:bg-dm-bg">
          {cardThumbnail ? (
            isNonOptimizableImageSrc(cardThumbnail) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cardThumbnail}
                alt={titlePlain}
                width={640}
                height={400}
                className="h-full w-full object-cover"
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
              />
            ) : (
              <Image
                src={cardThumbnail}
                alt={titlePlain}
                fill
                sizes={sizes}
                className="object-cover"
                priority={priority}
              />
            )
          ) : (
            <div className="h-full min-h-[140px] w-full bg-gradient-to-br from-primary/15 via-secondary to-primary/10 dark:from-primary/20 dark:via-dm-card dark:to-primary/15" />
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-text-main group-hover:text-primary dark:text-dm-text dark:group-hover:text-blue-400">
            <PostTitle title={title} />
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
