import { ConceptImage } from "@/components/shared/concept-image";
import { Arrow } from "@/components/ui/arrow";

export function Environments() {
  return (
    <section
      id="environments"
      className="section environments"
      aria-labelledby="environments-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="environments-title">
            Exceptional living.
            <br />
            <em>Without boundaries.</em>
          </h2>
        </div>
        <p>
          Three worlds. One individual vision.
          <br />
          Longevity, considered in every dimension.
        </p>
      </div>
      <div className="environments-grid">
        <article className="environment">
          <a
            className="environment-image-link"
            href="#enquiry"
            aria-label="Enquire about a private residence or hospitality project"
          >
            <ConceptImage
              className="land-image"
              src="/images/land-wellness.webp"
              alt="Champagne-toned wellness and fitness concepts integrated into a light-filled architectural interior"
              sizes="(max-width: 767px) 100vw, 55vw"
            />
          </a>
          <div className="environment-copy">
            <div className="environment-title">
              <h3>
                <a className="environment-heading-link" href="#enquiry">
                  Land
                  <Arrow diagonal />
                </a>
              </h3>
              <span>
                Private residences
                <br />& luxury hospitality
              </span>
            </div>
            <p>
              Bespoke longevity environments for exceptional residences, private
              villas, penthouses, boutique hotels and luxury hospitality
              destinations.
            </p>
            <p>
              Thoughtfully integrated movement, recovery and wellness solutions
              designed around the architecture, lifestyle and individual
              requirements of each project.
            </p>
          </div>
        </article>
        <article className="environment">
          <a
            className="environment-image-link"
            href="#enquiry"
            aria-label="Enquire about a superyacht or private yacht project"
          >
            <ConceptImage
              src="/images/sea-yacht.webp"
              alt="A dark timber BMYGYM fitness wall and recovery concept integrated into a yacht overlooking the sea"
              sizes="(max-width: 767px) 100vw, 55vw"
            />
          </a>
          <div className="environment-copy">
            <div className="environment-title">
              <h3>
                <a className="environment-heading-link" href="#enquiry">
                  Sea
                  <Arrow diagonal />
                </a>
              </h3>
              <span>
                Superyachts
                <br />& private yachts
              </span>
            </div>
            <p>
              Bespoke wellness and recovery environments conceived for life at
              sea.
            </p>
            <p>
              From private owner’s wellness suites to integrated fitness and
              recovery concepts, BMYGYM explores individual solutions in
              collaboration with yacht designers, architects and specialised
              marine partners.
            </p>
          </div>
        </article>
        <article className="environment">
          <div
            className="air-visual"
            role="img"
            aria-label="Reserved visual area for the forthcoming BMYGYM AERO ONE private aviation concept"
          >
            <div className="air-window">
              <span>BMYGYM</span>
              <strong>
                AERO
                <br />
                <em>ONE</em>
              </strong>
              <span>A new perspective.</span>
            </div>
            <p>Concept visual forthcoming</p>
          </div>
          <div className="environment-copy">
            <div className="environment-title">
              <h3>
                <a className="environment-heading-link" href="#enquiry">
                  Air
                  <Arrow diagonal />
                </a>
              </h3>
              <span>
                Private
                <br />
                aviation
              </span>
            </div>
            <p className="environment-subtitle">Longevity Above the Clouds.</p>
            <p>
              BMYGYM explores bespoke recovery and longevity concepts for
              exceptional private aircraft interiors.
            </p>
            <details className="editorial-details">
              <summary>
                Explore the aviation vision
                <Arrow />
              </summary>
              <p>
                From transformable recovery lounges to future integrated wellness
                environments, our vision is to bring personalised comfort, privacy
                and restoration into private aviation.
              </p>
              <p className="small-note">
                Every aviation concept is subject to aircraft-specific technical
                feasibility, safety and certification requirements.
              </p>
            </details>
          </div>
        </article>
      </div>
    </section>
  );
}
