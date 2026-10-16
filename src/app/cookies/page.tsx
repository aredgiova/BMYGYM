import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" draft>
      <h2>Current website configuration</h2>
      <p>
        This first version does not install analytics, advertising, tracking
        pixels, embedded social widgets or other optional cookie-based services.
        Fonts and images are served by the website itself.
      </p>
      <h2>Your preferences</h2>
      <p>
        There are currently no non-essential cookies to accept or reject. You
        can review the current status at any time using Cookie Settings in the
        footer.
      </p>
      <h2>Before adding optional services</h2>
      <p>
        If optional tracking or embedded services are introduced, this notice
        and the consent controls must be updated so visitors can accept, reject
        or later change their preferences before those services load.
      </p>
      <p>
        The final production hosting configuration and cookie inventory must be
        checked before publication.
      </p>
    </LegalLayout>
  );
}
