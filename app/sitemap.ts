import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://anirudhvaka.dev/",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://anirudhvaka.dev/resume",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://anirudhvaka.dev/writeups/architecture-evolution",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
