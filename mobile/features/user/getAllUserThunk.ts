import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '@env';

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/user`);
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