import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => (
  <section className="bg-gradient-to-br from-blue-base via-blue-light to-blue-base text-white relative py-20 lg:py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Domina el <span className="text-gold-light ">Principio de Pareto</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gold-light max-w-4xl mx-auto leading-relaxed">
          Descubre cómo el 80% de los resultados provienen del 20% de las
          causas. Optimiza tu productividad y toma decisiones más inteligentes
          con análisis de Pareto.
        </p>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Link
            to="/register"
            className="bg-gold-base hover:bg-gold-dark text-blue-dark px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            Comenzar Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
