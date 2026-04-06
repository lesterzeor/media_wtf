import type { MetadataRoute } from "next";
import { getArticleSlugs } from "@/lib/contentful/api";
import { getSiteUrl } from "@/lib/site-url";

/** Helps search engines and ad crawlers discover public URLs. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const slugs = await getArticleSlugs();
    const articleEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${base}/articles/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...articleEntries];
  } catch {
    return staticRoutes;
  }
}
