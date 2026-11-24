import { locales, localePath, type Locale } from "../i18n/config.ts";

type HomeStructuredDataOptions = {
  url: string;
  name: string;
  email: string;
  locale: Locale;
  description: string;
};

export function homeStructuredData({url, name, email, locale, description}: HomeStructuredDataOptions) {
  const origin = new URL(url).origin;
  const organizationId = `${origin}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name,
        url: `${origin}/`,
        description,
        email,
        // Public professional details from Legal Notice; founder shown on the homepage.
        founder: {
          "@type": "Person",
          "@id": `${origin}/#bojana-pesic`,
          name: "Bojana Pesic",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Avda. Primado Reig 129, Entlo. D",
          postalCode: "46020",
          addressLocality: "Valencia",
          addressCountry: "ES",
        },
        subjectOf: {
          "@type": "WebPage",
          "@id": origin + localePath(locale, "legal"),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name,
        inLanguage: [...locales],
        publisher: {"@id": organizationId},
      },
    ],
  };
}

export function serializeStructuredData(value: unknown): string {
  // A literal '<' could terminate the script element even inside a JSON string.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
