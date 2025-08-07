import { BookOpen, Eye, Lightbulb, ArrowRight } from 'lucide-react';
import ProcessStep from '@/components/ProcessStep';
import FeatureCard from '@/components/FeatureCard';

const ParetoUsageSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-blue-base mb-4">
            Cómo Funciona Nuestra Herramienta de Pareto
          </h3>
          <p className="text-xl text-blue-dark max-w-3xl mx-auto">
            Simplificamos el análisis de Pareto para ti. Solo ingresa tus datos
            y nosotros nos encargamos de todo el proceso automáticamente.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Proceso simplificado */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-base mb-6">
              Proceso Automatizado
            </h4>

            <ProcessStep stepNumber={1} title="Ingresa tus Datos">
              Solo necesitas el nombre del problema y su frecuencia. Nuestra
              aplicación acepta cualquier tipo de datos.
            </ProcessStep>
            <ProcessStep stepNumber={2} title="Procesamiento Automático">
              La aplicación ordena automáticamente tus datos de mayor a menor
              frecuencia y calcula todos los porcentajes.
            </ProcessStep>
            <ProcessStep stepNumber={3} title="Generación del Gráfico">
              Se genera automáticamente el diagrama de Pareto con barras de
              frecuencia y línea de porcentaje acumulado.
            </ProcessStep>
            <ProcessStep stepNumber={4} title="Análisis de Resultados">
              La aplicación identifica automáticamente las causas principales
              (80/20) y te muestra recomendaciones de acción.
            </ProcessStep>
          </div>

          {/* Lo que obtienes */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-base mb-6">
              Lo que Obtienes Automáticamente
            </h4>

            <div className="bg-gradient-to-br from-blue-base to-blue-dark p-6 rounded-xl text-white">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-gold-light mr-3" />
                <h5 className="font-bold text-lg">
                  Identificación Automática del 80/20
                </h5>
              </div>
              <p className="text-gold-light mb-4">
                La aplicación marca automáticamente el punto donde el 20% de las
                causas generan el 80% del impacto total.
              </p>
              <div className="bg-gold-light p-3 rounded-lg">
                <p className="text-blue-base font-medium">
                  💡 Destacamos visualmente tus prioridades críticas para
                  enfocar tus esfuerzos
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <FeatureCard
                icon={BookOpen}
                title="Gráfico Profesional"
                description="Diagrama completo con barras de frecuencia y curva acumulativa, listo para presentaciones."
              />

              <FeatureCard
                icon={Lightbulb}
                title="Recomendaciones Inteligentes"
                description="Sugerencias automáticas sobre qué problemas priorizar basadas en el análisis de Pareto."
              />
            </div>

            <div className="bg-gold-light p-6 rounded-xl border border-gold-base">
              <h5 className="font-bold text-blue-base mb-3 flex items-center">
                <ArrowRight className="h-5 w-5 mr-2" />
                Resultados Instantáneos
              </h5>
              <ul className="space-y-2 text-blue-dark">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-base rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lista ordenada de problemas por impacto
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-base rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Porcentajes individuales y acumulados calculados
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-base rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Identificación clara de las causas del 80% del problema
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParetoUsageSection;
