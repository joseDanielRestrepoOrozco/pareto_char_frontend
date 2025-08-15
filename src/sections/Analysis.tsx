import DashboardCard from '@/components/ui/dashboard-card';
import { useAppSelector } from '@/hooks/store';

const Analysis: React.FC = () => {
  const analysis = useAppSelector(state => state.analysis);

  if (analysis.data.length === 0) return null;

  return (
    <DashboardCard
      title="Datos Detallados"
      description="Información completa de frecuencias y porcentajes acumulados"
      variant="bordered"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2" style={{ borderColor: '#d5bb87' }}>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: '#00284d' }}
              >
                Categoría
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: '#00284d' }}
              >
                Frecuencia
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: '#00284d' }}
              >
                Porcentaje
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: '#00284d' }}
              >
                Acumulado
              </th>
              <th
                className="text-left p-3 font-semibold"
                style={{ color: '#00284d' }}
              >
                % Acumulado
              </th>
            </tr>
          </thead>
          <tbody>
            {analysis.data.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-opacity-50 transition-colors"
                style={{
                  borderColor: '#efd9af',
                  backgroundColor: row.isCritical
                    ? '#d5bb8720'
                    : index % 2 === 0
                    ? '#ffffff'
                    : '#efd9af20'
                }}
              >
                <td
                  className="p-3 font-medium flex items-center gap-2"
                  style={{ color: '#003e70' }}
                >
                  {row.isCritical && (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#d5bb87' }}
                    ></div>
                  )}
                  {row.category}
                  {row.isCritical && (
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: '#b5a27c' }}
                    >
                      80/20
                    </span>
                  )}
                </td>
                <td className="p-3" style={{ color: '#00284d' }}>
                  {row.frequency}
                </td>
                <td className="p-3" style={{ color: '#00284d' }}>
                  {row.percentage.toFixed(1)}%
                </td>
                <td className="p-3" style={{ color: '#00284d' }}>
                  {row.cumulativeFrequency}
                </td>
                <td
                  className="p-3 font-semibold"
                  style={{ color: row.isCritical ? '#b5a27c' : '#045389' }}
                >
                  {row.cumulativePercentage.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default Analysis;
