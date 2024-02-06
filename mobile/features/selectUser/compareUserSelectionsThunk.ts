import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '@env';
import { ComparisonResult } from "./selectUserSlice";

export const compareUserSelectionsThunk = createAsyncThunk<ComparisonResult, { userId1: number, userId2: number }, { rejectValue: string }>(
    'selection/compareUserSelections',
    async ({ userId1, userId2 }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/user/compare?userId1=${userId1}&userId2=${userId2}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message || 'An unknown error occurred');
      }
    }
  );
  