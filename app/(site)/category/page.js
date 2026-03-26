import Link from "next/link";

import { getCategorySummaries } from "@/lib/posts";

const SITE_NAME = "일주일 완성! 바이브 코딩";

export const metadata = {
  title: `카테고리 | ${SITE_NAME}`,
  description: `주제별로 글을 모아 볼 수 있는 카테고리 목록 — ${SITE_NAME}`,
};

function categoryHref(name) {
  return `/category/${encodeURIComponent(name)}`;
}

export default async function CategoriesIndexPage() {
  const summaries = await getCategorySummaries();

  return (
    <div className="pb-16 pt-10">
      <header className="mb-8 sm:mb-10">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline dark:text-blue-400"
        >
          ← 홈
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-4xl md:text-5xl">
          카테고리
        </h1>
        <p className="mt-3 max-w-2xl text-base text-text-sub dark:text-dm-muted">
          주제별로 글을 모아서 볼 수 있어요.
        </p>
      </header>

      {summaries.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-bg-sub px-6 py-14 text-center text-base text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
          아직 등록된 카테고리가 없습니다.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {summaries.map((item) => (
            <li key={item.name}>
              <Link
                href={categoryHref(item.name)}
                className="group block h-full rounded-xl border border-border bg-bg-main p-6 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-dm-border dark:bg-dm-card dark:hover:border-primary/50 dark:hover:shadow-black/40"
              >
                <h2 className="text-xl font-bold leading-snug text-text-main group-hover:text-primary dark:text-dm-text dark:group-hover:text-blue-400">
                  {item.name}{" "}
                  <span className="font-semibold tabular-nums text-text-sub dark:text-dm-muted">
                    ({item.count})
                  </span>
                </h2>
                <div className="mt-6 border-t border-border pt-4 dark:border-dm-border">
                  <p className="text-xs font-medium text-text-sub dark:text-dm-muted">
                    최신 글
                  </p>
                  <p className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-text-main dark:text-dm-text">
                    {item.latestPostTitle}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
