import {
  useEffect,
  useState,
} from 'react';

export const useFetch = (fetchFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await fetchFn();
      setData(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const refetch = async () => {
    await fetch();
  };

  return { data, loading, error, refetch };
};