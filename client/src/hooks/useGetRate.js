import { useEffect } from 'react';
import { useConvertContext } from '../context/context-provider/convertContext';

const useGetRate = () => {
  const { getRate } = useConvertContext();
  useEffect(() => {
    getRate();
  }, []);
};
export default useGetRate;
