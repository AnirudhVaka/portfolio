import type { MetadataRoute } from "next";

/**
 * Robots policy: index everything except internal API routes.
 * Region detection happens before robots crawl — Googlebot's user agent
 * carries no country header from Vercel, so crawls render the Global
 * variant, which is appropriate for SEO.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://anirudhvaka.dev/sitemap.xml",
  };
}
