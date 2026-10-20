import { ConceptImage } from "@/components/shared/concept-image";
import { Arrow } from "@/components/ui/arrow";
import { ProfileLink } from "@/features/enquiry/profile-link";
import type { HomeCopy } from "@/i18n/types";

// Existing concept images are provisional until the two requested assets arrive.
const profiles = [
  { type: "private", image: "/images/philosophy-residence.webp" },
  { type: "professional", image: "/images/approach-concept.webp" },
] as const;

export function WorkWithUs({ copy }: { copy: HomeCopy }) {
  const content = copy.workWithUs;
  return (
    <section id="work-with-us" className="section work-with-us" aria-labelledby="work-with-us-title">
      <h2 id="work-with-us-title">{content.title}</h2>
      <div className="work-with-us-grid">
        {profiles.map((profile, index) => {
          const client = content.clients[index];
          return (
            <article className="client-path" key={profile.type} aria-labelledby={`client-${profile.type}-title`}>
              <ConceptImage
                src={profile.image}
                alt={client.imageAlt}
                caption={client.imageCaption}
                sizes="(max-width: 767px) 100vw, 45vw"
              />
              <div className="client-path-copy">
                <h3 id={`client-${profile.type}-title`}>{client.title}</h3>
                <p>{client.description}</p>
                <ProfileLink profile={profile.type} className="button button-dark">
                  {client.action}
                  <Arrow diagonal />
                </ProfileLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
