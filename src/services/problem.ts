import axios from '@/services/axios';
import type { Problem, NewProblem } from '@/types/Problem';

export const createProblemRequest = async (
  projectId: string,
  data: NewProblem
) => {
  const response = await axios.post<Problem>(
    `/projects/${projectId}/problems`,
    data
  );
  return response.data;
};

export const updateProblemRequest = async (
  projectId: string,
  problemId: string,
  data: Partial<Problem>
) => {
  const response = await axios.put<Problem>(
    `/projects/${projectId}/problems/${problemId}`,
    data
  );
  return response.data;
};

export const deleteProblemRequest = async (
  projectId: string,
  problemId: string
) => {
  await axios.delete(`/projects/${projectId}/problems/${problemId}`);
};
