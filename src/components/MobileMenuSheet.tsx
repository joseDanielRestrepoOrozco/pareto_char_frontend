import { Link } from 'react-router-dom';
import { BarChart3, LogIn, Menu, UserPlus } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useState } from 'react';

const MobileMenuSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon">
          <Menu />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] bg-gold-light"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-base" />
            <span className="text-blue-base font-bold">ParetoAnalytics</span>
          </SheetTitle>
          <SheetDescription className="text-blue-dark">
            Accede a tu cuenta o regístrate para comenzar
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col space-y-4 mt-8 pt-8 border-t border-gold-base mx-4">
          <Link
            to="/login"
            className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2 flex items-center justify-center space-x-2 no-underline"
            onClick={() => setIsOpen(false)}
          >
            <LogIn className="h-4 w-4" />
            <span>Iniciar Sesión</span>
          </Link>
          <Link
            to="/register"
            className="w-full bg-gold-base hover:bg-gold-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2 flex items-center justify-center space-x-2 no-underline"
            onClick={() => setIsOpen(false)}
          >
            <UserPlus className="h-4 w-4" />
            <span>Registrarse</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuSheet;
