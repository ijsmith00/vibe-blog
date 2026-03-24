import Link from "next/link";
import { notFound } from "next/navigation";

import PostCard from "@/app/components/PostCard";
import TableOfContents from "@/app/components/TableOfContents";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "일주일 완성! 바이브 코딩",
    };
  }
  return {
    title: `${post.title} | 일주일 완성! 바이브 코딩`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(slug);
  const related = await getRelatedPosts(slug, post.category, 3);

  const categoryLabel = post.category.trim() || "미분류";

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 md:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_3fr] lg:items-start lg:gap-12">
        <main className="min-w-0">
          <div className="mx-auto w-full max-w-[720px]">
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/"
                className="font-medium text-primary hover:underline dark:text-blue-400"
              >
                ← 홈
              </Link>
              <span className="text-border dark:text-dm-border">/</span>
              <span className="text-text-sub dark:text-dm-muted">포스트</span>
            </div>

            <header className="mt-6">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950/60 dark:text-blue-200">
                {categoryLabel}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-4xl md:text-[2.5rem] md:leading-tight">
                {post.title}
              </h1>
              <p className="mt-3 text-sm font-medium text-text-sub dark:text-dm-muted">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span className="mx-2 text-border dark:text-dm-border">·</span>
                <span>약 {post.readingMinutes}분 읽기</span>
              </p>
            </header>

            {post.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.thumbnailUrl}
                alt=""
                className="mt-8 w-full rounded-xl border border-border object-cover dark:border-dm-border"
                loading="lazy"
              />
            ) : null}

            <article
              className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:scroll-mt-28"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {post.tags.length > 0 ? (
              <ul className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <li key={`${tag}-${i}`}>
                    <Link
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-text-sub transition hover:bg-primary/15 hover:text-primary dark:bg-dm-card dark:text-dm-muted dark:hover:bg-primary/20 dark:hover:text-blue-400"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <nav
              className="mt-12 flex flex-col gap-4 border-t border-border pt-10 dark:border-dm-border sm:flex-row sm:justify-between"
              aria-label="이전·다음 글"
            >
              {prev ? (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="group flex max-w-[min(100%,20rem)] flex-col rounded-xl border border-border bg-bg-main p-4 transition hover:border-primary hover:bg-secondary/60 dark:border-dm-border dark:bg-dm-card dark:hover:border-blue-500/50"
                >
                  <span className="text-xs font-medium text-text-sub dark:text-dm-muted">
                    이전 글
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm font-semibold text-text-main group-hover:text-primary dark:text-dm-text dark:group-hover:text-blue-400">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/posts/${next.slug}`}
                  className="group ml-auto flex max-w-[min(100%,20rem)] flex-col rounded-xl border border-border bg-bg-main p-4 text-right transition hover:border-primary hover:bg-secondary/60 dark:border-dm-border dark:bg-dm-card dark:hover:border-blue-500/50 sm:text-right"
                >
                  <span className="text-xs font-medium text-text-sub dark:text-dm-muted">
                    다음 글
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm font-semibold text-text-main group-hover:text-primary dark:text-dm-text dark:group-hover:text-blue-400">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>

            {related.length > 0 ? (
              <section className="mt-14" aria-labelledby="related-posts-heading">
                <h2
                  id="related-posts-heading"
                  className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text"
                >
                  관련 글
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </main>

        <aside className="hidden min-w-0 lg:block">
          <div className="sticky top-24 space-y-6">
            <TableOfContents items={post.toc} />
            <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-border bg-secondary text-sm font-medium text-text-sub dark:border-dm-border dark:bg-dm-card dark:text-dm-muted">
              광고 영역
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
