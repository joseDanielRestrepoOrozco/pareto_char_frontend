import axios from '@/services/axios';
import type { Analysis } from '@/types/Analysis';

export const getAnalysis = async (projectId: string) => {
  const response = await axios.get<Analysis>(`/analysis/${projectId}`);
  return response.data;
};
