import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from '@/app/hooks'; // Assurez-vous que le chemin est correct
import { authenticateUser } from '@/features/AuthSlice'; // Vérifiez le chemin d'accès
import { User } from '@/types';
import { usePathname, useRouter, useSegments } from 'expo-router';

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
  const pathname = usePathname();
  const [rootSegment] = useSegments(); // Mise à jour pour utiliser la déstructuration pour obtenir le premier segment

  useEffect(() => {
    // Vérifiez si l'utilisateur est déjà authentifié lors du chargement de l'application
    const loadUserData = async () => {
      const storedUserDetails = await AsyncStorage.getItem('userDetails');

      if (storedUserDetails) {
        const userDetails: User = JSON.parse(storedUserDetails);
        setUser(userDetails);
        // Ajout d'une redirection vers la page d'accueil si l'utilisateur est déjà connecté
        if (pathname !== "/") {
          router.replace("/");
        }
      }
    };

    loadUserData();
  }, [router]);

  useEffect(() => {
    // Redirection basée sur l'état d'authentification
    if (!user && pathname !== "/(auth)/login") {
      router.replace("/(auth)/login");
    }
  }, [user, router]);

  const signInWithToken = async (token: string, userDetails: User) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      setUser(userDetails);
      // Redirection vers la page d'accueil après une connexion réussie
      router.replace("/");
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
      // Gérez l'erreur (par exemple, affichez un message à l'utilisateur)
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userDetails');
    setUser(null);
    // Redirection vers la page de connexion après déconnexion
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, signInWithToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
