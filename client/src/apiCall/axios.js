import axios from 'axios';
import { useGlobalContext } from '../context/context-provider/contextProvider';

const useAuthFetchCall = () => {
  const { logoutUser, token } = useGlobalContext();

  const authFetch = axios.create({
    baseURL: 'http://localhost:1000/',
  });

  authFetch.interceptors.request.use(
    config => {
      config.headers.common['Authorization'] = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
};

export default useAuthFetchCall;
