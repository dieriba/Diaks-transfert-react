import { useEffect } from 'react';
import { useGlobalContext } from '../context/context-provider/contextProvider';

const useGetRate = () => {
  const { getRate } = useGlobalContext();
  useEffect(() => {
    getRate();
  }, []);
};
export default useGetRate;
