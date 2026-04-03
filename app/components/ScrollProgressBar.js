"use client";

import { useEffect, useState } from "react";

function getScrollPercent() {
  const el = document.documentElement;
  const scrollable = el.scrollHeight - el.clientHeight;
  if (scrollable <= 0) return 0;
  return Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
}

export default function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => setPct(getScrollPercent());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none flex h-[3px] w-full shrink-0 overflow-hidden bg-bg-main dark:bg-dm-bg"
      aria-hidden
    >
      <div
        className="h-full bg-primary dark:bg-blue-600"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
