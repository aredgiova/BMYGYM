import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Arrow } from "@/components/ui/arrow";
import { TextLink } from "@/components/ui/text-link";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";
import type { BookingCopy, BookingIntent } from "@/i18n/booking";
import { RequestForm } from "./request-form";

export function BookingPage({ locale, copy, booking, intent }: {
  locale: Locale;
  copy: CommonCopy;
  booking: BookingCopy;
  intent: BookingIntent;
}) {
  const content = booking[intent];
  return (
    <>
      <Header isHome={false} locale={locale} copy={copy.nav} />
      <main id="main-content" tabIndex={-1} className="section enquiry booking-page">
        <div className="enquiry-intro booking-intro">
          <h1>{content.title}</h1>
          <p className="enquiry-subtitle">{content.subtitle}</p>
          <p>{content.intro}</p>
          <p>{content.availability}</p>
          <a className="enquiry-email" href="mailto:hello@bmygym.com">hello@bmygym.com<Arrow diagonal /></a>
          <TextLink href={localePath(locale)}>{booking.back}</TextLink>
        </div>
        <RequestForm locale={locale} copy={copy} booking={booking} intent={intent} />
      </main>
      <Footer locale={locale} copy={copy.footer} homeLabel={copy.nav.home} />
    </>
  );
}
