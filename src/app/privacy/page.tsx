import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" draft>
      <p>
        This preview describes the enquiry functionality prepared for BMYGYM. It
        is not a final approved privacy notice.
      </p>
      <h2>Information you provide</h2>
      <p>
        The private enquiry form requests your full name, email address, project
        type and project description. You may also provide your company and
        project location. Please do not include sensitive health information in
        an enquiry.
      </p>
      <h2>Purpose and delivery</h2>
      <p>
        Information is used to respond to your project enquiry. When email
        delivery is configured, the form sends it through Resend to BMYGYM at{" "}
        <a href="mailto:hello@bmygym.com">hello@bmygym.com</a>. This website
        does not store enquiries in an application database.
      </p>
      <h2>Contact</h2>
      <p>
        For questions about information you share, contact{" "}
        <a href="mailto:hello@bmygym.com">hello@bmygym.com</a>.
      </p>
      <h2>Information pending before publication</h2>
      <p>
        The final notice must identify the legal data controller and contact
        address, applicable lawful basis, retention periods, processor
        arrangements, any international transfer safeguards, and how to exercise
        applicable rights or contact the competent supervisory authority.
      </p>
      <p>
        These details have not yet been supplied or approved. The final notice
        will be based on the actual business and its handling of enquiries.
      </p>
    </LegalLayout>
  );
}
