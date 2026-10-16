const canonicalUrl = new URL(process.env.SITE_URL || "https://www.bmygym.com");

if (!["http:", "https:"].includes(canonicalUrl.protocol)) {
  throw new Error("SITE_URL must be an absolute HTTP or HTTPS URL.");
}

export const isIndexingEnabled =
  process.env.ENABLE_INDEXING === "true" &&
  process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

export const siteConfig = {
  name: "BMYGYM",
  title: "BMYGYM | Bespoke Longevity Environments for Land, Sea & Air",
  description:
    "BMYGYM conceives bespoke wellness, recovery and longevity environments for luxury residences, superyachts, hospitality and private aviation.",
  url: canonicalUrl.origin,
  email: "hello@bmygym.com",
} as const;
