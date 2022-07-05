import { useEffect } from 'react';
import { useAuthContext } from '../../context/context-provider/authContext';

const useGetToken = () => {
  const { getToken, token } = useAuthContext();
  useEffect(() => {
    getToken();
  }, [token]);
};

export default useGetToken;
