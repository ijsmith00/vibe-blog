import Link from "next/link";

import { getAllTags } from "@/lib/posts";

const SITE_NAME = "일주일 완성! 바이브 코딩";

export const metadata = {
  title: `태그 | ${SITE_NAME}`,
  description: `태그별로 글을 찾아볼 수 있는 태그 클라우드 — ${SITE_NAME}`,
};

function tagHref(name) {
  return `/tag/${encodeURIComponent(name)}`;
}

function fontSizeRem(count, minC, maxC) {
  const minSize = 0.875;
  const maxSize = 2.125;
  if (minC === maxC) return (minSize + maxSize) / 2;
  return minSize + ((count - minC) / (maxC - minC)) * (maxSize - minSize);
}

export default async function TagsIndexPage() {
  const tags = await getAllTags();
  const counts = tags.map((t) => t.count);
  const minC = counts.length ? Math.min(...counts) : 0;
  const maxC = counts.length ? Math.max(...counts) : 0;

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
          태그
        </h1>
        <p className="mt-3 max-w-2xl text-base text-text-sub dark:text-dm-muted">
          사용 빈도에 따라 크기가 달라요. 태그를 눌러 관련 글을 모아 볼 수 있어요.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-bg-sub px-6 py-14 text-center text-base text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
          아직 등록된 태그가 없습니다.
        </p>
      ) : (
        <div
          className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-5 px-1"
          role="list"
          aria-label="태그 클라우드"
        >
          {tags.map((item) => (
            <Link
              key={item.name}
              href={tagHref(item.name)}
              role="listitem"
              className="inline-block font-semibold text-primary underline-offset-4 transition hover:text-[#1d4ed8] hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              style={{
                fontSize: `${fontSizeRem(item.count, minC, maxC)}rem`,
              }}
            >
              {item.name}
              <span className="ml-1 align-super text-xs font-medium tabular-nums text-text-sub dark:text-dm-muted">
                {item.count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
