import { useEffect } from 'react';
import { useGlobalContext } from '../../context/context-provider/contextProvider';

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
