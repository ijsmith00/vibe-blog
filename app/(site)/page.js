import EmptyPostsState from "@/app/components/EmptyPostsState";
import PostListWithFilter from "@/app/components/PostListWithFilter";
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

  return (
    <div className="flex w-full flex-col gap-16 md:gap-20 lg:gap-24">
      <section
        className="mx-auto w-full rounded-2xl bg-gradient-to-b from-white to-secondary px-5 py-16 text-center dark:from-dm-bg dark:to-dm-card sm:px-7 md:px-10 md:py-24"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="text-balance text-2xl font-extrabold leading-snug tracking-tight text-text-main dark:text-dm-text sm:text-3xl md:text-4xl md:leading-tight"
        >
          {SITE_NAME}
        </h1>
        <div className="mx-auto mt-6 max-w-xl sm:mt-8 sm:max-w-2xl md:mt-10">
          <p
            className="text-balance [word-break:keep-all] text-lg font-semibold leading-relaxed text-gray-800 dark:text-gray-200 sm:text-xl md:text-2xl md:leading-snug"
          >
            미국 시골 라이프와 AI 코딩에 관해 이야기합니다.
          </p>
          <p className="mt-5 text-pretty text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:mt-6 sm:text-lg">
            아이다호의 숲과 AI 코드 사이, 그 어딘가의 기록.
          </p>
        </div>
      </section>

      <section
        id="latest-posts"
        className="mx-auto w-full scroll-mt-24 pb-16 md:pb-20 lg:pb-24 sm:scroll-mt-28"
      >
        <h2 className="text-xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-2xl md:text-3xl">
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
