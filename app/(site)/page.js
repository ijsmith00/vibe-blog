import Link from "next/link";

import EmptyPostsState from "@/app/components/EmptyPostsState";
import PostListWithFilter from "@/app/components/PostListWithFilter";
import { SITE_CATEGORY_DEFS } from "@/lib/config";
import { SITE_NAME, absolutePageUrl } from "@/lib/site-config";
import { getPublicPosts } from "@/lib/posts";

export async function generateMetadata() {
  return {
    alternates: {
      canonical: absolutePageUrl("/"),
    },
  };
}

export default async function Home() {
  const posts = await getPublicPosts();
  const publicCategories = SITE_CATEGORY_DEFS.filter((c) => !c.private);

  return (
    <div className="flex w-full flex-col gap-16 md:gap-20 lg:gap-24">
      <section
        className="mx-auto w-full rounded-2xl bg-gradient-to-b from-white to-secondary px-5 py-16 text-center dark:from-dm-bg dark:to-dm-card sm:px-7 md:px-10 md:py-24"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="text-4xl font-extrabold leading-tight tracking-tight text-text-main dark:text-dm-text md:text-5xl"
        >
          {SITE_NAME}
        </h1>
        <div className="mx-auto mt-8 max-w-2xl md:mt-10">
          <p
            className="text-balance [word-break:keep-all] text-xl font-semibold leading-[1.6] text-gray-800 dark:text-gray-200 md:text-2xl lg:text-3xl"
          >
            코딩 몰라도 괜찮아요.
            <br />
            {`꺾이지 않는 마음과 복/붙 기술만 있다면, `}
            <br className="hidden md:block" />
            AI와 함께 나만의 웹사이트를 만들 수 있어요.
          </p>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:text-base">
            바이브 코딩 개념부터 실전 배포까지, 비개발자를 위한 단계별 가이드
          </p>
        </div>
        <div
          className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3 md:mt-10 sm:flex-row sm:justify-center sm:gap-4"
          role="navigation"
          aria-label="카테고리로 이동"
        >
          {publicCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${encodeURIComponent(cat.slug)}`}
              className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-xl bg-[#1d4ed8] px-4 py-3 text-center text-sm font-bold leading-snug text-white shadow-md ring-2 ring-white/40 transition hover:bg-[#1e3a8a] hover:ring-white/60 sm:min-w-0 sm:px-5 sm:py-3.5 sm:text-base"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section
        id="latest-posts"
        className="mx-auto w-full scroll-mt-24 pb-16 md:pb-20 lg:pb-24 sm:scroll-mt-28"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl md:text-4xl">
          최신 글
        </h2>

        {posts.length === 0 ? (
          <EmptyPostsState />
        ) : (
          <PostListWithFilter posts={posts} />
        )}
      </section>
    </div>
  );
}
