import { ConceptImage } from "@/components/shared/concept-image";
import { Arrow } from "@/components/ui/arrow";
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
        <article className="environment">
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
              <h3>
                <a className="environment-heading-link" href="#enquiry">
                  {content.land.name}
                  <Arrow diagonal />
                </a>
              </h3>
              <span>{content.land.audience}</span>
            </div>
            <p>{content.land.description}</p>
            <p>{content.land.detail}</p>
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
            <p>{content.sea.detail}</p>
          </div>
        </article>
        <article className="environment">
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
          <div className="environment-copy">
            <div className="environment-title">
              <h3>
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
              <p>{content.air.detail}</p>
            </details>
          </div>
        </article>
      </div>
    </section>
  );
}
