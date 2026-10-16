import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/features/home/hero";
import { Philosophy } from "@/features/home/philosophy";
import { Environments } from "@/features/home/environments";
import { Blueprint } from "@/features/home/blueprint";
import { Approach } from "@/features/home/approach";
import { Vision } from "@/features/home/vision";
import { EnquirySection } from "@/features/enquiry/enquiry-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Philosophy />
        <Environments />
        <Blueprint />
        <Approach />
        <Vision />
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
