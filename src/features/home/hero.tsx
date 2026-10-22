import Image from "next/image";
import { Fragment } from "react";
import { Arrow } from "@/components/ui/arrow";
import { TextLink } from "@/components/ui/text-link";
import type { HomeCopy } from "@/i18n/types";

export function Hero({ copy }: { copy: HomeCopy }) {
  const content = copy.hero;
  return (
    <>
      <section id="home" className="hero" aria-labelledby="hero-title">
        <div className="hero-main">
          <div className="hero-content">
            <h1 id="hero-title">
              {content.title}
              <br />
              <em>{content.titleEmphasis}</em>
            </h1>
            <p className="hero-service">{content.service}</p>
            <p className="hero-positioning">{content.positioning}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#enquiry">
                {content.enquiry}
                <Arrow diagonal />
              </a>
            </div>
          </div>
          <figure className="hero-visual">
            <Image
              className="hero-image"
              src="/images/fitness-wall-walnut.webp"
              alt={content.imageAlt}
              width={1402}
              height={1122}
              preload
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 54vw"
              quality={90}
            />
            <figcaption className="hero-caption">{content.caption}</figcaption>
          </figure>
        </div>
        <div className="hero-bottom">
          <span>
            {content.worlds.map((world, index) => (
              <Fragment key={world}>
                {index > 0 && <i />}
                {world}
              </Fragment>
            ))}
          </span>
          <a href="#philosophy" aria-label={content.discoverAria}>
            {content.discover}
            <svg width="15" height="22" viewBox="0 0 15 22" fill="none" aria-hidden="true">
              <path d="M7.5 1v19M1 14l6.5 6 6.5-6" stroke="currentColor" />
            </svg>
          </a>
        </div>
      </section>
      <section
        className="section hero-introduction"
        aria-label={content.introductionLabel}
      >
        <p className="hero-description">{content.introduction}</p>
        <div className="hero-introduction-detail">
          <p className="hero-secondary">{content.detail}</p>
          <TextLink href="#approach">{content.approachLink}</TextLink>
        </div>
      </section>
    </>
  );
}
