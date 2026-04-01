/**
 * OG URL·canonical 등 헬퍼 (기준 상수는 `lib/config.js`)
 */
import {
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from "./config.js";

export {
  ABOUT_PROFILE_IMAGE_PATH,
  AUTHOR_NAME,
  CONTACT_MAIL_DOMAIN,
  CONTACT_MAIL_LOCAL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  GOOGLE_SITE_VERIFICATION,
  NAVER_SITE_VERIFICATION,
  SITE_CATEGORIES,
  SITE_CATEGORY_DEFS,
  SITE_NAME,
  SITE_URL,
} from "./config.js";

/**
 * OG/트위터용 절대 이미지 URL. 비어 있거나 없으면 기본 OG 이미지.
 * @param {string | null | undefined} src
 */
export function absoluteOgImageUrl(src) {
  const path = src?.trim() || DEFAULT_OG_IMAGE_PATH;
  if (/^https?:\/\//i.test(path)) return path;
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return new URL(pathname, SITE_URL).href;
}

/**
 * Next.js `openGraph.images` / `twitter.images`용.
 * - 절대 URL + width/height/type — 카카오톡 등이 og:image 메타를 인식하기 쉽게 함.
 * - WebP/SVG는 일부 링크 미리보기 스크래퍼에서 실패 → 기본 PNG로 대체.
 * @param {string | null | undefined} src
 * @param {string} [alt]
 */
export function ogImageMetadata(src, alt = SITE_NAME) {
  let url = absoluteOgImageUrl(src);
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    if (pathname.endsWith(".webp") || pathname.endsWith(".svg")) {
      url = absoluteOgImageUrl(null);
    }
  } catch {
    // keep url
  }

  let type = "image/png";
  try {
    const pathname = new URL(url).pathname;
    const ext = pathname.split(".").pop()?.toLowerCase() || "";
    if (ext === "jpg" || ext === "jpeg") type = "image/jpeg";
    else if (ext === "webp") type = "image/webp";
    else if (ext === "gif") type = "image/gif";
  } catch {
    // keep default
  }

  return {
    url,
    width: DEFAULT_OG_IMAGE_WIDTH,
    height: DEFAULT_OG_IMAGE_HEIGHT,
    alt: alt || SITE_NAME,
    type,
  };
}

/**
 * 사이트 내 경로 → 절대 URL
 * @param {string} path
 */
export function absolutePageUrl(path) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return new URL(pathname, SITE_URL).href;
}
