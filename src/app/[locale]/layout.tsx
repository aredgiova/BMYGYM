import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { isIndexingEnabled, siteConfig } from "@/config/site";
import "../globals.css";
import { notFound } from "next/navigation";
import { isLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/provider";

const bodoni = localFont({
  src: [
    {
      path: "../../../public/fonts/bodoni-moda-latin-variable.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/bodoni-moda-latin-italic-variable.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["BMYGYM Cyrillic Serif", "Georgia"],
  adjustFontFallback: false,
});
const manrope = localFont({
  src: "../../../public/fonts/manrope-latin-variable.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["BMYGYM Cyrillic Sans", "Arial"],
  adjustFontFallback: false,
});

export const runtime = "nodejs";
export function generateStaticParams() { return locales.map(locale => ({locale})); }
export async function generateMetadata({params}: {params: Promise<{locale:string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  const {common, home} = await getDictionary(locale);
  const path = localePath(locale);
  const title = "BMYGYM | " + common.meta.title;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {default: title, template: "%s | BMYGYM"},
    description: common.meta.description,
    applicationName: siteConfig.name,
    alternates: {canonical:path, languages: Object.fromEntries([...locales.map(l => [l, localePath(l)]), ["x-default", "/"]])},
    robots: {index:isIndexingEnabled, follow:isIndexingEnabled},
    openGraph: {title, description:common.meta.description, url:path, siteName:siteConfig.name,
      locale: {en:"en_GB",de:"de_DE",fr:"fr_FR",es:"es_ES",ru:"ru_RU"}[locale], type:"website",
      images:[{url:"/images/fitness-wall-walnut.webp",width:1402,height:1122,alt:home.hero.imageAlt}]},
    twitter:{card:"summary_large_image",title,description:common.meta.description,images:["/images/fitness-wall-walnut.webp"]}
  };
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f6",
};

export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode; params:Promise<{locale:string}>}>) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  const {common} = await getDictionary(locale);
  return (
    <html lang={locale} className={`${bodoni.variable} ${manrope.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">{common.nav.skip}</a>
        <LocaleProvider locale={locale} common={common}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
