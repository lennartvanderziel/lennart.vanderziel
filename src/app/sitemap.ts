import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lennartvanderziel.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shoulder-to-shoulder`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/high-performance-mentoring`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
