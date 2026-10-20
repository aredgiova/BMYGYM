import { ConceptImage } from "@/components/shared/concept-image";
import { TextLink } from "@/components/ui/text-link";
import type { HomeCopy } from "@/i18n/types";

export function Approach({ copy }: { copy: HomeCopy }) {
  const content = copy.approach;
  return (
    <section
      id="approach"
      className="section approach"
      aria-labelledby="approach-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="approach-title">
            {content.title}
            <br />
            <em>{content.titleEmphasis}</em>
          </h2>
        </div>
        <TextLink href="#enquiry">{content.action}</TextLink>
      </div>
      <div className="approach-body">
        <ConceptImage
          src="/images/approach-concept.webp"
          alt={content.imageAlt}
          caption={content.imageCaption}
        />
        <ol className="approach-stages">
          {content.stages.map((stage, index) => (
            <li key={stage.name}>
              <span className="stage-number">0{index + 1}</span>
              <div>
                <h3>{stage.name}</h3>
                <p>{stage.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
