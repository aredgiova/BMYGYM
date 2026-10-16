import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link
            href="/#home"
            className="footer-wordmark"
            aria-label="BMYGYM home"
          >
            BMYGYM
          </Link>
          <p>Bespoke Longevity Environments</p>
        </div>
        <div className="footer-contact">
          <span>Valencia, Spain</span>
          <a href="mailto:hello@bmygym.com">
            hello@bmygym.com
            <Arrow diagonal />
          </a>
        </div>
        <Link href="/#home" className="back-top">
          Back to top
          <Arrow diagonal />
        </Link>
      </div>
      <div className="footer-bottom">
        <small>© 2026 BMYGYM. All rights reserved.</small>
        <nav aria-label="Legal information">
          <Link href="/legal">Legal Notice</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookies">Cookie Policy</Link>
          <details className="cookie-settings">
            <summary>Cookie Settings</summary>
            <div>
              <strong>Your privacy, by design.</strong>
              <p>
                This site currently uses no analytics, advertising or other
                non-essential cookies. There are no optional cookies to accept
                or reject.
              </p>
              <Link href="/cookies">Read the cookie policy</Link>
            </div>
          </details>
          <Link href="/accessibility">Accessibility</Link>
        </nav>
      </div>
    </footer>
  );
}
