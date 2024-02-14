import { CommonPoint } from '@/types';
import { useState, useEffect } from 'react';

const useFetchCommonPoints = () => {
  const [commonPoints, setCommonPoints] = useState<CommonPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCommonPoints = async () => {
      try {
        const response = await fetch(`https://nuit-nws.bastiencouder.com/commonPoint`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCommonPoints(data);
      } catch (error) {
        console.error(error);
        setError(`Erreur lors du chargement des points communs.`);
      } finally {
        setLoading(false);
      }
    };

    fetchCommonPoints();
  }, []);

  return { commonPoints, loading, error };
};

export default useFetchCommonPoints;
