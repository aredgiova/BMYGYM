import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/features/home/hero";
import { WorkWithUs } from "@/features/home/work-with-us";
import { Philosophy } from "@/features/home/philosophy";
import { Environments } from "@/features/home/environments";
import { Blueprint } from "@/features/home/blueprint";
import { Approach } from "@/features/home/approach";
import { Vision } from "@/features/home/vision";
import { EnquirySection } from "@/features/enquiry/enquiry-section";

import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({params}: {params: Promise<{locale:string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  const {common, home} = await getDictionary(locale);
  return (
    <>
      <Header locale={locale} copy={common.nav} />
      <main id="main-content" tabIndex={-1}>
        <Hero copy={home} />
        <WorkWithUs copy={home} />
        <Philosophy copy={home} />
        <Environments copy={home} />
        <Blueprint copy={home} />
        <Approach copy={home} />
        <Vision copy={home} />
        <EnquirySection locale={locale} copy={common} />
      </main>
      <Footer locale={locale} copy={common.footer} homeLabel={common.nav.home} />
    </>
  );
}
