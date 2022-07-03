import { useEffect, useState } from 'react';
import axios from '../../apiCall/axios';
import { useAuthContext } from '../../context/context-provider/authContext';

const useAxiosFunction = () => {
  const { token } = useAuthContext();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const axiosFetch = async configObj => {
    const { url, method, requestConfig = {} } = configObj;
    try {
      setIsLoading(true);
      const res = await axios[method.toLowerCase()](url, {
        ...requestConfig,
      });
      setResponse(res.data);
    } catch (error) {
      setError(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

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

  return { response, error, isLoading, axiosFetch };
};
export default useAxiosFunction;
