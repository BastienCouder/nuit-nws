import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/features/UserSlice';
import  authReducer from '@/features/AuthSlice';
import commonPointsReducer from '@/features/CommonPointsSlice';
import rankReducer from '@/features/RankSlice';

// Define the reducer. This example uses an empty reducer, but you should replace it with your actual reducers.
const reducer = {
  auth: authReducer,
    user: userReducer,
    commonPoints: commonPointsReducer,
    ranks: rankReducer,
}

// Create the store using the reducer
const store = configureStore({
  reducer: reducer,
})

// Export the store as default
export default store

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>

// Define AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch