import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import {
  getWebSiteJsonLd,
  GOOGLE_SITE_VERIFICATION,
  NAVER_SITE_VERIFICATION,
} from "@/lib/config";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
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
  adjustFontFallback: true,
});

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    robots: {
      index: true,
      follow: true,
    },
    // Google / 네이버 서치어드바이저 소유 확인 — 실제 `<head>` 메타는 아래 `verification`에서 생성됨(토큰은 `lib/config.js`).
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
      other: {
        "naver-site-verification": NAVER_SITE_VERIFICATION,
      },
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [ogImageMetadata(null, SITE_NAME)],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [ogImageMetadata(null, SITE_NAME)],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistMono.variable} ${notoSansKr.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${notoSansKr.className} min-h-full flex flex-col bg-bg-main text-text-main transition-colors dark:bg-dm-bg dark:text-dm-text`}
      >
        <JsonLd data={getWebSiteJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
