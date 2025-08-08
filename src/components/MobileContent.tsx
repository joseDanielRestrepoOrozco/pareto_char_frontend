import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Plus, LogOut } from 'lucide-react';
import { useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';

interface MobileContentProps {
  onClose: () => void;
}

const MobileContent = ({ onClose }: MobileContentProps) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { logout } = useAuth();

  const handleLogout = () => {
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

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </button>
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
