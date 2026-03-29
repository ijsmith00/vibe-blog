import Link from "next/link";

import { SITE_NAME } from "@/lib/site-config";

const FOOTER_TAGLINE =
  "바이브 코딩으로 블로그 제작·다양한 실험 노하우를 모두와 나눕니다.";

const FOOTER_LINKS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/category", label: "카테고리" },
  { href: "/contact", label: "문의" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-sub text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
      <div className="mx-auto w-full max-w-[1200px] page-gutter py-12">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="flex items-center justify-center gap-2.5 text-lg font-semibold text-text-main md:justify-start">
            <img
              src="/favicon.svg"
              alt=""
              width={22}
              height={22}
              className="h-5 w-5 shrink-0 opacity-80 dark:opacity-90"
              aria-hidden
            />
            <span>{SITE_NAME}</span>
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-sub dark:text-dm-muted">
            {FOOTER_TAGLINE}
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

          <p className="mt-10 w-full text-center text-xs text-text-sub dark:text-dm-muted">
            Copyright © 2026 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
