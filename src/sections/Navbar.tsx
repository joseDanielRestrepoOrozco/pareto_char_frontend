import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenuSheet from '@/components/MobileMenuSheet';
import Logo from '@/components/Logo';
import DesktopNavContent from '@/components/DesktopNavContent';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-blue-base shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Logo showText={!isMobile} size={isMobile ? 32 : 40} />
        {!isMobile ? <DesktopNavContent /> : <MobileMenuSheet />}
      </nav>
    </header>
  );
};

export default Navbar;
