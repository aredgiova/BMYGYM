import type { MetadataRoute } from "next";
import { isIndexingEnabled, siteConfig } from "@/config/site";
import { locales, localePath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return [];

  return ["", "retreats", "private-consultation"].flatMap(page => {
    const languages = Object.fromEntries([...locales.map(locale => [locale, siteConfig.url + localePath(locale, page)]), ["x-default", siteConfig.url + localePath("en", page)]]);
    return locales.map(locale => ({ url: siteConfig.url + localePath(locale, page), changeFrequency: "monthly" as const, priority: page ? 0.7 : locale === "en" ? 1 : 0.9, alternates: { languages } }));
  });
}
