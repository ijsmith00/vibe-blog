import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import NotFoundContent from "@/app/components/NotFoundContent";
import JsonLd from "@/app/components/JsonLd";
import {
  getWebSiteJsonLd,
  GOOGLE_SITE_VERIFICATION,
} from "@/lib/config";
import { SITE_NAME } from "@/lib/site-config";

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
  title: "페이지를 찾을 수 없습니다",
  description: `${SITE_NAME}에서 요청하신 페이지를 찾을 수 없습니다.`,
  robots: {
    index: false,
    follow: true,
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
        <meta
          name="google-site-verification"
          content={GOOGLE_SITE_VERIFICATION}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
