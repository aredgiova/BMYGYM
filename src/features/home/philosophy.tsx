import { ConceptImage } from "@/components/shared/concept-image";
import { TextLink } from "@/components/ui/text-link";
import type { HomeCopy } from "@/i18n/types";

export function Philosophy({ copy }: { copy: HomeCopy }) {
  const content = copy.philosophy;
  return (
    <section
      id="philosophy"
      className="section philosophy"
      aria-labelledby="philosophy-title"
    >
      <div className="philosophy-copy">
        <h2 id="philosophy-title">
          {content.title}
          <br />
          <em>{content.titleEmphasis}</em>
        </h2>
        <p className="philosophy-lead">{content.lead}</p>
        <p>{content.opening}</p>
        <p>{content.body}</p>
        <p>{content.collaboration}</p>
        <TextLink href="#blueprint">{content.link}</TextLink>
      </div>
      <div className="philosophy-visual">
        <ConceptImage
          src="/images/philosophy-residence.webp"
          alt={content.imageAlt}
          caption={content.imageCaption}
        />
        <p className="image-note">
          {content.imageNote}
          <br />
          <em>{content.imageNoteEmphasis}</em>
        </p>
      </div>
      <div className="philosophy-motto">
        {content.motto}
        <br />
        <em>{content.mottoEmphasis}</em>
      </div>
    </section>
  );
}
