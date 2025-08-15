import type { Analysis } from '@/types/Analysis';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: Analysis = {
  data: [],
  threshold: 0,
  topCause: '',
  totalCategories: 0,
  totalFrequency: 0
};

const slice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setAnalysis: (_state, action: PayloadAction<Analysis>) => {
      return action.payload;
    },
    clearAnalysis: () => {
      return initialState;
    }
  }
});

export const { setAnalysis, clearAnalysis } = slice.actions;
export default slice.reducer;
