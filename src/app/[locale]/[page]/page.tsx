import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/legal-layout";
import { isLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getBookingCopy } from "@/i18n/booking";
import { BookingPage } from "@/features/booking/booking-page";
import { RetreatsPage } from "@/features/retreats/retreats-page";
import { getRetreatsCopy } from "@/i18n/retreats";
import { isIndexingEnabled } from "@/config/site";

const pages = ["privacy", "legal", "cookies", "accessibility", "retreats", "private-consultation"] as const;
type Page = (typeof pages)[number];
function isPage(value: string): value is Page { return pages.some(page => page === value); }
type Props = {params: Promise<{locale: string; page: string}>};
export function generateStaticParams() { return pages.map(page => ({page})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, page} = await params;
  if (!isLocale(locale) || !isPage(page)) notFound();
  const {common} = await getDictionary(locale);
  if (page === "retreats" || page === "private-consultation") {
    const booking = getBookingCopy(locale)[page === "retreats" ? "retreat" : page];
    const retreats = page === "retreats" ? getRetreatsCopy(locale) : null;
    const content = {title: retreats?.title || booking.title, intro: retreats?.metaDescription || booking.intro};
    return {
      title: content.title,
      description: content.intro,
      alternates: {canonical: localePath(locale, page), languages: Object.fromEntries([...locales.map(l => [l, localePath(l, page)]), ["x-default", localePath("en", page)]])},
      robots: {index: isIndexingEnabled, follow: isIndexingEnabled},
      openGraph: {title: content.title, description: content.intro, url: localePath(locale, page), ...(retreats && {images: [{url: "/images/retreats/beach-circle.webp", width: 1086, height: 1448, alt: retreats.images.beachCircle}]})},
      twitter: {title: content.title, description: content.intro, ...(retreats && {images: ["/images/retreats/beach-circle.webp"]})},
    };
  }
  return {
    title: common.legal[page].title,
    description: common.legal[page].sections[0].paragraphs[0],
    alternates: {canonical:localePath(locale,page),languages:Object.fromEntries([...locales.map(l=>[l,localePath(l,page)]),["x-default",localePath("en",page)]])},
    robots:{index:false,follow:false},
    openGraph: {title:common.legal[page].title, description:common.legal[page].sections[0].paragraphs[0], url:localePath(locale,page)},
    twitter: {title:common.legal[page].title, description:common.legal[page].sections[0].paragraphs[0]},
  };
}
export default async function InformationPage({params}: Props) {
  const {locale, page} = await params;
  if (!isLocale(locale) || !isPage(page)) notFound();
  const {common} = await getDictionary(locale);
  if (page === "retreats") {
    return <RetreatsPage locale={locale} copy={common} booking={getBookingCopy(locale)} retreats={getRetreatsCopy(locale)} />;
  }
  if (page === "private-consultation") {
    return <BookingPage locale={locale} copy={common} booking={getBookingCopy(locale)} intent={page} />;
  }
  const content = common.legal[page];
  return (
    <LegalLayout locale={locale} copy={common} title={content.title} lastUpdated={common.legal.lastUpdated}>
      {content.sections.map(section => <section key={section.title}>
        <h2>{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph.split(/(hello@bmygym\.com|www\.aepd\.es|\n)/).map((part,index) => {
          if (part === "\n") return <br key={index} />;
          if (part === "hello@bmygym.com") return <a key={index} href="mailto:hello@bmygym.com"><bdi dir="ltr">{part}</bdi></a>;
          if (part === "www.aepd.es") return <a key={index} href="https://www.aepd.es/"><bdi dir="ltr">{part}</bdi></a>;
          return part;
        })}</p>)}
      </section>)}
    </LegalLayout>
  );
}
