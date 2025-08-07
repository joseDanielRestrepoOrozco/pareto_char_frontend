import React from 'react';
import DashboardCard from '@/components/ui/dashboard-card';
import { useParetoChartData } from '@/hooks/useParetoData';
import ParetoChart from '@/components/ParetoChart';

const ParetoChartSection: React.FC = () => {
  const chartData = useParetoChartData();

  if (!chartData || chartData.length === 0) {
    return null;
  }

  return (
    <DashboardCard
      title="Diagrama de Pareto"
      description="Visualización de frecuencias ordenadas y porcentaje acumulativo"
      variant="bordered"
    >
      <ParetoChart data={chartData} />
    </DashboardCard>
  );
};

export default ParetoChartSection;
