import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRankings } from './getRankingThunk';
import { Rank } from '@/types';

// Définir l'état initial
interface RankingState {
    rankings: Rank[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
  }
  
  const initialState: RankingState = {
    rankings: [],
    status: 'idle',
    error: undefined,
  };

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    // Définir les reducers si nécessaire
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Ajoutez les classements à l'état
        state.rankings = action.payload;
      })
      .addCase(fetchRankings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default rankingSlice.reducer;
