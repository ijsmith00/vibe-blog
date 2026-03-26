"use client";

import { useEffect, useState } from "react";

/**
 * 초기 HTML에 이메일 주소를 넣지 않고, 클라이언트에서만 조립해 표시합니다.
 * @param {{ localPart: string; domain: string; className?: string }} props
 */
export default function MaskedEmailLink({ localPart, domain, className = "" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <span
        className={`inline-block min-h-[1.25rem] text-text-sub dark:text-dm-muted ${className}`}
        aria-hidden
      >
        …
      </span>
    );
  }

  const address = `${localPart}@${domain}`;
  const href = `mailto:${address}`;

  return (
    <a
      href={href}
      className={`font-medium text-primary underline decoration-1 underline-offset-2 transition hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 ${className}`}
    >
      {address}
    </a>
  );
}
