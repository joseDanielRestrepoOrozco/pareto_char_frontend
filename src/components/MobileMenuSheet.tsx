import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store';
import MobileAuthContent from '@/components/MobileContent';
import logoUcaldas from '@/assets/images/logo.jpg';

const MobileMenuSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAppSelector(state => state.auth);

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
            <img
              src={logoUcaldas}
              alt="Logo"
              className="h-6 w-6 rounded object-cover"
            />
            <span className="text-blue-base font-bold">Diagrama de Pareto</span>
          </SheetTitle>
          <SheetDescription className="text-blue-dark">
            {isAuthenticated
              ? 'Gestiona tus proyectos y análisis'
              : 'Accede a tu cuenta o regístrate para comenzar'}
          </SheetDescription>
        </SheetHeader>

        <MobileAuthContent onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuSheet;
