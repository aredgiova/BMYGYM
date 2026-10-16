import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Legal Notice / Aviso Legal",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: false },
};

export default function LegalPage() {
  return (
    <LegalLayout title="Legal Notice / Aviso Legal" draft>
      <h2>BMYGYM</h2>
      <p>
        Bespoke Longevity Environments
        <br />
        Founder: Bojana Pesic
        <br />
        Valencia, Spain
        <br />
        <a href="mailto:hello@bmygym.com">hello@bmygym.com</a>
      </p>
      <h2>Business information pending</h2>
      <p>
        The legal entity or proprietor’s registered details, postal address, tax
        identification and any applicable registry information must be supplied
        before this notice can be finalised.
      </p>
      <h2>Concept visualisations</h2>
      <p>
        The architectural environments and signature concepts presented on this
        website are design visualisations. They do not establish that a product
        has been manufactured, a project has been completed, or aircraft
        equipment has been certified.
      </p>
      <p>
        Aviation concepts are subject to aircraft-specific technical
        feasibility, safety and certification requirements.
      </p>
      <h2>Project engagements</h2>
      <p>
        The Private Longevity Blueprint is a professional paid concept service.
        Individual scope, deliverables and commercial terms are agreed
        separately. No purchase or payment is taken through this website.
      </p>
    </LegalLayout>
  );
}
