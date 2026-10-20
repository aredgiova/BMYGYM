import { ConceptImage } from "@/components/shared/concept-image";
import { Arrow } from "@/components/ui/arrow";
import type { HomeCopy } from "@/i18n/types";

export function Vision({ copy }: { copy: HomeCopy }) {
  const content = copy.vision;
  return (
    <section id="vision" className="vision" aria-labelledby="vision-title">
      <div className="section vision-inner">
        <div className="section-heading">
          <div>
            <h2 id="vision-title">
              {content.title}
              <br />
              <em>{content.titleEmphasis}</em>
            </h2>
          </div>
          <div className="vision-intro">
            {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <div className="vision-grid">
          <article className="vision-wall">
            <ConceptImage
              src="/images/fitness-wall.webp"
              alt={content.wall.imageAlt}
              caption={content.wall.imageCaption}
              sizes="(max-width: 767px) 100vw, 60vw"
            />
            <h3>{content.wall.name}</h3>
            <span className="concept-label">{content.wall.label}</span>
            <p>{content.wall.description}</p>
          </article>
          <article className="vision-capsule">
            <ConceptImage
              src="/images/recovery-capsule.webp"
              alt={content.capsule.imageAlt}
              caption={content.capsule.imageCaption}
              sizes="(max-width: 767px) 100vw, 35vw"
            />
            <h3>{content.capsule.name}</h3>
            <span className="concept-label">{content.capsule.label}</span>
            <p>{content.capsule.description}</p>
          </article>
        </div>
        <div className="future-concepts">
          <p className="section-label">{content.futureLabel}</p>
          <details className="editorial-details">
            <summary>
              <span>{content.aeroOneName}</span>
              <Arrow diagonal />
            </summary>
            <p>{content.aeroOneDescription}</p>
          </details>
          <details className="editorial-details">
            <summary>
              <span>{content.aeroSignatureName}</span>
              <Arrow diagonal />
            </summary>
            <p>{content.aeroSignatureDescription}</p>
          </details>
        </div>
        <p className="vision-disclaimer">{content.disclaimer}</p>
      </div>
    </section>
  );
}
