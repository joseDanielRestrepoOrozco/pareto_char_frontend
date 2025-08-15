import React from 'react';
import DashboardCard from '@/components/ui/dashboard-card';
import ParetoChart from '@/components/ParetoChart';
import { useAppSelector } from '@/hooks/store';

const ParetoChartSection: React.FC = () => {
  const data = useAppSelector(state => state.analysis.data);

  if (data.length === 0) {
    return null;
  }

  return (
    <DashboardCard
      title="Diagrama de Pareto"
      description="Visualización de frecuencias ordenadas y porcentaje acumulativo"
      variant="bordered"
    >
      <ParetoChart data={data} />
    </DashboardCard>
  );
};

export default ParetoChartSection;
