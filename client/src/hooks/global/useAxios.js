import { useEffect, useState } from 'react';
import axios from '../../apiCall/axios';
import { useAuthContext } from '../../context/context-provider/authContext';

const useAxios = configObj => {
  const { token } = useAuthContext();

  const { url, method, requestConfig = {} } = configObj;
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  axios.interceptors.request.use(
    config => {
      config.headers.common['Authorization'] = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const controller = new AbortController();
    const fectData = async () => {
      try {
        setLoading(true);
        const res = await axios[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        setResponse(res.data);
      } catch (error) {
        setError(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    };

    fectData();

    return () => controller.abort();
  }, []);
  return { response, error, loading };
};
export default useAxios;
