import type { MetadataRoute } from "next";
import { isIndexingEnabled, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
