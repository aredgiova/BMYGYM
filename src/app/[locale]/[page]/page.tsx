import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/legal-layout";
import { isLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const pages = ["privacy", "legal", "cookies", "accessibility"] as const;
type Page = (typeof pages)[number];
function isPage(value: string): value is Page { return pages.some(page => page === value); }
type Props = {params: Promise<{locale: string; page: string}>};
export function generateStaticParams() { return pages.map(page => ({page})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, page} = await params;
  if (!isLocale(locale) || !isPage(page)) notFound();
  const {common} = await getDictionary(locale);
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
  const content = common.legal[page];
  return (
    <LegalLayout locale={locale} copy={common} title={content.title} lastUpdated={common.legal.lastUpdated}>
      {content.sections.map(section => <section key={section.title}>
        <h2>{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph.split(/(hello@bmygym\.com|www\.aepd\.es|\n)/).map((part,index) => {
          if (part === "\n") return <br key={index} />;
          if (part === "hello@bmygym.com") return <a key={index} href="mailto:hello@bmygym.com">{part}</a>;
          if (part === "www.aepd.es") return <a key={index} href="https://www.aepd.es/">{part}</a>;
          return part;
        })}</p>)}
      </section>)}
    </LegalLayout>
  );
}
