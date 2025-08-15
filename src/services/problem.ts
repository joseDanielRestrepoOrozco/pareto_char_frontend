import axios from '@/services/axios';
import type { Problem, NewProblem } from '@/types/Problem';

export const createProblemRequest = async (
  projectId: string,
  data: NewProblem
) => {
  const response = await axios.post<Problem>(`/problems/${projectId}`, data);
  return response.data;
};

export const updateProblemRequest = async (
  problemId: string,
  data: Partial<Problem>
) => {
  const response = await axios.put<Problem>(
    `/problems/${problemId}`,
    data
  );
  return response.data;
};

export const deleteProblemRequest = async (
  problemId: string
) => {
  await axios.delete(`/problems/${problemId}`);
};
