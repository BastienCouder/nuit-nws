import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from '@/app/hooks'; // Assurez-vous que le chemin est correct
import { authenticateUser } from '@/features/AuthSlice'; // Vérifiez le chemin d'accès
import { User } from '@/types';
import { useRouter, useSegments } from 'expo-router';

interface AuthContextType {
  user: User | null;
  signInWithToken: (token: string, userDetails: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const rootSegment = useSegments()[0];

  useEffect(() => {
    // Vérifiez si l'utilisateur est déjà authentifié lors du chargement de l'application
    const loadUserData = async () => {
      const storedUserDetails = await AsyncStorage.getItem('userDetails');

      if (storedUserDetails) {
        const userDetails: User = JSON.parse(storedUserDetails);
        setUser(userDetails);
      } else {
        // Si aucun utilisateur n'est stocké, redirigez vers la page de connexion
        router.replace("/(auth)/login");
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    // Redirection basée sur l'état d'authentification et le segment actuel
    if (!user && rootSegment !== "(auth)") {
      router.replace("/(auth)/login");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/modal");
    }
  }, [user, rootSegment]);

  const signInWithToken = async (token: string, userDetails: User) => {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    setUser(userDetails);
    router.replace("/");
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userDetails');
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, signInWithToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};