import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDetails } from '@/types';  // Assurez-vous que le chemin est correct

// Définir l'état initial
const initialState: UserDetails = {
  id: '',
  nom: '',
  prenom: '',
  email: '',
  tel: '',
  entreprise: '',
  poste: '',
  score: 0,
};

// Créer un thunk asynchrone pour charger les détails de l'utilisateur
export const loadUserDetails = createAsyncThunk(
  'user/loadUserDetails',
  async () => {
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : initialState;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Définir les reducers si nécessaire
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;
