import { Header } from "./header";
import { Footer } from "./footer";
import { TextLink } from "@/components/ui/text-link";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";

export function LegalLayout({
  title,
  draft = false,
  children,
  locale,
  copy,
}: {
  title: string;
  draft?: boolean;
  children: React.ReactNode;
  locale: Locale;
  copy: CommonCopy;
}) {
  return (
    <>
      <Header isHome={false} locale={locale} copy={copy.nav} />
      <main id="main-content" tabIndex={-1} className="section legal-page">
        <h1>{title}</h1>
        {draft && (
          <p className="draft-notice">
            {copy.legal.draft}
          </p>
        )}
        {children}
        <TextLink href={`${localePath(locale)}#enquiry`}>{copy.legal.back}</TextLink>
      </main>
      <Footer locale={locale} copy={copy.footer} homeLabel={copy.nav.home} />
    </>
  );
}
