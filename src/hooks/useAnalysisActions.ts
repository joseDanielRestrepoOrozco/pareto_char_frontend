import { getAnalysis } from '@/services/analysis';
import { useAppDispatch } from './store';
import { setAnalysis, clearAnalysis } from '@/store/analysis/slice';

export const useAnalysisActions = () => {
  const dispatch = useAppDispatch();

  // Avoid name collision with the Redux action `setAnalysis`
  const loadAnalysis = async (id: string) => {
    const analysis = await getAnalysis(id);
    dispatch(setAnalysis(analysis));
  };

  const clearAllAnalysis = () => {
    dispatch(clearAnalysis());
  };

  return {
    loadAnalysis,
    clearAllAnalysis
  };
};
