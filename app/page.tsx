import { ContactCTA } from "@/components/ContactCTA";
import { FloorPlans } from "@/components/FloorPlans";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InvestmentCase } from "@/components/InvestmentCase";
import { Location } from "@/components/Location";
import { Manifesto } from "@/components/Manifesto";
import { Navbar } from "@/components/Navbar";
import { Offering } from "@/components/Offering";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Specifications } from "@/components/Specifications";
import { StickyContactBar } from "@/components/StickyContactBar";
import { TonalTransition } from "@/components/TonalTransition";
import { VerticalTour } from "@/components/VerticalTour";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Offering />
        <TonalTransition />
        <VerticalTour />
        <FloorPlans />
        <Specifications />
        <Location />
        <InvestmentCase />
        <ContactCTA />
      </main>
      <Footer />
      <StickyContactBar />
    </>
  );
}
