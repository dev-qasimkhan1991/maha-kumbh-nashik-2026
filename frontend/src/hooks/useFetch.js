import {
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        setData(response.data.data || response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;