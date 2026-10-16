import { EnquiryForm } from "./enquiry-form";
import { Arrow } from "@/components/ui/arrow";

export function EnquirySection() {
  return (
    <section
      id="enquiry"
      className="section enquiry"
      aria-labelledby="enquiry-title"
    >
      <div className="enquiry-intro">
        <p className="section-label">Let’s create something exceptional</p>
        <h2 id="enquiry-title">
          Your vision
          <br />
          <em>begins here.</em>
        </h2>
        <p>Every exceptional project begins with a personal conversation.</p>
        <p>
          Tell us about your space, your vision and what you wish to create.
        </p>
        <p className="enquiry-audience">
          We welcome private enquiries from individuals, architects, designers,
          yacht professionals, hospitality groups, developers and private
          aviation specialists.
        </p>
        <a className="enquiry-email" href="mailto:hello@bmygym.com">
          hello@bmygym.com
          <Arrow diagonal />
        </a>
        <p className="founder-signature">
          Bojana Pesic<span>Founder · BMYGYM</span>
        </p>
      </div>
      <EnquiryForm />
    </section>
  );
}
