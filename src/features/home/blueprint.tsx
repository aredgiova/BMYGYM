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
          </h2>
          <p className="section-subtitle"><em>{content.titleEmphasis}</em></p>
          <p>{content.intro}</p>
          <a className="button button-dark" href="#enquiry">
            {content.action}
            <Arrow diagonal />
          </a>
        </div>
        <div className="blueprint-details">
          <p className="commission-caption">{content.caption}</p>
          <p>{content.description}</p>
          <p>{content.agreement}</p>
          <ol className="blueprint-steps">
            {content.scope.map((item, index) => (
              <li key={item.title}>
                <h3><span aria-hidden="true">{String(index + 1).padStart(2, "0")} · </span>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
          <p className="blueprint-note">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
