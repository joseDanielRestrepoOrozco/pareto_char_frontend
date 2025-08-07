import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-base" >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para Optimizar tus Procesos?
        </h3>
        <p className="text-xl text-gold-light mb-8">
          Únete a profesionales que ya utilizan el análisis de Pareto
          para mejorar su productividad y resultados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-gradient-to-r from-gold-light to-gold-base hover:from-gold-base hover:to-gold-light text-[#00284d] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
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
