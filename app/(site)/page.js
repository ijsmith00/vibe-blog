import EmptyPostsState from "@/app/components/EmptyPostsState";
import PostListWithFilter from "@/app/components/PostListWithFilter";
import { SITE_NAME, absolutePageUrl } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export async function generateMetadata() {
  return {
    alternates: {
      canonical: absolutePageUrl("/"),
    },
  };
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="flex w-full flex-col gap-16 md:gap-20 lg:gap-24">
      <section
        className="mx-auto w-full rounded-2xl bg-gradient-to-b from-white to-secondary px-5 py-16 text-center dark:from-dm-bg dark:to-dm-card sm:px-7 md:px-10 md:py-20 lg:py-24"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="text-3xl font-extrabold leading-tight tracking-tight text-text-main dark:text-dm-text sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {SITE_NAME}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-sub dark:text-dm-muted sm:mt-5 sm:text-lg md:text-xl">
          꺾이지 않는 마음과 복/붙 기술만 있다면 누구나 나만의 웹사이트를 만들 수 있어요!
        </p>
        <a
          href="/category/vibe-coding-blog"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#1d4ed8] px-5 py-3 text-sm font-bold text-white shadow-md ring-2 ring-white/40 transition hover:bg-[#1e3a8a] hover:ring-white/60 sm:mt-10 sm:px-8 sm:py-3.5 sm:text-base md:text-lg"
        >
          바로 시작하기!
        </a>
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
