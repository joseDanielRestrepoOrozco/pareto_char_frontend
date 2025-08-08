import { useAppSelector } from '@/hooks/store';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  // Contenido para usuarios autenticados
  if (isAuthenticated) {
    return (
      <section className="py-16 bg-blue-base">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¡Continúa Optimizando tus Procesos!
          </h3>
          <p className="text-xl text-gold-light mb-8">
            Accede a tu dashboard para crear nuevos análisis y gestionar tus
            proyectos de Diagrama de Pareto.
          </p>
          <div className="flex justify-center">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-gold-light to-gold-base hover:from-gold-base hover:to-gold-light text-blue-dark px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Crear Nuevo Proyecto
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Contenido para usuarios no autenticados
  return (
    <section className="py-16 bg-blue-base">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para Optimizar tus Procesos?
        </h3>
        <p className="text-xl text-gold-light mb-8">
          Únete a profesionales que ya utilizan Diagrama de Pareto para mejorar
          su productividad y resultados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-gradient-to-r from-gold-light to-gold-base hover:from-gold-base hover:to-gold-light text-blue-dark px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Crear Cuenta Gratuita
          </Link>
          <Link
            to="/login"
            className="border-2 border-gold-light text-gold-light hover:bg-gold-light hover:text-blue-dark px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
          >
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
