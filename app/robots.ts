import type { MetadataRoute } from "next";

/**
 * Robots policy: index everything. One universal version of the site — no
 * region variants, no per-visitor rendering.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://anirudhvaka.dev/sitemap.xml",
  };
}
