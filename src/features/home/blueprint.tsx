import { Arrow } from "@/components/ui/arrow";

const scope = [
  "Client & lifestyle briefing",
  "Spatial & functional analysis",
  "Movement, recovery & longevity strategy",
  "Concept & visual direction",
  "Curated technologies & bespoke elements",
  "Next-stage implementation roadmap",
];

export function Blueprint() {
  return (
    <section
      id="blueprint"
      className="blueprint"
      aria-labelledby="blueprint-title"
    >
      <div className="blueprint-inner">
        <div className="blueprint-intro">
          <p className="section-label">Start with your space</p>
          <h2 id="blueprint-title">
            Your vision.
            <br />
            <em>A considered beginning.</em>
          </h2>
          <p>
            Every exceptional environment begins with a clear understanding of
            the person, the architecture and the purpose of the space.
          </p>
          <a className="button button-dark" href="#enquiry">
            Begin your project
            <Arrow diagonal />
          </a>
        </div>
        <div className="blueprint-details">
          <p className="section-label">A private commission</p>
          <h3>
            BMYGYM Private
            <br />
            Longevity Blueprint
          </h3>
          <p>
            The first bespoke project phase — translating your vision into a
            tailored movement, recovery and longevity concept.
          </p>
          <p>
            From spatial strategy and curated technologies to visual direction
            and future implementation, the Blueprint creates the foundation for
            what comes next.
          </p>
          <ul>
            {scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="blueprint-note">
            A professional, paid concept service. The scope is individually
            defined around your project, before manufacturing or implementation
            begins.
          </p>
        </div>
      </div>
    </section>
  );
}
