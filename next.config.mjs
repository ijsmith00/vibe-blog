/** @type {import('next').NextConfig} */
const nextConfig = {
  /** 존재하지 않는 URL에 `app/global-not-found.js` 사용 (기본 영문 404 방지) */
  experimental: {
    globalNotFound: true,
  },
  // apex(www 없음) → www 로 통일 — SITE_URL·서치 콘솔 URL 접두어와 맞춤 (검증/색인 혼선 방지)
  async redirects() {
    return [
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
