import React from 'react';
import { BarChart3, LogIn, UserPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import MobileMenuSheet from './MobileMenuSheet';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-blue-base shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-gold-light " />
          <h1 className="text-2xl font-bold text-white">ParetoAnalytics</h1>
        </div>
        {!isMobile ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-gold-light hover:text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            >
              <LogIn className="inline-block mr-2" />
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-gold-base hover:bg-gold-dark text-blue-base px-6 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer"
            >
              <UserPlus className="inline-block mr-2" />
              Registrarse
            </Link>
          </div>
        ) : (
          <MobileMenuSheet />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
