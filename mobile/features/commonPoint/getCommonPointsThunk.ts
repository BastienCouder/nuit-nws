import { API_URL } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommonPoints = createAsyncThunk(
    'commonPoints/fetchCommonPoints',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/commonPoints`);
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