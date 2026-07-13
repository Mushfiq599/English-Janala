import HeroSlider from "@/components/landing/HeroSlider";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import StatsSection from "@/components/landing/StatsSection";
import CTABanner from "@/components/landing/CTABanner";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <CTABanner />
      <SiteFooter />
    </main>
  );
}