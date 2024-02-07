import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCommonPoints } from './getCommonPointsThunk';
import { CommonPoint, CommonPointsState } from '@/types';

const initialState: CommonPointsState = {
  commonPoints: [],
  status: 'idle',
  error: null,
};

const commonPointsSlice = createSlice({
    name: 'commonPoints',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCommonPoints.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCommonPoints.fulfilled, (state, action: PayloadAction<CommonPoint[]>) => {
          state.status = 'succeeded';
          state.commonPoints = action.payload;
        })
        .addCase(fetchCommonPoints.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
    },
  });
  
  export default commonPointsSlice.reducer;