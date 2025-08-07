import { BarChart3, CheckCircle } from 'lucide-react';

const ListItem = ({ content }: { content: React.ReactNode }) => (
  <li className="flex items-center text-blue-dark">
    <CheckCircle className="h-5 w-5 text-blue-base mr-3" />
    {content}
  </li>
);

const ParetoExplanation = () => {
  return (
    <section className="py-16 bg-gold-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-blue-base mb-4">
            ¿Qué es el Diagrama de Pareto?
          </h3>
          <p className="text-xl text-blue-dark max-w-3xl mx-auto">
            Una herramienta de análisis que te ayuda a identificar los problemas
            más significativos y enfocar tus esfuerzos donde realmente importa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#045389]">
              <h4 className="text-2xl font-bold text-blue-base mb-4">
                Principio 80/20
              </h4>
              <p className="text-blue-dark mb-6">
                El 80% de los efectos provienen del 20% de las causas. Esta
                regla universal se aplica en negocios, productividad personal, y
                análisis de calidad.
              </p>
              <ul className="space-y-3">
                <ListItem content="Identifica problemas críticos" />
                <ListItem content="Prioriza recursos eficientemente" />
                <ListItem content="Maximiza el impacto de acciones" />
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="h-64 bg-gradient-to-r from-blue-base to-blue-dark rounded-lg flex items-center justify-center">
              <BarChart3 className="h-24 w-24 text-gold-light" />
            </div>
            <p className="text-center text-blue-dark mt-4 font-medium">
              Visualización clara de datos para análisis efectivo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParetoExplanation;
