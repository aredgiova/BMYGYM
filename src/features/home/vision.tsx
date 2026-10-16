import { ConceptImage } from "@/components/shared/concept-image";
import { Arrow } from "@/components/ui/arrow";

export function Vision() {
  return (
    <section id="vision" className="vision" aria-labelledby="vision-title">
      <div className="section vision-inner">
        <div className="section-heading">
          <div>
            <p className="section-label">Beyond the expected</p>
            <h2 id="vision-title">
              The next generation
              <br />
              of <em>personalised longevity.</em>
            </h2>
          </div>
          <div className="vision-intro">
            <p>Our vision extends beyond conventional wellness environments.</p>
            <p>
              BMYGYM explores signature concepts that bring together
              architectural integration, innovative design and personalised
              recovery experiences.
            </p>
            <p>
              From integrated fitness and recovery solutions to future private
              aviation concepts, we believe exceptional environments should
              evolve around the individual.
            </p>
          </div>
        </div>
        <div className="vision-grid">
          <article className="vision-wall">
            <ConceptImage
              src="/images/fitness-wall.webp"
              alt="BMYGYM Fitness Wall concept with warm timber, champagne metal and integrated training elements"
              sizes="(max-width: 767px) 100vw, 60vw"
            />
            <span className="concept-label">Signature concept</span>
            <h3>BMYGYM Fitness Wall</h3>
            <p>
              An integrated architectural fitness concept designed to bring
              movement into exceptional living environments.
            </p>
          </article>
          <article className="vision-capsule">
            <ConceptImage
              src="/images/recovery-capsule.webp"
              alt="A BMYGYM Recovery Capsule concept set into a warm architectural interior with a sea view"
              sizes="(max-width: 767px) 100vw, 35vw"
            />
            <span className="concept-label">Signature concept</span>
            <h3>BMYGYM Recovery Capsule</h3>
            <p>
              A concept exploring the integration of personalised recovery
              experiences into private wellness environments.
            </p>
          </article>
        </div>
        <div className="future-concepts">
          <p className="section-label">A horizon of possibilities</p>
          <details className="editorial-details">
            <summary>
              <span>BMYGYM AERO ONE</span>
              <Arrow diagonal />
            </summary>
            <p>
              A transformable luxury recovery lounge concept for private
              aircraft, envisioned to transition from an open seating
              environment into a more private recovery space.
            </p>
          </details>
          <details className="editorial-details">
            <summary>
              <span>BMYGYM AERO SIGNATURE</span>
              <Arrow diagonal />
            </summary>
            <p>
              A future concept exploring a fully enclosed bespoke longevity and
              recovery capsule for larger VIP aircraft interiors.
            </p>
          </details>
        </div>
        <p className="vision-disclaimer">
          Design visions, presented as concept visualisations. These concepts
          are not represented as manufactured products or certified aircraft
          equipment. Aviation concepts are subject to aircraft-specific
          technical feasibility, safety and certification requirements.
        </p>
      </div>
    </section>
  );
}
