import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserSelectionsThunk } from './createUserSelectionsThunk';
import { compareUserSelectionsThunk } from './compareUserSelectionsThunk';

export interface ComparisonResult {
    commonPoints: number;
    message: string;
  }

interface SelectionState {
  selections:any;
  comparisonResult: ComparisonResult | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: SelectionState = {
  selections: [],
  comparisonResult: null,
  status: 'idle',
  error: undefined,
};


const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
      // Définir les reducers si nécessaire
    },
    extraReducers: (builder) => {
      builder
        // Pour createUserSelectionsThunk
        .addCase(createUserSelectionsThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createUserSelectionsThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.selections = action.payload;
        })
        .addCase(createUserSelectionsThunk.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        // Pour compareUserSelectionsThunk
        .addCase(compareUserSelectionsThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(compareUserSelectionsThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.comparisonResult = action.payload;
        })
        .addCase(compareUserSelectionsThunk.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export default selectionSlice.reducer;
  