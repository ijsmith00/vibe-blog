import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./posts/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#eff6ff",
        "text-main": "#111827",
        "text-sub": "#6b7280",
        "bg-main": "#ffffff",
        "bg-sub": "#f9fafb",
        border: "#e5e7eb",
        /* 시스템 다크모드 (dark: 접두어와 함께 사용) */
        "dm-bg": "#111827",
        "dm-card": "#1f2937",
        "dm-text": "#f9fafb",
        "dm-border": "#374151",
        "dm-muted": "#9ca3af",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1f2937",
            "--tw-prose-headings": "#111827",
            "--tw-prose-bold": "#111827",
            maxWidth: "none",
            /* typography 기본: 인라인 code 앞뒤에 백틱 문자(::before/after) — 제거 */
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
        lg: {
          css: {
            /* typography 기본은 quote-borders가 slate(회색). 인용 왼쪽 강조선은 primary 블루 유지 */
            "--tw-prose-quote-borders": "#2563eb",
            "--tw-prose-invert-quote-borders": "#60a5fa",
            /* prose-invert 기본 invert-quotes는 밝은색 — 밝은 배경(#eff6ff)과 겹치면 묻힘. globals에서 다크 인용 박스 보정과 함께 사용 */
            "--tw-prose-invert-quotes": "#e5e7eb",
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            color: "#1f2937",
            a: {
              color: "#2563eb",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            h2: {
              /* 상단 실선은 마크다운 `---`(hr)로만 두고, h2 테두리와 겹치면 이중선처럼 보임 */
              paddingTop: "2.5rem",
              marginTop: "3rem",
              marginBottom: "1.75rem",
            },
            pre: {
              /* globals.css에서 .prose pre로 통일 (대비·모노스페이스) */
              backgroundColor: "transparent",
              fontSize: "inherit",
            },
            "pre code": {
              fontSize: "inherit",
            },
            blockquote: {
              borderLeftWidth: "4px",
              borderLeftColor: "#2563eb",
              borderLeftStyle: "solid",
              backgroundColor: "#eff6ff",
              fontStyle: "normal",
              color: "#1f2937",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingInlineStart: "1rem",
              borderRadius: "0.375rem",
            },
            /* 본문 이미지: 파일 원래 픽셀 너비(최대 본문 너비까지). width:100%는 작은 스크린샷이 늘어남 */
            img: {
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            },
            figure: {
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            "figure > img": {
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              marginTop: "0",
              marginBottom: "0",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            },
            figcaption: {
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              color: "#6b7280",
              textAlign: "center",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
