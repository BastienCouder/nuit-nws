import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '@env'
import { Ranking } from '@/types';

// Définir l'état initial
interface RankingState {
    rankings: Ranking[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
  }
  
  const initialState: RankingState = {
    rankings: [],
    status: 'idle',
    error: undefined,
  };

// Créer un thunk asynchrone pour charger les classements
export const fetchRankings = createAsyncThunk<Ranking[], void, { rejectValue: string }>(
    'ranking/fetchRankings',
    async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/rank`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error:any) {
    return rejectWithValue(error.message || 'An unknown error occurred');
  }
});

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
