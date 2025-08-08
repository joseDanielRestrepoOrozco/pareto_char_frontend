import React from 'react';
import { LogIn, UserPlus, Plus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const DesktopNavContent: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    // Contenido para usuarios autenticados en desktop
    return (
      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="text-gold-light hover:text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer flex items-center"
        >
          <Plus className="inline-block mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Link>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="text-gold-light border-gold-light hover:bg-gold-light hover:text-blue-base px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer flex items-center"
        >
          <LogOut className="inline-block mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    );
  }

  // Contenido para usuarios no autenticados en desktop
  return (
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
  );
};

export default DesktopNavContent;
