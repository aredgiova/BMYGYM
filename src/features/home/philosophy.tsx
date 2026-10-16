import { ConceptImage } from "@/components/shared/concept-image";
import { TextLink } from "@/components/ui/text-link";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section philosophy"
      aria-labelledby="philosophy-title"
    >
      <div className="philosophy-copy">
        <p className="section-label">Designed around you</p>
        <h2 id="philosophy-title">
          Beyond conventional
          <br />
          <em>wellness.</em>
        </h2>
        <p>
          BMYGYM is an independent, founder-led luxury longevity concept house.
        </p>
        <p>
          We do not begin with a catalogue, a predefined collection or a
          standard solution.
        </p>
        <p className="philosophy-statement">We begin with you.</p>
        <p className="personal-line">
          Your vision. Your lifestyle.
          <br />
          Your space. Your ambitions.
        </p>
        <p>
          Every project is approached individually — whether integrating
          exceptional existing technologies, reimagining conventional solutions
          or conceiving something entirely new.
        </p>
        <p>
          Working alongside architects, designers and specialised partners, we
          bring together creativity, expertise and carefully selected solutions
          to develop environments that are as individual as the people they are
          created for.
        </p>
        <TextLink href="#blueprint">Discover your possibilities</TextLink>
      </div>
      <div className="philosophy-visual">
        <ConceptImage
          src="/images/philosophy-residence.webp"
          alt="An integrated Pilates reformer in a calm private residence with a panoramic sea view"
        />
        <p className="image-note">
          A space that feels
          <br />
          <em>entirely your own.</em>
        </p>
      </div>
      <div className="philosophy-motto">
        Not Defined by Products.
        <br />
        <em>Driven by Possibilities.</em>
      </div>
    </section>
  );
}
