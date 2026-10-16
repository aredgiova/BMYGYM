import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { isIndexingEnabled, siteConfig } from "@/config/site";
import "./globals.css";

const bodoni = localFont({
  src: [
    {
      path: "../../public/fonts/bodoni-moda-latin-variable.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/bodoni-moda-latin-italic-variable.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Georgia"],
});
const manrope = localFont({
  src: "../../public/fonts/manrope-latin-variable.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["Arial"],
});

export const runtime = "nodejs";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | BMYGYM" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  robots: { index: isIndexingEnabled, follow: isIndexingEnabled },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/hero-residence.webp",
        width: 1536,
        height: 1024,
        alt: "BMYGYM bespoke longevity environment — concept visualisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/hero-residence.webp"],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}>
      <body>
        <span
          hidden
          data-design-contract="64135187: brief-pinned architectural quiet luxury; warm ivory, sand, Bodoni Moda and Manrope; complete environment then personal philosophy, equal land sea air, paid Blueprint, process, concept visions, private enquiry; full-width hero with clear left-aligned offer and action. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md"
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
