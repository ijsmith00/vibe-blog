/**
 * 포스트 상세용 schema.org BlogPosting JSON-LD
 * (리뷰·평점·댓글 수 등 없음 — 일반 블로그 글에 맞춤)
 *
 * 저자 표시명은 `lib/config.js`의 `AUTHOR_NAME`에서만 바꾸면 됩니다.
 */
import {
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from "./config.js";
import {
  absoluteOgImageUrl,
  absolutePageUrl,
  absolutePostUrl,
} from "./site-config.js";

/**
 * @param {object} input
 * @param {{
 *   description: string;
 *   date: string;
 *   dateModified: string;
 *   category: string;
 *   tags: string[];
 *   thumbnailUrl?: string;
 * }} input.post
 * @param {string} input.slug
 * @param {string} input.titlePlain frontmatter 제목(마크다운 굵게 제거)
 * @returns {Record<string, unknown>}
 */
export function buildBlogPostingJsonLd({ post, slug, titlePlain }) {
  const postUrl = absolutePostUrl(slug);
  const imageUrl = absoluteOgImageUrl(post.thumbnailUrl);
  const publisherLogoUrl = absoluteOgImageUrl(DEFAULT_OG_IMAGE_PATH);
  const section = (post.category || "").trim();

  /** @type {Record<string, unknown>} */
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: titlePlain,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: publisherLogoUrl,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
      },
    },
    image: [imageUrl],
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
      url: postUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": absolutePageUrl("/"),
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "ko-KR",
  };

  if (section) {
    data.articleSection = section;
  }

  if (post.tags?.length) {
    data.keywords = post.tags.join(", ");
  }

  return data;
}
