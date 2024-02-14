import { useState, useEffect } from 'react';
import { Rank } from '@/types'; // Assurez-vous que le chemin d'importation est correct

const useFetchRank = () => {
  const [dataRank, setDataRank] = useState<Rank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await fetch("https://nuit-nws.bastiencouder.com/rank");
        const data = await resp.json();
        setDataRank(data);
      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement des classements.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataRank, loading, error };
};

export default useFetchRank;
