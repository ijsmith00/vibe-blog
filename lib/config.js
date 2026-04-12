/**
 * 블로그·사이트 기본 정보
 * 이 파일만 수정하면 메타데이터, JSON-LD, 사이트맵, robots 등에 반영됩니다.
 */
/** 프로덕션 기준 URL — 메타데이터, JSON-LD, 사이트맵, robots 등에 공통 사용 */
export const SITE_URL = "https://www.howtovibecoding.com";

/**
 * 구글 서치 콘솔 소유권 확인(HTML 태그) — `content` 값과 동일해야 함.
 * - `app/layout.js`의 `<head>` 안 `<meta name="google-site-verification" />`에 사용됨.
 * - 서치 콘솔 속성 URL은 `SITE_URL`과 같게(예: https://www.…) 등록할 것.
 * - 「HTML 파일」방식을 쓰는 경우: 콘솔에서 받은 파일을 이름·내용 수정 없이 `public/`에 넣고 재배포
 *   (파일명은 계정마다 다르며, 이 상수와 파일명이 자동으로 같아지지는 않음).
 */
export const GOOGLE_SITE_VERIFICATION =
  "cwlsq1uOkUbqKYXiCc9uRPd2XQ_xAYImTtAbPCtqV7k";

if (
  typeof GOOGLE_SITE_VERIFICATION === "string" &&
  /x{5,}/i.test(GOOGLE_SITE_VERIFICATION)
) {
  throw new Error(
    "[lib/config] GOOGLE_SITE_VERIFICATION looks like a placeholder. Set the real Search Console token.",
  );
}

/**
 * 네이버 서치어드바이저 소유 확인(HTML 태그) — `content` 값과 동일해야 함.
 * - `app/layout.js`의 `metadata.verification`에 넣어 `<head>`에
 *   `<meta name="naver-site-verification" content="…" />`로 출력됨.
 */
export const NAVER_SITE_VERIFICATION =
  "4cac433695bdf13c6cae8a78e8ab2ff953678afb";

/** 구글 애드센스 퍼블리셔 ID (`ca-pub-…`) — `app/layout.js`에서 로드 */
export const GOOGLE_ADSENSE_CLIENT = "ca-pub-5597657573759716";

export const SITE_NAME = "모두의바이브코딩";

/** Article·JSON-LD `author` 등에 쓰는 표시명 (한곳만 수정) */
export const AUTHOR_NAME = "블로그 운영자";

export const DEFAULT_DESCRIPTION =
  "바이브 코딩으로 블로그 제작·다양한 실험 노하우를 모두와 나눠요!";

/**
 * 사이트 카테고리 — URL은 `slug`, 글 frontmatter `category`는 `label`과 동일하게 둡니다.
 * @type {{ slug: string; label: string }[]}
 */
export const SITE_CATEGORY_DEFS = [
  { slug: "vibe-coding-guide", label: "바이브 코딩 (AI 개발)" },
  {
    slug: "vibe-coding-blog",
    label: "[연재] 바이브 코딩으로 블로그 만들기",
  },
  { slug: "blog-monetization", label: "수익화 노하우" },
];

/** 라벨만 필요할 때 (검색·호환) */
export const SITE_CATEGORIES = SITE_CATEGORY_DEFS.map((d) => d.label);

/** public 기준 경로 */
export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";

/** 기본 OG 이미지 픽셀 크기 (`public/og-default.png`와 동일해야 함) — 카카오·트위터 등 스크래퍼용 */
export const DEFAULT_OG_IMAGE_WIDTH = 1376;
export const DEFAULT_OG_IMAGE_HEIGHT = 768;

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
