/**
 * 블로그·사이트 기본 정보
 * 이 파일만 수정하면 메타데이터, JSON-LD, 사이트맵, robots 등에 반영됩니다.
 */
const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
export const SITE_URL =
  rawSiteUrl !== ""
    ? rawSiteUrl.replace(/\/+$/, "")
    : "https://idahoeditor.com";

/**
 * 네이버 서치어드바이저 소유 확인(HTML 태그) — `content` 값과 동일해야 함.
 * - `app/layout.js`의 `metadata.verification`에 넣어 `<head>`에
 *   `<meta name="naver-site-verification" content="…" />`로 출력됨.
 */
export const NAVER_SITE_VERIFICATION =
  "4cac433695bdf13c6cae8a78e8ab2ff953678afb";

export const SITE_NAME = "아이다호 편집자";

export const SITE_TITLE = "아이다호 편집자";

export const SITE_KEYWORDS = [
  "아이다호",
  "미국 시골 생활",
  "리모트 워크",
  "편집자",
  "번역가",
  "AI 코딩",
  "시골 적응기",
  "미국 이주",
  "IT 출판",
  "바이브 코딩",
];

export const SITE_OG_DEFAULT_ALT = "아이다호 편집자 블로그";

/** Article·JSON-LD `author` 등에 쓰는 표시명 (한곳만 수정) */
export const AUTHOR_NAME = "블로그 운영자";

export const DEFAULT_DESCRIPTION =
  "미국 북부 아이다호의 작은 마을에서 글을 씁니다. 시골 적응기와 리모트 편집 일, 그리고 AI 도구를 천천히 익혀 가는 과정을 기록합니다.";

/**
 * 사이트 카테고리 — URL은 `slug`, 글 frontmatter `category`는 `label`과 동일하게 둡니다.
 * `private: true`이면 목록·네비·사이트맵·검색 등에서 제외하고, 글 URL은 `noindex`로 둡니다.
 * @type {{ slug: string; label: string; private?: boolean }[]}
 */
export const SITE_CATEGORY_DEFS = [
  { slug: "idaho-journal", label: "아이다호 일지" },
  { slug: "tech-vibe", label: "테크 바이브", private: true },
];

/** 라벨만 필요할 때 (검색·호환) */
export const SITE_CATEGORIES = SITE_CATEGORY_DEFS.map((d) => d.label);

/** public 기준 경로 */
export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";

/** 기본 OG 이미지 픽셀 크기 (`public/og-default.png`와 동일해야 함) — 카카오·트위터 등 스크래퍼용 */
export const DEFAULT_OG_IMAGE_WIDTH = 1024;
export const DEFAULT_OG_IMAGE_HEIGHT = 682;

/** 소개 페이지 프로필 이미지 — public 기준 경로(예: `/about-profile.png`). 비어 있으면 이니셜 아바타 */
export const ABOUT_PROFILE_IMAGE_PATH = "/about-profile.png";

/** 문의 페이지 직접 메일 링크용 — `@` 앞·뒤로 나눠 두어 HTML에 노출을 줄임 (클라이언트에서 조립) */
export const CONTACT_MAIL_LOCAL = "2joojs369";
export const CONTACT_MAIL_DOMAIN = "gmail.com";

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
