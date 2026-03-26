import { SITE_URL } from "@/lib/site-config";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  const base = SITE_URL.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
