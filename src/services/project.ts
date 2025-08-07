import axios from '@/services/axios';
import type { Project, NewProject } from '@/types/Project';

export const createProjectRequest = async (data: NewProject) => {
  const response = await axios.post<Project>('/projects', data);
  return response.data;
};

export const updateProjectRequest = async (
  id: string,
  data: Partial<Project>
) => {
  const response = await axios.put<Project>(`/projects/${id}`, data);
  return response.data;
};

export const deleteProjectRequest = async (id: string) => {
  await axios.delete(`/projects/${id}`);
};

export const getProjectRequest = async (id: string) => {
  const response = await axios.get<Project>(`/projects/${id}`);
  return response.data;
};

export const getAllProjectsRequest = async () => {
  const response = await axios.get<Project[]>('/projects');
  return response.data;
};
