import { useEffect } from 'react';
import { useGlobalContext } from '../context/contextProvider';

const useGetScreenWidth = () => {
  const { handleResize } = useGlobalContext;
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useGetScreenWidth;
