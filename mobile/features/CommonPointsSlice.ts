import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonPoint } from '@/types';

interface CommonPointsState {
  commonPoints: CommonPoint[];
  loading: boolean;
  error: string;
}

const initialState: CommonPointsState = {
  commonPoints: [],
  loading: false,
  error: '',
};

export const fetchCommonPoints = createAsyncThunk(
  'commonPoints/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://nuit-nws.bastiencouder.com/commonPoint`);
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue('Erreur lors du chargement des points communs.');
    }
  }
);

const commonPointsSlice = createSlice({
  name: 'commonPoints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommonPoints.fulfilled, (state, action) => {
        state.commonPoints = action.payload;
        state.loading = false;
      })
      .addCase(fetchCommonPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commonPointsSlice.reducer;