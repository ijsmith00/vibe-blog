import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import ScrollToTop from "./components/ScrollToTop";
import { getWebSiteJsonLd, NAVER_SITE_VERIFICATION } from "@/lib/config";
import {
  DEFAULT_DESCRIPTION,
  SITE_KEYWORDS,
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
  adjustFontFallback: true,
});

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_TITLE}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: SITE_KEYWORDS,
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
      index: true,
      follow: true,
    },
    // 소유 확인용 meta는 아래 `<head>`에 직접 둠(네이버 크롤러 호환·head 앞쪽 배치). 토큰은 lib/config.js.
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [ogImageMetadata(null, SITE_OG_DEFAULT_ALT)],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [ogImageMetadata(null, SITE_OG_DEFAULT_ALT)],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const adsenseId =
  typeof process.env.NEXT_PUBLIC_ADSENSE_ID === "string"
    ? process.env.NEXT_PUBLIC_ADSENSE_ID.trim()
    : "";
const adsenseScriptSrc =
  adsenseId !== ""
    ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseId)}`
    : null;

const gaId =
  typeof process.env.NEXT_PUBLIC_GA_ID === "string"
    ? process.env.NEXT_PUBLIC_GA_ID.trim()
    : "";

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistMono.variable} ${notoSansKr.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* 네이버 서치어드바이저 소유 확인(HTML 태그) — head 안 앞쪽, 토큰은 lib/config.js */}
        <meta
          name="naver-site-verification"
          content={NAVER_SITE_VERIFICATION}
        />
        {adsenseId ? (
          <meta name="google-adsense-account" content={adsenseId} />
        ) : null}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var k='vibe-theme';var t=localStorage.getItem(k);var d=document.documentElement;if(t==='dark')d.classList.add('dark');else if(t==='light')d.classList.remove('dark');else if(typeof matchMedia!=='undefined'&&matchMedia('(prefers-color-scheme: dark)').matches)d.classList.add('dark')}catch(e){}})()`}
        </Script>
        {adsenseScriptSrc ? (
          // 애드센스 크롤러는 JS 실행 전 HTML 소스의 script 태그를 확인함 — next/script 대신 직접 삽입
          <script
            async
            src={adsenseScriptSrc}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body
        className={`${notoSansKr.className} min-h-full flex flex-col bg-bg-main text-text-main transition-colors dark:bg-dm-bg dark:text-dm-text`}
      >
        <JsonLd data={getWebSiteJsonLd()} />
        {children}
        <ScrollToTop />
        <Analytics />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
