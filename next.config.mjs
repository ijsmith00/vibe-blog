/** @type {import('next').NextConfig} */
const nextConfig = {
  /** 존재하지 않는 URL에 `app/global-not-found.js` 사용 (기본 영문 404 방지) */
  experimental: {
    globalNotFound: true,
  },
  /** HTTPS 고정(HSTS)·기본 보안 헤더 — 배포 URL이 항상 TLS로만 노출되도록 보조 */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  /**
   * - `www` + HTTP → HTTPS `www` (Vercel 외 환경·직접 http 접속 대비)
   * - apex → `https://www…` (기존, http/https 모두 www·TLS로 통일)
   */
  /** `/blog/[slug]`가 공식 URL. 기존 `/posts/[slug]`는 301으로 통합 */
  async rewrites() {
    return [
      {
        source: "/blog/:slug",
        destination: "/posts/:slug",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/posts/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/category/%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9",
        destination: "/category/vibe-coding-guide",
        permanent: true,
      },
      {
        source: "/category/%EC%88%98%EC%9D%B5%ED%99%94%20%EB%B8%94%EB%A1%9C%EA%B7%B8",
        destination: "/category/blog-monetization",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "header", key: "x-forwarded-proto", value: "http" },
          { type: "host", value: "www.howtovibecoding.com" },
        ],
        destination: "https://www.howtovibecoding.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "howtovibecoding.com" }],
        destination: "https://www.howtovibecoding.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "/**" },
      { protocol: "http", hostname: "**", pathname: "/**" },
    ],
  },
};

export default nextConfig;
