import React from 'react';
import Navbar from '@/sections/Navbar';
import HeroSection from '@/sections/HeroSection';
import ParetoUsage from '@/sections/ParetoUsage';
import Footer from '@/sections/Footer';
import ParetoExplanation from '@/sections/ParetoExplanation';
import CTASection from '@/sections/CTA';

const Home: React.FC = () => {
  return (
    <div className="min-h-dvh grid grid-template-rows-[auto_1fr_auto]">
      <Navbar />
      <main>
        <HeroSection />
        <ParetoExplanation />
        <ParetoUsage />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
