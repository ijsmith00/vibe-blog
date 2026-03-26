"use client";

import { useMemo, useState } from "react";

import PostCard from "@/app/components/PostCard";
import { normalizeCategory } from "@/lib/category";

export default function PostListWithFilter({ posts }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => normalizeCategory(p.category)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [posts]);

  const [selected, setSelected] = useState("전체");

  const filtered = useMemo(() => {
    if (selected === "전체") return posts;
    return posts.filter((p) => normalizeCategory(p.category) === selected);
  }, [posts, selected]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="카테고리 필터"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selected === "전체"}
            onClick={() => setSelected("전체")}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              selected === "전체"
                ? "border-primary bg-primary text-white"
                : "border-border bg-bg-main text-text-sub hover:border-primary/40 hover:text-text-main dark:border-dm-border dark:bg-dm-card dark:text-dm-muted dark:hover:border-primary/50 dark:hover:text-dm-text"
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected === cat}
              onClick={() => setSelected(cat)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                selected === cat
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-bg-main text-text-sub hover:border-primary/40 hover:text-text-main dark:border-dm-border dark:bg-dm-card dark:text-dm-muted dark:hover:border-primary/50 dark:hover:text-dm-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-sm text-text-sub dark:text-dm-muted sm:text-right">
          {filtered.length}개 글
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border bg-bg-sub px-6 py-12 text-center text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted sm:mt-10">
          선택한 카테고리에 해당하는 글이 없습니다
        </p>
      ) : (
        <div className="mt-8 grid w-full min-w-0 grid-cols-1 justify-items-stretch gap-x-6 gap-y-8 sm:gap-x-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {filtered.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </>
  );
}
