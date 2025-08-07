import {
  appendProject,
  clearProjects,
  removeProject,
  setProjects,
  updateProject,
} from '@/store/project/slice';
import { useAppDispatch } from '@/hooks/store';
import type { Project, NewProject } from '@/types/Project';
import {
  createProjectRequest,
  deleteProjectRequest,
  getAllProjectsRequest,
} from '@/services/project';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useProjectActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addProject = async (project: NewProject) => {
    const createdProject = await createProjectRequest(project);
    dispatch(appendProject(createdProject));
    navigate(`/dashboard/${createdProject.id}`);
  };

  const deleteProject = (id: string) => {
    toast.promise(deleteProjectRequest(id), {
      success: () => {
        dispatch(removeProject(id));
        return 'Proyecto eliminado correctamente';
      },
      error: () => {
        return 'Error al eliminar proyecto';
      },
    });
  };

  const modifyProject = (id: string, changes: Partial<Project>) => {
    dispatch(updateProject({ id, changes }));
  };

  const setAllProjects = async () => {
    try {
      const projects = await getAllProjectsRequest();
      dispatch(setProjects(projects));
    } catch (error) {
      toast.error('Error al cargar los proyectos');
      console.error('Error loading projects:', error);
    }
  };

  const clearAllProjects = () => {
    dispatch(clearProjects());
  };

  return {
    addProject,
    deleteProject,
    modifyProject,
    setAllProjects,
    clearAllProjects,
  };
};
