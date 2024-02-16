import { API_URL } from '@/lib/utils';
import { User } from '@/types';
import { useState, useEffect } from 'react';

const useFetchUserDetails = (token:string) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/user/${token}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
        setError(`Erreur lors du chargement des détails de l'utilisateur.`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [token]);

  return { userDetails, loading, error };
};

export default useFetchUserDetails;
