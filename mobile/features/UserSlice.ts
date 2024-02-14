import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/types';

interface UserState {
  userDetails: User | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: '',
};

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchDetails',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://nuit-nws.bastiencouder.com/user/${token}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Erreur lors du chargement des détails de l'utilisateur.`);
    }
  }
);

// User slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export reducer
export default userSlice.reducer;
