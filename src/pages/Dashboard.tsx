import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useProblemActions } from '@/hooks/useProblemActions';
import { useProjectActions } from '@/hooks/useProjectActions';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import Analysis from '@/sections/Analysis';
import DataForm from '@/sections/DataForm';
import DataTable from '@/sections/DataTable';
import ParetoChartSection from '@/sections/ParetoChartSection';
import ProjectForm from '@/sections/ProjectForm';
import { getProjectRequest } from '@/services/project';
import type { Project } from '@/types/Project';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

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
  const { setAllProblems } = useProblemActions();
  const { setAllProjects } = useProjectActions();
  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      await setAllProjects();
    };
    loadProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadCurrentProject = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          setCurrentProject(null);
          setAllProblems([]);
          return;
        }

        const project = await getProjectRequest(id);
        setCurrentProject(project);
        setAllProblems(project.problems || []);
      } catch (error) {
        toast.error('Error al cargar los datos');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentProject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
