import { LegalLayout } from "@/components/layout/legal-layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <LegalLayout title="A different direction.">
      <p>
        The page you are looking for could not be found. Explore BMYGYM’s
        bespoke longevity environments or begin a private conversation about
        your project.
      </p>
      <Link className="button button-dark" href="/">
        Return to BMYGYM
      </Link>
    </LegalLayout>
  );
}
