import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '@env';

export const createUserSelectionsThunk = createAsyncThunk<Selection[], { userId: number, commonPointsIds: number[] }, { rejectValue: string }>(
    'selection/createUserSelections',
    async ({ userId, commonPointsIds }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/selectUser/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ commonPointsIds }),
        });
  
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
  