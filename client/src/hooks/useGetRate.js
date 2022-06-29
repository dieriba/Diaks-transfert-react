import { useEffect } from 'react';
import { useGlobalContext } from '../context/contextProvider';

const useGetRate = () => {
  const { getRate } = useGlobalContext();
  useEffect(() => {
    getRate();
  }, []);
};
export default useGetRate;
