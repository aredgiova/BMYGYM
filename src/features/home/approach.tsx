import { ConceptImage } from "@/components/shared/concept-image";
import { TextLink } from "@/components/ui/text-link";

const stages = [
  {
    name: "Discover",
    copy: "We listen, explore your vision and understand the environment, objectives and individual requirements.",
  },
  {
    name: "Conceive",
    copy: "We develop a bespoke concept, bringing together architectural thinking, wellness expertise and creative possibilities.",
  },
  {
    name: "Curate",
    copy: "We identify suitable products, technologies, materials and specialist partners — or explore the development of new solutions where required.",
  },
  {
    name: "Coordinate",
    copy: "Depending on the agreed project scope, we collaborate with architects, manufacturers and project partners to support the concept’s realisation.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="section approach"
      aria-labelledby="approach-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-label">From vision to realisation</p>
          <h2 id="approach-title">
            Every exceptional project
            <br />
            begins with <em>a conversation.</em>
          </h2>
        </div>
        <TextLink href="#enquiry">Discuss your project</TextLink>
      </div>
      <div className="approach-body">
        <ConceptImage
          src="/images/approach-concept.webp"
          alt="An architectural concept model showing an integrated BMYGYM wellness environment on a yacht deck"
          caption="An exploration of space, material and possibility · Concept visualisation"
        />
        <ol className="approach-stages">
          {stages.map((stage, index) => (
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
