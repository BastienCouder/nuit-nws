import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserById } from './getUserByIdThunk';
import { fetchAllUsers } from './getAllUserThunk';
import { User } from '@/types';

interface UserState {
  userDetails: User | null;
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Définir l'état initial
const initialState: UserState = {
  userDetails: null,
  users: [],
  status: 'idle',
  error: null,
};

// Créer un thunk asynchrone pour charger les détails de l'utilisateur à partir du stockage local
export const loadUserDetails = createAsyncThunk(
  'user/loadUserDetails',
  async () => {
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Définir les reducers si nécessaire
  },
  extraReducers: (builder) => {
    builder
      // Gestion de la charge des détails de l'utilisateur à partir du stockage local
      .addCase(loadUserDetails.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.userDetails = action.payload;
      })
      // Gestion de la charge d'un utilisateur par son ID
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Gestion de la charge de tous les utilisateurs
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
