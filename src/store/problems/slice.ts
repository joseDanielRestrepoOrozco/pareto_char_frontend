import type { Problem } from '@/types/Problem';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: Problem[] = [];

const problemSlice = createSlice({
  name: 'problem',
  initialState,
  reducers: {
    appendProblem: (state, action: PayloadAction<Problem>) => {
      state.push(action.payload);
    },
    removeProblem: (state, action: PayloadAction<string>) => {
      return state.filter(p => p.id !== action.payload);
    },
    updateProblem: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Problem> }>
    ) => {
      const { id, changes } = action.payload;
      return state.map(problem =>
        problem.id === id ? { ...problem, ...changes } : problem
      );
    },
    setProblems: (_state, action: PayloadAction<Problem[]>) => {
      return action.payload;
    },
    clearProblems: () => {
      return [];
    },
  },
});

export const {
  appendProblem,
  removeProblem,
  clearProblems,
  setProblems,
  updateProblem,
} = problemSlice.actions;

export default problemSlice.reducer;
