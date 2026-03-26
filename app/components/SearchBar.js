"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * @param {Object} props
 * @param {string} [props.defaultValue]
 * @param {string} [props.className]
 * @param {() => void} [props.onNavigate] 검색 후 호출 (예: 헤더 검색창 닫기)
 */
export default function SearchBar({
  defaultValue = "",
  className = "",
  onNavigate,
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    const url = q
      ? `/search?q=${encodeURIComponent(q)}`
      : "/search";
    router.push(url);
    onNavigate?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 ${className}`}
      role="search"
      aria-label="블로그 글 검색"
    >
      <label htmlFor="blog-search-input" className="sr-only">
        검색어
      </label>
      <input
        id="blog-search-input"
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="제목, 설명, 카테고리, 태그 검색…"
        autoComplete="off"
        className="min-h-11 w-full flex-1 rounded-lg border border-border bg-bg-main px-3 py-2 text-sm text-text-main placeholder:text-text-sub/80 outline-none ring-primary/30 focus:border-primary focus:ring-2 dark:border-dm-border dark:bg-dm-card dark:text-dm-text dark:placeholder:text-dm-muted"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        검색
      </button>
    </form>
  );
}
