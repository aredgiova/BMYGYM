import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";
import { CookieSettingsButton } from "@/components/privacy/cookie-notice";

export function Footer({locale, copy, homeLabel}: {locale: Locale; copy: CommonCopy["footer"]; homeLabel: string}) {
  const home = localePath(locale);
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Link href={home + "#home"} className="footer-wordmark" dir="ltr" aria-label={homeLabel}><bdi lang="en" dir="ltr">BMYGYM</bdi></Link><p>{copy.tagline}</p></div>
        <div className="footer-contact"><span>{copy.location}</span><a href="mailto:hello@bmygym.com"><bdi dir="ltr">hello@bmygym.com</bdi><Arrow diagonal /></a><Link href={localePath(locale, "retreats")}>{copy.retreats}<Arrow diagonal /></Link><Link href={localePath(locale, "private-consultation")}>{copy.consultation}<Arrow diagonal /></Link></div>
        <Link href={home + "#home"} className="back-top">{copy.top}<Arrow diagonal /></Link>
      </div>
      <div className="footer-bottom">
        <small>{copy.rights}</small>
        <nav aria-label={copy.legalNav}>
          <Link href={localePath(locale, "legal")}>{copy.legal}</Link>
          <Link href={localePath(locale, "privacy")}>{copy.privacy}</Link>
          <Link href={localePath(locale, "cookies")}>{copy.cookies}</Link>
          <CookieSettingsButton>{copy.cookieSettings}</CookieSettingsButton>
          <Link href={localePath(locale, "accessibility")}>{copy.accessibility}</Link>
        </nav>
      </div>
    </footer>
  );
}
