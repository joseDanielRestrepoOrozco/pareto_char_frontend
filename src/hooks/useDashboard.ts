import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getProjectRequest } from '@/services/project';
import type { Project } from '@/types/Project';
import { useProblemActions } from '@/hooks/useProblemActions';
import { useProjectActions } from '@/hooks/useProjectActions';
import { useAnalysisActions } from './useAnalysisActions';
import { useAppSelector } from './store';

export const useDashboard = (projectId?: string) => {
  const { setAllProblems } = useProblemActions();
  const { setAllProjects } = useProjectActions();
  const { loadAnalysis } = useAnalysisActions();
  const problems = useAppSelector(state => state.problems);

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
        if (!projectId) {
          setCurrentProject(null);
          setAllProblems([]);
          return;
        }

        const project = await getProjectRequest(projectId);
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
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadAnalysis(projectId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problems]);

  return {
    isLoading,
    currentProject
  };
};
