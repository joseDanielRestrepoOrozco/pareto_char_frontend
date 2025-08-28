import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Plus, LogOut } from 'lucide-react';
import { useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MobileContentProps {
  onClose: () => void;
}

const MobileContent = ({ onClose }: MobileContentProps) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { logout } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleLogout = () => {
    setOpen(true);
  };
  const confirmLogout = () => {
    setOpen(false);
    logout();
    onClose();
  };

  if (isAuthenticated) {
    // Contenido para usuarios autenticados
    return (
      <div className="flex flex-col space-y-4 pt-8 mx-4">
        <Link
          to="/dashboard"
          className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2 flex items-center justify-center space-x-2 no-underline"
          onClick={onClose}
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Proyecto</span>
        </Link>

        <Dialog open={open} onOpenChange={setOpen}>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Cerrar sesión?</DialogTitle>
            </DialogHeader>
            <p>¿Estás seguro de que deseas cerrar la sesión?</p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button variant="destructive" onClick={confirmLogout} autoFocus>
                Cerrar sesión
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Contenido para usuarios no autenticados
  return (
    <div className="flex flex-col space-y-4 pt-8 mx-4">
      <Link
        to="/login"
        className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2 flex items-center justify-center space-x-2 no-underline"
        onClick={onClose}
      >
        <LogIn className="h-4 w-4" />
        <span>Iniciar Sesión</span>
      </Link>
      <Link
        to="/register"
        className="w-full bg-gold-base hover:bg-gold-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2 flex items-center justify-center space-x-2 no-underline"
        onClick={onClose}
      >
        <UserPlus className="h-4 w-4" />
        <span>Registrarse</span>
      </Link>
    </div>
  );
};

export default MobileContent;
