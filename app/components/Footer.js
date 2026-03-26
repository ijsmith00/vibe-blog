import Link from "next/link";

import { SITE_CATEGORIES } from "@/lib/site-config";

const BLOG_NAME = "일주일 완성! 바이브 코딩";
const INTRO =
  "일주일 만에 바이브 코딩으로 수익형 블로그를 만들어요!";

const FOOTER_LINKS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
  { href: "/category", label: "카테고리" },
  { href: "/privacy", label: "개인정보처리방침" },
];

function categoryHref(name) {
  return `/category/${encodeURIComponent(name)}`;
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-sub text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
      <div className="mx-auto w-full max-w-[1200px] page-gutter py-12">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-lg font-semibold text-text-main">{BLOG_NAME}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-sub dark:text-dm-muted">
            {INTRO}
          </p>

          <nav
            className="mt-8 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3"
            aria-label="푸터 링크"
          >
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-sub transition-colors hover:text-text-main dark:text-dm-muted dark:hover:text-dm-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start"
            aria-label="카테고리"
          >
            {SITE_CATEGORIES.map((name) => (
              <Link
                key={name}
                href={categoryHref(name)}
                className="text-xs font-medium text-text-sub transition-colors hover:text-primary dark:text-dm-muted dark:hover:text-blue-400 sm:text-sm"
              >
                {name}
              </Link>
            ))}
          </nav>

          <p className="mt-10 w-full text-center text-xs text-text-sub dark:text-dm-muted md:text-left">
            Copyright © 2026 {BLOG_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
