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
  async redirects() {
    return [
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
