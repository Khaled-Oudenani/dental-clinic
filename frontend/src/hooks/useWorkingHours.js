import { useEffect, useState } from 'react';
import { getWorkingHours } from '../api/workingHours.api';

export const useWorkingHours = () => {
  const [workingHours, setWorkingHours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getWorkingHours();
        setWorkingHours(res.data);
      } catch (err) {
        setWorkingHours([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { workingHours, isLoading };
};