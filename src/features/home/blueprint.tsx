import { Arrow } from "@/components/ui/arrow";
import type { HomeCopy } from "@/i18n/types";

export function Blueprint({ copy }: { copy: HomeCopy }) {
  const content = copy.blueprint;
  return (
    <section
      id="blueprint"
      className="blueprint"
      aria-labelledby="blueprint-title"
    >
      <div className="blueprint-inner">
        <div className="blueprint-intro">
          <h2 id="blueprint-title">
            {content.title}
            <br />
            <em>{content.titleEmphasis}</em>
          </h2>
          <p>{content.intro}</p>
          <a className="button button-dark" href="#enquiry">
            {content.action}
            <Arrow diagonal />
          </a>
        </div>
        <div className="blueprint-details">
          <h3>{content.name}</h3>
          <p className="commission-caption">{content.caption}</p>
          <p>{content.description}</p>
          <p>{content.agreement}</p>
          <ul>
            {content.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="blueprint-note">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
