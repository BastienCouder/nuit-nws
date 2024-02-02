import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserDetails {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  entreprise:string;
  poste:string;
}

// Hook personnalisé pour récupérer les détails de l'utilisateur
export function useUserDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDetails = async () => {
      setLoading(true);
      try {
        const storedUserDetails = await AsyncStorage.getItem("userDetails");
        if (storedUserDetails) {
          const details = JSON.parse(storedUserDetails);
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Failed to load user details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, []);

  return { userDetails, setUserDetails, loading };
}
