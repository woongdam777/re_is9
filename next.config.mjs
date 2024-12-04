/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // 모든 API 라우트에 적용
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://is9.netlify.app" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // API 응답에 대한 캐시 설정 추가
          { key: "Cache-Control", value: "public, max-age=60, s-maxage=60, stale-while-revalidate=300" }
        ]
      },
      {
        // 정적 자산에 대한 캐시 설정
        source: "/:all*(svg|jpg|png|webp|js|css)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          }
        ],
      },
    ]
  }
};

export default nextConfig;