import { SITE_URL } from "@/lib/site-config";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  const base = SITE_URL.replace(/\/$/, "");

  return {
    rules: [
      // 네이버 크롤러(Yeti) — 서치어드바이저 안내 예시와 동일
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
