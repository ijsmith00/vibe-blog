import Link from "next/link";
import { notFound } from "next/navigation";

import PostCard from "@/app/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

const SITE_NAME = "일주일 완성! 바이브 코딩";

function tagFromParam(raw) {
  if (typeof raw !== "string" || raw.trim() === "") return "";
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return String(raw).trim();
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ name }) => ({ tag: name }));
}

export async function generateMetadata({ params }) {
  const { tag: tagParam } = await params;
  const label = tagFromParam(tagParam);
  const tags = await getAllTags();
  const exists = tags.some((t) => t.name === label);
  if (!label || !exists) {
    return { title: SITE_NAME };
  }
  return {
    title: `${label} | ${SITE_NAME}`,
    description: `「${label}」 태그가 달린 글 목록 — ${SITE_NAME}`,
  };
}

export default async function TagPostsPage({ params }) {
  const { tag: tagParam } = await params;
  const label = tagFromParam(tagParam);
  const tags = await getAllTags();
  const exists = tags.some((t) => t.name === label);

  if (!label || !exists) {
    notFound();
  }

  const posts = await getPostsByTag(tagParam);
  const count = posts.length;
  const countForLabel = tags.find((t) => t.name === label)?.count ?? count;

  return (
    <div className="pb-16 pt-10">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <Link
            href="/"
            className="font-medium text-primary hover:underline dark:text-blue-400"
          >
            ← 홈
          </Link>
          <span className="text-border dark:text-dm-border">/</span>
          <Link
            href="/tag"
            className="font-medium text-primary hover:underline dark:text-blue-400"
          >
            태그
          </Link>
        </div>
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-4xl md:text-5xl">
            #{label}{" "}
            <span className="text-2xl font-bold text-text-sub dark:text-dm-muted sm:text-3xl md:text-4xl">
              ({countForLabel})
            </span>
          </h1>
        </header>
      </div>

      {count === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-bg-sub px-6 py-14 text-center text-base text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
          아직 작성된 글이 없습니다
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
