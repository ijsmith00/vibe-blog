import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { normalizeCategory } from "./category.js";
import { extractTOC } from "./toc.js";

const POSTS_DIR = path.join(process.cwd(), "posts");

function toSlug(fileName) {
  return fileName.replace(/\.md$/i, "");
}

function formatDateLabel(date) {
  try {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return "";
  }
}

function stripMarkdown(text) {
  // Excerpt generator for templates/SEO fallbacks.
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraphExcerpt(markdown) {
  const cleaned = markdown.replace(/\r\n/g, "\n").trim();
  const parts = cleaned.split(/\n\s*\n/);
  const first = parts[0] ?? cleaned;
  const plain = stripMarkdown(first);
  return plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function isValidSlug(slug) {
  // Prevent path traversal but allow most Unicode/file-name characters.
  if (typeof slug !== "string" || slug.trim() === "") return false;
  if (slug.includes("/") || slug.includes("\\")) return false;
  if (slug.includes("..")) return false;
  return true;
}

const DEFAULT_PLACEHOLDER_THUMBNAIL_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="60" y="70" width="1080" height="490" rx="28" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/><text x="50%" y="46%" text-anchor="middle" dominant-baseline="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="56" fill="white" opacity="0.95">Image placeholder</text><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="30" fill="white" opacity="0.85">일주일 완성! 바이브 코딩</text></svg>';

const DEFAULT_PLACEHOLDER_IMAGE =
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    DEFAULT_PLACEHOLDER_THUMBNAIL_SVG,
  )}`;

function localPublicPathFromSrc(src) {
  // Only handle local public assets like "/images/foo.jpg".
  if (!src || typeof src !== "string") return null;
  if (!src.startsWith("/")) return null;
  const relative = src.replace(/^\//, "");
  return path.join(process.cwd(), "public", relative);
}

async function resolveThumbnailSrc(thumbnail) {
  if (typeof thumbnail !== "string" || thumbnail.trim() === "") {
    return DEFAULT_PLACEHOLDER_IMAGE;
  }

  const localPath = localPublicPathFromSrc(thumbnail.trim());
  if (!localPath) return thumbnail;

  const exists = await fileExists(localPath);
  if (exists) return thumbnail;
  return DEFAULT_PLACEHOLDER_IMAGE;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractAltFromImgTag(imgTag) {
  const m = /alt\s*=\s*("([^"]*)"|'([^']*)')/i.exec(imgTag);
  if (!m) return "";
  return (m[2] ?? m[3] ?? "").trim();
}

/** 단일 이미지 문단을 figure + figcaption(alt)으로 바꿉니다. CSS만으로는 img alt를 캡션에 못 올립니다. */
function wrapLoneImageParagraphsWithFigure(html) {
  return html.replace(
    /<p>\s*(<img\b[^>]*\/?>)\s*<\/p>/gi,
    (full, imgTag) => {
      const alt = extractAltFromImgTag(imgTag);
      if (!alt) return full;
      return `<figure>${imgTag}<figcaption>${escapeHtml(alt)}</figcaption></figure>`;
    },
  );
}

/**
 * rehype-slug는 h1~h6에 id를 붙이므로, 기존 동작에 맞게 h2·h3만 id 유지.
 * (github-slugger 기반 — 한글 제목도 안정적으로 slug 생성)
 */
function rehypeHeadingIdsH2H3Only() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (!node.tagName) return;
      if (node.tagName === "h2" || node.tagName === "h3") return;
      if (
        ["h1", "h4", "h5", "h6"].includes(node.tagName) &&
        node.properties
      ) {
        delete node.properties.id;
      }
    });
  };
}

async function markdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeHeadingIdsH2H3Only)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

function parseTagsFromFrontmatter(data) {
  const raw = data?.tags;
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function estimateReadingMinutes(markdown) {
  const plain = stripMarkdown(markdown);
  const n = plain.length;
  return Math.max(1, Math.ceil(n / 200));
}

async function getThumbnailDisplayUrl(thumbnailRaw) {
  const thumbRaw = (thumbnailRaw || "").trim();
  if (!thumbRaw) return null;
  if (/^https?:\/\//i.test(thumbRaw)) return thumbRaw;
  const pathForPublic = thumbRaw.startsWith("/") ? thumbRaw : `/${thumbRaw}`;
  const localPath = localPublicPathFromSrc(pathForPublic);
  if (localPath && (await fileExists(localPath))) return pathForPublic;
  return null;
}

async function replaceMissingImagesWithPlaceholder(html) {
  const imgTagRegex = /<img\b[^>]*\bsrc=(["'])(.*?)\1[^>]*>/gi;
  const matches = Array.from(html.matchAll(imgTagRegex));
  if (matches.length === 0) return html;

  // Build the output with slicing to avoid async issues inside String.replace.
  let out = "";
  let lastIndex = 0;

  for (const match of matches) {
    const fullTag = match[0];
    const src = (match[2] ?? "").trim();
    const index = match.index ?? -1;

    if (index < 0) continue;

    out += html.slice(lastIndex, index);

    const localPath = localPublicPathFromSrc(src);
    const shouldReplace = !src || (localPath !== null && !(await fileExists(localPath)));

    if (shouldReplace) {
      // Replace with an inline placeholder (works without needing actual image files).
      const altMatch = /alt=(["'])(.*?)\1/i.exec(fullTag);
      const alt = altMatch?.[2]?.trim() ? altMatch[2].trim() : "placeholder image";
      out += `<img src="${DEFAULT_PLACEHOLDER_IMAGE}" alt="${alt}" />`;
    } else {
      out += fullTag;
    }

    lastIndex = index + fullTag.length;
  }

  out += html.slice(lastIndex);
  return out;
}

export async function getAllPosts() {
  let dirents;
  try {
    dirents = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const mdFiles = dirents
    .filter((d) => d.isFile() && /\.md$/i.test(d.name))
    .map((d) => d.name);

  const posts = await Promise.all(
    mdFiles.map(async (fileName) => {
      const slug = toSlug(fileName);
      const filePath = path.join(POSTS_DIR, fileName);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);

      const stat = await fs.stat(filePath);
      const dateValue =
        parsed.data?.date && String(parsed.data.date).trim() !== ""
          ? new Date(parsed.data.date)
          : stat.mtime;

      const title = parsed.data?.title || slug;
      const category = parsed.data?.category || "";
      const description =
        parsed.data?.description ||
        parsed.data?.excerpt ||
        firstParagraphExcerpt(parsed.content);

      const thumbRaw = (parsed.data?.thumbnail || "").trim();
      let cardThumbnail = null;
      if (thumbRaw) {
        if (/^https?:\/\//i.test(thumbRaw)) {
          cardThumbnail = thumbRaw;
        } else {
          const localPath = localPublicPathFromSrc(
            thumbRaw.startsWith("/") ? thumbRaw : `/${thumbRaw}`,
          );
          if (localPath && (await fileExists(localPath))) {
            cardThumbnail = thumbRaw.startsWith("/") ? thumbRaw : `/${thumbRaw}`;
          }
        }
      }

      return {
        slug,
        title,
        category,
        tags: parseTagsFromFrontmatter(parsed.data),
        description,
        thumbnail: parsed.data?.thumbnail || "",
        cardThumbnail,
        date: dateValue.toISOString(),
        dateLabel: formatDateLabel(dateValue),
      };
    }),
  );

  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

/**
 * URL/검색용 태그 문자열 정규화 (앞뒤 공백 제거, decodeURIComponent는 호출부에서 처리).
 */
function normalizeTagLabel(raw) {
  if (typeof raw !== "string") return "";
  return raw.trim();
}

/**
 * 모든 고유 태그와 해당 태그가 붙은 포스트 수.
 * 한 포스트에 같은 태그가 여러 번 있어도 1회만 집계.
 * @returns {Promise<{ name: string; count: number }[]>}
 */
export async function getAllTags() {
  const posts = await getAllPosts();
  const map = new Map();

  for (const p of posts) {
    const unique = [
      ...new Set(
        (p.tags || []).map((t) => normalizeTagLabel(String(t))).filter(Boolean),
      ),
    ];
    for (const name of unique) {
      map.set(name, (map.get(name) || 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

/**
 * 특정 태그가 하나라도 있는 포스트만, 날짜 내림차순.
 * @param {string} tagParam URL 세그먼트(인코딩 가능)
 */
export async function getPostsByTag(tagParam) {
  const target = normalizeTagLabel(
    typeof tagParam === "string"
      ? (() => {
          try {
            return decodeURIComponent(tagParam);
          } catch {
            return tagParam;
          }
        })()
      : "",
  );
  if (!target) return [];

  const posts = await getAllPosts();
  return posts.filter((p) => {
    const labels = (p.tags || []).map((t) => normalizeTagLabel(String(t)));
    return labels.includes(target);
  });
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const set = new Set(posts.map((p) => normalizeCategory(p.category)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
}

export async function getPostsByCategory(categoryParam) {
  const target = normalizeCategory(categoryParam);
  const posts = await getAllPosts();
  return posts.filter((p) => normalizeCategory(p.category) === target);
}

/**
 * 카테고리별 포스트 수·가장 최근 글 제목 (날짜 내림차순 기준 첫 글).
 * @returns {Promise<{ name: string; count: number; latestPostTitle: string }[]>}
 */
export async function getCategorySummaries() {
  const posts = await getAllPosts();
  const map = new Map();

  for (const p of posts) {
    const name = normalizeCategory(p.category);
    const cur = map.get(name);
    if (!cur) {
      map.set(name, {
        name,
        count: 1,
        latestPostTitle: p.title,
      });
    } else {
      cur.count += 1;
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "ko"),
  );
}

export { normalizeCategory } from "./category.js";

export async function getRecentPosts(limit = 6) {
  const all = await getAllPosts();
  return all.slice(0, limit);
}

export async function getPostBySlug(slug) {
  if (!isValidSlug(slug)) {
    return null;
  }

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  let raw;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const parsed = matter(raw);
  const tags = parseTagsFromFrontmatter(parsed.data);
  const readingMinutes = estimateReadingMinutes(parsed.content);

  const title = parsed.data?.title || slug;
  const category = parsed.data?.category || "";
  const description =
    parsed.data?.description ||
    parsed.data?.excerpt ||
    firstParagraphExcerpt(parsed.content);

  const stat = await fs.stat(filePath);
  const dateValue =
    parsed.data?.date && String(parsed.data.date).trim() !== ""
      ? new Date(parsed.data.date)
      : stat.mtime;

  const thumbnailUrl = await getThumbnailDisplayUrl(parsed.data?.thumbnail);

  let contentHtml = await markdownToHtml(parsed.content);
  contentHtml = await replaceMissingImagesWithPlaceholder(contentHtml);
  contentHtml = wrapLoneImageParagraphsWithFigure(contentHtml);

  const toc = extractTOC(parsed.content);

  return {
    slug,
    title,
    category,
    description,
    tags,
    readingMinutes,
    thumbnailUrl,
    date: dateValue.toISOString(),
    dateLabel: formatDateLabel(dateValue),
    contentHtml,
    toc,
  };
}

export async function getAdjacentPosts(slug) {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx + 1 < all.length ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}

export async function getRelatedPosts(slug, category, limit = 3) {
  const cat = normalizeCategory(category);
  const all = await getAllPosts();
  return all
    .filter((p) => p.slug !== slug && normalizeCategory(p.category) === cat)
    .slice(0, limit);
}

