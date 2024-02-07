import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '@env';

export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (userId: string, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message || 'An unknown error occurred');
      }
    }
  );