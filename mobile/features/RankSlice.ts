import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Rank } from '@/types';

interface RankState {
  ranks: Rank[];
  loading: boolean;
  error: string;
}

const initialState: RankState = {
  ranks: [],
  loading: false,
  error: '',
};

export const fetchRanks = createAsyncThunk(
  'ranks/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://nuit-nws.bastiencouder.com/rank`);
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue('Erreur lors du chargement des classements.');
    }
  }
);

const rankSlice = createSlice({
  name: 'ranks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRanks.fulfilled, (state, action) => {
        state.ranks = action.payload;
        state.loading = false;
      })
      .addCase(fetchRanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rankSlice.reducer;