/**
 * OG URL·canonical 등 헬퍼 (기준 상수는 `lib/config.js`)
 */
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_URL,
} from "./config.js";

export {
  ABOUT_PROFILE_IMAGE_PATH,
  AUTHOR_NAME,
  CONTACT_MAIL_DOMAIN,
  CONTACT_MAIL_LOCAL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  SITE_CATEGORIES,
  SITE_NAME,
  SITE_URL,
  SITEMAP_BASE_URL,
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
 * 사이트 내 경로 → 절대 URL
 * @param {string} path
 */
export function absolutePageUrl(path) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return new URL(pathname, SITE_URL).href;
}
