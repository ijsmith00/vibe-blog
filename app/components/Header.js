"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const BLOG_NAME = "일주일 완성! 바이브 코딩";

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

function categoryHref(name) {
  return `/category/${encodeURIComponent(name)}`;
}

/**
 * @param {{ categories?: string[] }} props
 */
export default function Header({ categories = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryMobileOpen, setCategoryMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const categoryMenuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-bg-main transition-shadow dark:border-dm-border dark:bg-dm-bg ${
        scrolled
          ? "shadow-sm dark:shadow-black/30"
          : "shadow-none"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 md:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          onClick={() => {
            setMobileOpen(false);
            setCategoryMobileOpen(false);
          }}
        >
          {BLOG_NAME}
        </Link>

        <nav
          className="hidden min-[769px]:flex min-[769px]:items-center min-[769px]:gap-8"
          aria-label="주요 메뉴"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] font-medium leading-snug text-text-sub transition-colors hover:text-text-main dark:text-dm-muted dark:hover:text-dm-text"
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <span
              className="inline-flex cursor-default items-center gap-1 text-[0.9375rem] font-medium leading-snug text-text-sub transition-colors group-hover:text-text-main dark:text-dm-muted dark:group-hover:text-dm-text"
              aria-haspopup="true"
              aria-expanded={undefined}
            >
              카테고리
              <span className="text-xs opacity-70" aria-hidden="true">
                ▾
              </span>
            </span>
            <div
              className="invisible absolute left-0 top-full z-50 min-w-[12rem] pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              role="presentation"
            >
              <ul
                id={categoryMenuId}
                role="menu"
                aria-label="카테고리 목록"
                className="rounded-lg border border-border bg-bg-main py-2 shadow-lg dark:border-dm-border dark:bg-dm-card"
              >
                <li role="none">
                  <Link
                    role="menuitem"
                    href="/category"
                    className="block px-4 py-2 text-sm font-medium text-text-sub transition-colors hover:bg-secondary hover:text-text-main dark:text-dm-muted dark:hover:bg-dm-bg dark:hover:text-dm-text"
                  >
                    전체 보기
                  </Link>
                </li>
                {categories.map((name) => (
                  <li key={name} role="none">
                    <Link
                      role="menuitem"
                      href={categoryHref(name)}
                      className="block px-4 py-2 text-sm font-medium text-text-sub transition-colors hover:bg-secondary hover:text-text-main dark:text-dm-muted dark:hover:bg-dm-bg dark:hover:text-dm-text"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-2xl text-text-main dark:text-dm-text min-[769px]:hidden"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          ☰
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`min-[769px]:hidden overflow-hidden bg-bg-main transition-[max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none dark:bg-dm-bg ${
          mobileOpen
            ? "max-h-[min(80vh,560px)] border-t border-border opacity-100 translate-y-0 dark:border-dm-border"
            : "max-h-0 border-t border-transparent opacity-0 -translate-y-1 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
      >
        <nav className="mx-auto flex w-full max-w-[1200px] flex-col px-4 py-2 md:px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base font-medium text-text-sub transition-colors hover:text-text-main dark:text-dm-muted dark:hover:text-dm-text"
              onClick={() => {
                setMobileOpen(false);
                setCategoryMobileOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}

          <div className="border-t border-border py-1 dark:border-dm-border">
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-text-sub dark:text-dm-muted"
              aria-expanded={categoryMobileOpen}
              aria-controls="mobile-category-list"
              onClick={() => setCategoryMobileOpen((v) => !v)}
            >
              카테고리
              <span className="text-sm opacity-70" aria-hidden="true">
                {categoryMobileOpen ? "▾" : "▸"}
              </span>
            </button>
            <div
              id="mobile-category-list"
              className={`overflow-hidden transition-[max-height] duration-300 ease-out motion-reduce:transition-none ${
                categoryMobileOpen ? "max-h-[min(40vh,320px)]" : "max-h-0"
              }`}
            >
              <ul className="flex flex-col gap-0 border-l-2 border-primary/25 pl-3 dark:border-blue-500/30">
                <li>
                  <Link
                    href="/category"
                    className="block py-2 text-sm text-text-sub hover:text-text-main dark:text-dm-muted dark:hover:text-dm-text"
                    onClick={() => {
                      setMobileOpen(false);
                      setCategoryMobileOpen(false);
                    }}
                  >
                    전체 보기
                  </Link>
                </li>
                {categories.map((name) => (
                  <li key={name}>
                    <Link
                      href={categoryHref(name)}
                      className="block py-2 text-sm text-text-sub hover:text-text-main dark:text-dm-muted dark:hover:text-dm-text"
                      onClick={() => {
                        setMobileOpen(false);
                        setCategoryMobileOpen(false);
                      }}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
