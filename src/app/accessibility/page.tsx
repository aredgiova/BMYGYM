import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Accessibility",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility">
      <p>
        BMYGYM aims to make its website clear and usable across devices and ways
        of browsing.
      </p>
      <h2>Using this website</h2>
      <p>
        You can navigate links and form controls using a keyboard. A “Skip to
        content” link is available at the beginning of each page. The mobile
        navigation can be closed with Escape. Images include descriptive
        alternatives, forms use visible labels, and the website respects your
        reduced-motion preference.
      </p>
      <h2>Contact us</h2>
      <p>
        If you encounter a barrier or would prefer to enquire directly, please
        email <a href="mailto:hello@bmygym.com">hello@bmygym.com</a>. Include
        the page and any information that would help us understand the issue.
      </p>
      <p>
        This information does not constitute a formal accessibility
        certification.
      </p>
    </LegalLayout>
  );
}
