import type { Project } from '@/types/Project';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: Project[] = [];

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    appendProject: (state, action: PayloadAction<Project>) => {
      state.push(action.payload);
    },
    updateProject: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Project> }>
    ) => {
      const { id, changes } = action.payload;
      const index = state.findIndex(project => project.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      return state.filter(project => project.id !== action.payload);
    },
    setProjects: (_state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
    clearProjects: () => {
      return [];
    },
  },
});

export const {
  appendProject,
  updateProject,
  removeProject,
  setProjects,
  clearProjects,
} = projectSlice.actions;

export default projectSlice.reducer;
