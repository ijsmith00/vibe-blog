"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * @param {{ items: Array<{ id: string; text: string }> }} props
 */
export default function TableOfContents({ items }) {
  const list = useMemo(() => items || [], [items]);
  const ids = useMemo(() => list.map((e) => e.id), [list]);

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (ids.length <= 1) return undefined;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el instanceof HTMLElement);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-88px 0px -58% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [ids]);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  if (!list.length || list.length <= 1) {
    return null;
  }

  const linkClass = (id) =>
    [
      "block w-full rounded-r py-1.5 pl-2 text-left text-sm transition-colors",
      activeId === id
        ? "border-l-2 border-primary font-medium text-primary dark:border-blue-400 dark:text-blue-400"
        : "border-l-2 border-transparent text-text-sub hover:text-text-main dark:text-dm-muted dark:hover:text-dm-text",
    ].join(" ");

  return (
    <nav
      className="max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-contain rounded-lg border border-border bg-bg-main/95 py-4 pl-1 pr-2 shadow-sm backdrop-blur-sm dark:border-dm-border dark:bg-dm-card/95"
      aria-label="본문 목차"
    >
      <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-wide text-text-main dark:text-dm-text">
        목차
      </h2>
      <ul className="space-y-0.5">
        {list.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={linkClass(item.id)}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
