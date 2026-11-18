import { ConceptImage } from "@/components/shared/concept-image";
import { Arrow } from "@/components/ui/arrow";
import { TextLink } from "@/components/ui/text-link";
import type { HomeCopy } from "@/i18n/types";

export function Environments({ copy }: { copy: HomeCopy }) {
  const content = copy.environments;
  return (
    <section
      id="environments"
      className="section environments"
      aria-labelledby="environments-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="environments-title">
            {content.title}
            <br />
            <em>{content.titleEmphasis}</em>
          </h2>
        </div>
        <p>
          {content.introLines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <div className="environments-grid">
        <article id="land" className="environment environment-land" aria-labelledby="land-title">
          <a
            className="environment-image-link"
            href="#enquiry"
            aria-label={content.land.enquiryAria}
          >
            <ConceptImage
              className="land-image"
              src="/images/longevity-suite-ivory.webp"
              alt={content.land.imageAlt}
              caption={content.land.imageCaption}
              sizes="(max-width: 767px) 100vw, 55vw"
            />
          </a>
          <div className="environment-copy">
            <div className="environment-title">
              <h3 id="land-title">
                <a className="environment-heading-link" href="#enquiry">
                  {content.land.name}
                  <Arrow diagonal />
                </a>
              </h3>
              <span>{content.land.audience}</span>
            </div>
            <p>{content.land.description}</p>
            <p>{content.land.architecturalContext}</p>
            <ConceptImage
              className="land-classic-image"
              src="/images/land-classic-european.webp"
              alt={content.land.classicImageAlt}
              caption={content.land.classicImageCaption}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 34vw"
            />
          </div>
        </article>
        <article className="environment">
          <a
            className="environment-image-link"
            href="#enquiry"
            aria-label={content.sea.enquiryAria}
          >
            <ConceptImage
              src="/images/sea-yacht.webp"
              alt={content.sea.imageAlt}
              caption={content.sea.imageCaption}
              sizes="(max-width: 767px) 100vw, 55vw"
            />
          </a>
          <div className="environment-copy">
            <div className="environment-title">
              <h3>
                <a className="environment-heading-link" href="#enquiry">
                  {content.sea.name}
                  <Arrow diagonal />
                </a>
              </h3>
              <span>{content.sea.audience}</span>
            </div>
            <p>{content.sea.description}</p>
          </div>
        </article>
        <article id="air" className="environment environment-air" aria-labelledby="air-title">
          <div className="air-visuals">
            <a
              className="environment-image-link"
              href="#enquiry"
              aria-label={content.air.enquiryAria}
            >
              <ConceptImage
                className="air-image"
                src="/images/aero-one-private-aviation.webp"
                alt={content.air.imageAlt}
                caption={content.air.imageCaption}
                sizes="(max-width: 767px) 100vw, 55vw"
              />
            </a>
            <a
              className="environment-image-link"
              href="#enquiry"
              aria-label={content.air.enquiryAria}
            >
              <ConceptImage
                className="air-bespoke-image"
                src="/images/aero-one-bespoke-private-aviation.webp"
                alt={content.air.bespokeImageAlt}
                caption={content.air.bespokeImageCaption}
                sizes="(max-width: 767px) 100vw, 55vw"
              />
            </a>
          </div>
          <div className="environment-copy">
            <div className="environment-title">
              <h3 id="air-title">
                <a className="environment-heading-link" href="#enquiry">
                  {content.air.name}
                  <Arrow diagonal />
                </a>
              </h3>
              <span>{content.air.audience}</span>
            </div>
            <p className="environment-subtitle">{content.air.subtitle}</p>
            <p>{content.air.description}</p>
            <p className="environment-status">{content.air.status}</p>
            <details className="editorial-details">
              <summary>
                {content.air.detailsLabel}
                <Arrow />
              </summary>
              <h4 className="aviation-bespoke-title">{content.air.bespokeTitle}</h4>
              <p>{content.air.bespokeLead}</p>
              {content.air.bespokeParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{content.air.detail}</p>
            </details>
            <TextLink href="#enquiry">{content.air.conceptEnquiryLabel}</TextLink>
          </div>
        </article>
      </div>
    </section>
  );
}
