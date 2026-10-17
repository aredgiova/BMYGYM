import Image from "next/image";
import { Arrow } from "@/components/ui/arrow";
import { TextLink } from "@/components/ui/text-link";

export function Hero() {
  return (
    <>
      <section id="home" className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/hero-residence.webp"
          alt="BMYGYM residence concept integrating a fitness wall, recovery capsule and Pilates reformer beside an indoor pool"
          fill
          priority
          sizes="(max-width: 767px) 1200px, 100vw"
          quality={90}
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1 id="hero-title">
            Designed around you.
            <br />
            <em>
              Created for
              <br className="hero-break" /> exceptional spaces.
            </em>
          </h1>
          <p className="hero-service">Bespoke Longevity Environments</p>
          <div className="hero-actions">
            <a className="button button-ivory" href="#enquiry">
              Begin a private enquiry
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            Land <i /> Sea <i /> Air
          </span>
          <span className="hero-caption">BMYGYM concept visualisation</span>
          <a href="#philosophy" aria-label="Scroll to our philosophy">
            Discover BMYGYM
            <svg width="15" height="22" viewBox="0 0 15 22" fill="none" aria-hidden="true">
              <path d="M7.5 1v19M1 14l6.5 6 6.5-6" stroke="currentColor" />
            </svg>
          </a>
        </div>
      </section>
      <section
        className="section hero-introduction"
        aria-label="Bespoke longevity, considered individually"
      >
        <p className="hero-description">
          BMYGYM conceives bespoke wellness, movement, recovery and longevity
          environments for exceptional residences, superyachts, luxury
          hospitality and private aviation.
        </p>
        <div className="hero-introduction-detail">
          <p className="hero-secondary">
            From integrating carefully selected solutions to conceiving entirely
            new concepts, every project begins with your individual vision.
          </p>
          <TextLink href="#approach">Explore our approach</TextLink>
        </div>
      </section>
    </>
  );
}
