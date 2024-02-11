import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { User } from '@/types';

interface AuthContextType {
  signIn: (token: string, userDetails: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  const authenticateUser = async (token: string, userDetails: User) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      // Directly navigate without relying on a React state
      router.replace('/');
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const signIn = async (token: string, userDetails: User): Promise<void> => {
    await authenticateUser(token, userDetails);
  };

  const signOut = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userDetails');
      // Directly navigate without relying on a React state
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
