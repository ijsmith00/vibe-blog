/**
 * 블로그·사이트 기본 정보
 * 이 파일만 수정하면 메타데이터, JSON-LD, 사이트맵, robots 등에 반영됩니다.
 */
export const SITE_URL = "https://www.howtovibecoding.com";

/** 사이트맵·robots.txt 등에 쓰이는 기준 URL — 배포 시 `SITE_URL`과 맞추세요 */
export const SITEMAP_BASE_URL = "https://myblog.com";

export const SITE_NAME = "일주일 완성! 바이브 코딩";

/** Article·구조화 데이터 등에 표시되는 저자 이름 */
export const AUTHOR_NAME = "블로그 운영자";

export const DEFAULT_DESCRIPTION =
  "일주일 만에 바이브 코딩으로 수익형 블로그를 만들어요!";

/** 사이트 카테고리 (고정 순서 — 헤더·푸터·글 frontmatter `category`와 동일한 이름 사용) */
export const SITE_CATEGORIES = [
  "바이브 코딩",
  "수익화 블로그 운영",
  "IT 정보",
];

/** public 기준 경로 */
export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";

/** 소개 페이지 프로필 이미지 — public 기준 경로(예: `/about-avatar.jpg`). 비어 있으면 이니셜 아바타 */
export const ABOUT_PROFILE_IMAGE_PATH = "";

/** 문의 페이지 직접 메일 링크용 — `@` 앞·뒤로 나눠 두어 HTML에 노출을 줄임 (클라이언트에서 조립) */
export const CONTACT_MAIL_LOCAL = "contact";
export const CONTACT_MAIL_DOMAIN = "howtovibecoding.com";

/**
 * WebSite 스키마 (layout 등)
 * @returns {Record<string, unknown>}
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
