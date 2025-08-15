import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import Analysis from '@/sections/Analysis';
import DataForm from '@/sections/DataForm';
import DataTable from '@/sections/DataTable';
import ParetoChartSection from '@/sections/ParetoChartSection';
import ProjectForm from '@/sections/ProjectForm';
import { useParams } from 'react-router-dom';

const ProjectDashboard = () => (
  <>
    <div className="grid gap-6 md:grid-cols-2">
      <DataForm />
      <DataTable />
    </div>
    <ParetoChartSection />
    <Analysis />
  </>
);

const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, currentProject } = useDashboard(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout project={currentProject}>
      {!id ? <ProjectForm /> : <ProjectDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
