import Hero         from "@/components/sections/Hero";
import StatsBar     from "@/components/sections/StatsBar";
import Services     from "@/components/sections/Services";
import Komplett     from "@/components/sections/Komplett";
import HowItWorks   from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner    from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
       <main>
        <Hero />
        <StatsBar />
        <Services />
        <Komplett />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>
      </>
  );
}
