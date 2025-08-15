import {
  appendProblem,
  clearProblems,
  removeProblem,
  setProblems,
  updateProblem
} from '@/store/problems/slice';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import type { Problem, NewProblem } from '@/types/Problem';
import {
  createProblemRequest,
  deleteProblemRequest,
  updateProblemRequest
} from '@/services/problem';
import { toast } from 'sonner';

export const useProblemActions = () => {
  const dispatch = useAppDispatch();
  const problems = useAppSelector(state => state.problems);

  const addProblem = async (projectId: string, problem: NewProblem) => {
    // Verificar límite de problemas antes de hacer la petición al backend
    if (problems.length >= 10) {
      toast.error('No puedes agregar más de 10 problemas por proyecto');
      return;
    }

    try {
      const createdProblem = await createProblemRequest(projectId, problem);
      dispatch(appendProblem(createdProblem));
      toast.success('Problema agregado correctamente');
      return createdProblem;
    } catch (error) {
      toast.error('Error al agregar el problema');
      console.error('Error creating problem:', error);
    }
  };

  const deleteProblem = (problemId: string) => {
    toast.promise(deleteProblemRequest(problemId), {
      loading: 'Eliminando problema...',
      success: () => {
        dispatch(removeProblem(problemId));
        return 'Problema eliminado correctamente';
      },
      error: () => {
        return 'Error al eliminar el problema';
      }
    });
  };

  const modifyProblem = async (
    problemId: string,
    changes: Partial<Problem>
  ) => {
    try {
      const updatedProblem = await updateProblemRequest(problemId, changes);
      dispatch(updateProblem({ id: problemId, changes: updatedProblem }));
      toast.success('Problema actualizado correctamente');
    } catch (error) {
      toast.error('Error al actualizar el problema');
      console.error('Error updating problem:', error);
    }
  };

  const setAllProblems = (problems: Problem[]) => {
    dispatch(setProblems(problems));
  };

  const clearAllProblems = () => {
    dispatch(clearProblems());
  };

  return {
    addProblem,
    deleteProblem,
    modifyProblem,
    setAllProblems,
    clearAllProblems
  };
};
