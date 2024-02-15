// useLoadAuthState.js ou useLoadAuthState.ts
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { initAuth } from '@/features/AuthSlice'; // Ajustez le chemin d'importation selon votre structure de projet

export const useLoadAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAuthState = async () => {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userToken = await AsyncStorage.getItem('userToken');
      if (userDetailsString && userToken) {
        const userDetails = JSON.parse(userDetailsString);
        // Dispatch de l'action initAuth avec le payload correct
        dispatch(initAuth({ user: userDetails, token: userToken }));
      }
    };

    loadAuthState();
  }, [dispatch]);
};
