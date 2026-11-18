import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Arrow } from "@/components/ui/arrow";
import { TextLink } from "@/components/ui/text-link";
import { RequestForm } from "@/features/booking/request-form";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";
import type { BookingCopy } from "@/i18n/booking";
import type { RetreatsCopy } from "@/i18n/retreats";
import "./retreats.css";

// Extend BMYGYM's established editorial identity with the supplied photography.
// Valencia leads; yacht experiences remain an independent, non-bookable 2027 preview.
// Programmes, prices and any external booking destination require confirmed content.
export function RetreatsPage({ locale, copy, booking, retreats }: {
  locale: Locale;
  copy: CommonCopy;
  booking: BookingCopy;
  retreats: RetreatsCopy;
}) {
  return (
    <>
      <Header isHome={false} locale={locale} copy={copy.nav} />
      <main id="main-content" tabIndex={-1} className="retreats-page">
        <section className="section retreats-hero" aria-labelledby="retreats-title">
          <div className="retreats-hero-copy">
            <h1 id="retreats-title"><bdi dir="ltr" lang="en">BMYGYM</bdi> <em lang="en"><bdi dir="ltr">Retreats</bdi></em></h1>
            <p className="retreats-lead">{retreats.heroLead}</p>
            <p className="retreats-body">{retreats.heroText}</p>
            <div className="retreats-actions">
              <a className="button button-dark" href="#retreat-reservation" data-retreat-reservation>
                {retreats.requestReservation}<Arrow diagonal />
              </a>
              <TextLink href="#valencia">{retreats.explore}</TextLink>
            </div>
          </div>
          <figure className="retreats-hero-visual">
            <Image src="/images/retreats/beach-circle.webp" alt={retreats.images.beachCircle}
              width={1086} height={1448} preload sizes="(max-width: 767px) 100vw, 50vw" quality={90} />
            <figcaption>{retreats.captions.beachCircle}</figcaption>
          </figure>
        </section>

        <section id="valencia" className="section retreats-valencia" aria-labelledby="valencia-title">
          <figure className="retreats-promenade">
            <Image src="/images/retreats/valencia-promenade.webp" alt={retreats.images.promenade}
              width={1231} height={1536} sizes="(max-width: 767px) 100vw, 43vw" />
          </figure>
          <div className="retreats-valencia-copy">
            <h2 id="valencia-title">{retreats.valenciaTitle}</h2>
            <p className="retreats-body">{retreats.valenciaText}</p>
            <figure className="retreats-welcome">
              <Image src="/images/retreats/welcome-table.webp" alt={retreats.images.welcomeTable}
                width={1122} height={1402} sizes="(max-width: 767px) 78vw, 31vw" />
              <figcaption>{retreats.captions.welcomeTable}</figcaption>
            </figure>
          </div>
        </section>

        <section className="section retreats-experience" aria-labelledby="experience-title">
          <h2 id="experience-title">{retreats.experienceTitle}</h2>
          <div>
            <p className="retreats-body">{retreats.experienceText}</p>
            <p className="retreats-body">{retreats.experienceGuidance}</p>
          </div>
        </section>

        <section id="valencia-programmes" className="section retreats-programmes" aria-labelledby="programmes-title">
          <h2 id="programmes-title">{retreats.programmesTitle}</h2>
          <div>
            <p className="retreats-body">{retreats.programmesText}</p>
            <TextLink href="#retreat-reservation">{retreats.requestReservation}</TextLink>
            <p className="retreats-note">{retreats.programmesNote}</p>
          </div>
        </section>

        <section className="section retreats-gallery" aria-labelledby="retreats-gallery-title">
          <h2 id="retreats-gallery-title">{retreats.galleryTitle}</h2>
          <div className="retreats-gallery-grid">
            <figure className="retreats-ritual">
              <Image src="/images/retreats/deep-reset.webp" alt={retreats.images.deepReset}
                width={1122} height={1402} sizes="(max-width: 767px) 100vw, 38vw" />
            </figure>
            <figure className="retreats-journal">
              <Image src="/images/retreats/journal.webp" alt={retreats.images.journal}
                width={1536} height={1014} sizes="(max-width: 767px) 66vw, 26vw" />
              <figcaption>{retreats.captions.journal}</figcaption>
            </figure>
            <figure className="retreats-pool">
              <Image src="/images/retreats/pool.webp" alt={retreats.images.pool}
                width={766} height={1536} sizes="(max-width: 767px) 49vw, 20vw" />
            </figure>
          </div>
        </section>

        <section id="yacht-retreats" className="section retreats-yacht" aria-labelledby="yacht-retreats-title">
          <figure>
            <Image src="/images/retreats/yacht.webp" alt={retreats.images.yacht}
              width={1047} height={1536} sizes="(max-width: 767px) 58vw, 24vw" />
          </figure>
          <div>
            <h2 id="yacht-retreats-title">{retreats.yachtTitle}</h2>
            <p className="retreats-body">{retreats.yachtText}</p>
            <p className="retreats-body">{retreats.yachtDescription}</p>
            <p className="retreats-note">{retreats.yachtSchedule}</p>
            <p className="retreats-note">{retreats.yachtNote}</p>
          </div>
        </section>

        <section id="retreat-reservation" className="section enquiry retreats-reservation" aria-labelledby="reservation-title">
          <div className="enquiry-intro booking-intro">
            <h2 id="reservation-title">{retreats.reservationTitle}</h2>
            <p>{retreats.reservationText}</p>
            <p>{retreats.programmesNote}</p>
            <a className="enquiry-email" href="mailto:hello@bmygym.com">hello@bmygym.com<Arrow diagonal /></a>
            <TextLink href={localePath(locale)}>{booking.back}</TextLink>
          </div>
          <RequestForm locale={locale} copy={copy} booking={booking} intent="retreat" />
        </section>
      </main>
      <Footer locale={locale} copy={copy.footer} homeLabel={copy.nav.home} />
    </>
  );
}
