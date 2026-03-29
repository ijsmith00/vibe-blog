import {
  getAllCategories,
  getAllPosts,
  getAllTags,
} from "@/lib/posts";
import { SITE_URL } from "@/lib/site-config";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default async function sitemap() {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const [posts, categories, tagList] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
  ]);

  /** @type {import("next").MetadataRoute.Sitemap} */
  const routes = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map((p) => ({
      url: `${base}/posts/${encodeURIComponent(p.slug)}`,
      lastModified: new Date(p.date),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    {
      url: `${base}/category`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...categories.map((slug) => ({
      url: `${base}/category/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    {
      url: `${base}/tag`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...tagList.map(({ name }) => ({
      url: `${base}/tag/${encodeURIComponent(name)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
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
