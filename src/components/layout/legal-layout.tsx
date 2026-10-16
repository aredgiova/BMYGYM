import { Header } from "./header";
import { Footer } from "./footer";
import { TextLink } from "@/components/ui/text-link";

export function LegalLayout({
  title,
  draft = false,
  children,
}: {
  title: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isHome={false} />
      <main id="main-content" tabIndex={-1} className="section legal-page">
        <h1>{title}</h1>
        {draft && (
          <p className="draft-notice">
            Preview document. Business details and this notice must be completed
            and reviewed before this website is published.
          </p>
        )}
        {children}
        <TextLink href="/#enquiry">Return to private enquiry</TextLink>
      </main>
      <Footer />
    </>
  );
}
