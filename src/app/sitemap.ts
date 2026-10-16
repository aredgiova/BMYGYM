import type { MetadataRoute } from "next";
import { isIndexingEnabled, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return [];

  return [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }];
}
