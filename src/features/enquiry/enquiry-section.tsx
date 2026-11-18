import Image from "next/image";
import { EnquiryForm } from "./enquiry-form";
import { Arrow } from "@/components/ui/arrow";
import type { Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";

export function EnquirySection({locale, copy}: {locale: Locale; copy: CommonCopy}) {
  const text = copy.enquiry;
  return (
    <section id="enquiry" className="section enquiry" aria-labelledby="enquiry-title">
      <div className="enquiry-intro">
        <h2 id="enquiry-title">{text.title}</h2>
        <p className="enquiry-subtitle">{text.emphasis}</p>
        <p>{text.intro}</p>
        <p className="enquiry-audience">{text.audience}</p>
        <p>{text.commission}</p>
        <a className="enquiry-email" href="mailto:hello@bmygym.com"><bdi dir="ltr">hello@bmygym.com</bdi><Arrow diagonal /></a>
        <div className="founder-profile">
          <Image
            className="founder-portrait"
            src="/images/bojana-pesic.jpeg"
            alt="Bojana Pesic"
            width={1034}
            height={973}
            unoptimized
          />
          <p className="founder-signature"><bdi dir="ltr" lang="en">Bojana Pesic</bdi><span>{text.founder}</span></p>
        </div>
      </div>
      <EnquiryForm locale={locale} copy={copy} />
    </section>
  );
}
