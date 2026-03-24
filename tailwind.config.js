import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
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
          },
        },
        lg: {
          css: {
            color: "#1f2937",
            a: {
              color: "#2563eb",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            h2: {
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              borderTopColor: "#e5e7eb",
              paddingTop: "2.5rem",
              marginTop: "3rem",
              marginBottom: "1.75rem",
            },
            pre: {
              backgroundColor: "#f3f4f6",
              fontSize: "0.875em",
            },
            "pre code": {
              fontSize: "0.9em",
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
            img: {
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
            },
            figure: {
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            "figure > img": {
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              marginTop: "0",
              marginBottom: "0",
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
