// AuthSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from '@/types'; // Assurez-vous que ce type est bien défini
import { router } from 'expo-router';
import { API_URL } from '@/lib/utils';


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: "",
};

export const authenticateUser = createAsyncThunk<AuthState, string, { rejectValue: string }>(
    'auth/authenticateUser',
    async (qrToken, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login/qr`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ qrToken }),
            });

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data: AuthState = await response.json();
            // Stocker les détails de l'utilisateur et le token dans AsyncStorage
            await AsyncStorage.setItem('userDetails', JSON.stringify(data.user));
            await AsyncStorage.setItem('userToken', JSON.stringify(data.token));
            router.replace("/modal");
            return data;
        } catch (error: any) {
            return rejectWithValue(error.toString());
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            // Supprimer les détails de l'utilisateur et le token d'AsyncStorage
            AsyncStorage.removeItem('userDetails');
            AsyncStorage.removeItem('userToken');
        },
        initAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = !!token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.error = null;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user; // Assurez-vous que cela correspond à la structure de votre payload
                state.token = action.payload.token;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.error = action.payload ?? 'Une erreur est survenue';
            });
    },
});

export const { logout,initAuth } = authSlice.actions;
export default authSlice.reducer;
