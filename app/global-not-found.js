import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import NotFoundContent from "@/app/components/NotFoundContent";
import JsonLd from "@/app/components/JsonLd";
import { getWebSiteJsonLd, NAVER_SITE_VERIFICATION } from "@/lib/config";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_OG_DEFAULT_ALT,
  SITE_TITLE,
  SITE_URL,
  ogImageMetadata,
} from "@/lib/site-config";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "페이지를 찾을 수 없습니다",
    template: `%s | ${SITE_TITLE}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "페이지를 찾을 수 없습니다",
    description: DEFAULT_DESCRIPTION,
    images: [ogImageMetadata(null, SITE_OG_DEFAULT_ALT)],
  },
  twitter: {
    card: "summary_large_image",
    title: "페이지를 찾을 수 없습니다",
    description: DEFAULT_DESCRIPTION,
    images: [ogImageMetadata(null, SITE_OG_DEFAULT_ALT)],
  },
};

/**
 * 존재하지 않는 URL 전역 처리 — 레이아웃을 거치지 않으므로
 * 스타일·분석·구조화 데이터는 이 파일에서, 헤더·푸터·본문은 `NotFoundContent`에서 포함합니다.
 * (experimental.globalNotFound 필요)
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="ko"
      className={`${geistMono.variable} ${notoSansKr.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* 네이버 서치어드바이저 소유 확인 — 루트 레이아웃과 동일 토큰(lib/config.js) */}
        <meta
          name="naver-site-verification"
          content={NAVER_SITE_VERIFICATION}
        />
      </head>
      <body
        className={`${notoSansKr.className} min-h-full flex flex-col bg-bg-main text-text-main transition-colors dark:bg-dm-bg dark:text-dm-text`}
      >
        <JsonLd data={getWebSiteJsonLd()} />
        <NotFoundContent />
        <Analytics />
      </body>
    </html>
  );
}
