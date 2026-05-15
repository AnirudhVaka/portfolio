/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // /resume is dynamic per visitor; everything else can be static-with-cookie-revalidation.
  experimental: {
    // Keep server components lean — we don't need React compiler experiments here.
  },
  async headers() {
    return [
      {
        // Aggressively cache static download artifacts.
        source: "/downloads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
