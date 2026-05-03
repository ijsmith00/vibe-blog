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
        source: "/favicon.ico",
        destination: "/favicon.png",
        permanent: false,
      },
      {
        source: "/posts/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/category/vibe-coding-guide",
        destination: "/category/tech-vibe",
        permanent: true,
      },
      {
        source: "/category/vibe-coding-blog",
        destination: "/category/tech-vibe",
        permanent: true,
      },
      {
        source: "/category/blog-monetization",
        destination: "/category/tech-vibe",
        permanent: true,
      },
      {
        source: "/category/%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9",
        destination: "/category/tech-vibe",
        permanent: true,
      },
      {
        source: "/category/%EC%88%98%EC%9D%B5%ED%99%94%20%EB%B8%94%EB%A1%9C%EA%B7%B8",
        destination: "/category/tech-vibe",
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
