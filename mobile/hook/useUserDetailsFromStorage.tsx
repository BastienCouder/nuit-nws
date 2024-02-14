import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

const useUserDetailsFromStorage = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem("userDetails");
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails));
        } else {
          setUserDetails(null);
          setError("Aucun détail d'utilisateur trouvé.");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des détails de l'utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, []);

  return { userDetails, loading, error };
};

export default useUserDetailsFromStorage;
