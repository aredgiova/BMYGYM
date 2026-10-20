import type { MetadataRoute } from "next";
import { isIndexingEnabled, siteConfig } from "@/config/site";
import { locales, localePath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return [];

  const languages = Object.fromEntries([...locales.map(locale => [locale, siteConfig.url + localePath(locale)]), ["x-default", siteConfig.url + "/"]]);
  return locales.map(locale => ({ url: siteConfig.url + localePath(locale), changeFrequency: "monthly", priority: locale === "en" ? 1 : 0.9, alternates: { languages } }));
}
