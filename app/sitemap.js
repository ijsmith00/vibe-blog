import { getPublicPosts } from "@/lib/posts";
import { SITE_URL, absolutePostUrl } from "@/lib/site-config";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default async function sitemap() {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const posts = await getPublicPosts();

  /** @type {import("next").MetadataRoute.Sitemap} */
  const routes = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map((p) => ({
      url: absolutePostUrl(p.slug),
      lastModified: new Date(p.date),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    {
      url: `${base}/ecp-charts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  return routes;
}
