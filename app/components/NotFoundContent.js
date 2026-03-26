import Link from "next/link";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllCategories } from "@/lib/posts";

/**
 * 404 전체 화면 — 헤더·푸터 포함 (`not-found`는 루트 레이아웃만 타므로 여기서 크롬 제공)
 */
export default async function NotFoundContent() {
  const categories = await getAllCategories();

  return (
    <>
      <Header categories={categories} />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col page-gutter">
          <section
            className="flex flex-1 flex-col items-center justify-center px-1 py-12 sm:px-4 sm:py-16 md:py-20"
            aria-labelledby="not-found-heading"
          >
            <div className="mx-auto w-full max-w-lg text-center">
              <p
                className="select-none text-5xl leading-none sm:text-6xl"
                aria-hidden="true"
              >
                <span className="inline-block transition-transform duration-300 hover:scale-110">
                  🧭
                </span>
                <span className="ml-1 inline-block text-4xl sm:text-5xl">✨</span>
              </p>

              <div
                className="mx-auto mt-6 flex max-w-[14rem] items-center justify-center sm:mt-8 sm:max-w-[16rem]"
                aria-hidden="true"
              >
                <div className="relative w-full rounded-3xl bg-gradient-to-br from-secondary/90 to-white p-6 shadow-md ring-1 ring-border/50 dark:from-dm-card dark:to-dm-bg dark:ring-dm-border sm:p-8">
                  <svg
                    className="mx-auto h-24 w-24 text-primary/85 dark:text-blue-400 sm:h-28 sm:w-28"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="opacity-90"
                    />
                    <path
                      d="M38 52c0-6 6-10 12-8s10 10 8 16-10 10-16 8-10-10-8-16z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M72 52c0-6 6-10 12-8s10 10 8 16-10 10-16 8-10-10-8-16z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M48 78c8 10 24 10 32 0"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <h1
                id="not-found-heading"
                className="mt-8 text-xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:mt-10 sm:text-2xl md:text-3xl"
              >
                <span className="text-primary dark:text-blue-400">404</span>
                <span className="mx-2 text-text-sub/80 dark:text-dm-muted">—</span>
                <span>페이지를 찾을 수 없습니다</span>
              </h1>

              <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-lg">
                앗, 여긴 아직 지도에 없는 길 같아요. 링크가 바뀌었거나, 주소를
                살짝 잘못 적었을 수도 있어요. 괜찮아요—홈에서 다시 가볍게
                출발해 볼까요?
              </p>

              <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto sm:min-w-[11rem]"
                >
                  홈으로 돌아가기
                </Link>
                <Link
                  href="/#latest-posts"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border-2 border-border bg-bg-main px-6 py-3 text-center text-sm font-semibold text-text-main transition hover:border-primary/40 hover:bg-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-dm-border dark:bg-dm-card dark:text-dm-text dark:hover:border-blue-500/50 dark:hover:bg-dm-bg sm:w-auto sm:min-w-[11rem]"
                >
                  최신 글 보기
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
