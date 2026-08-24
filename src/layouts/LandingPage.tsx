import PublicNav from '../components/navigation/PublicNav';
import Hero from '../components/landing/Hero';
import MarketsSection from '../components/landing/MarketsSection';
import PortfolioSection from '../components/landing/PortfolioSection';
import BotsSection from '../components/landing/BotsSection';
import StrategiesPinned from '../components/landing/StrategiesPinned';
import FeaturesSection from '../components/landing/FeaturesSection';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/navigation/Footer';
import { ScrollTrigger } from '../lib/gsap';
import { useEffect } from 'react';

function LandingPage() {
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <PublicNav />
      <main>
        <Hero />
        <MarketsSection />
        <PortfolioSection />
        <BotsSection />
        <StrategiesPinned />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
