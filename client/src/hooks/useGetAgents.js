import { useEffect } from 'react';
import { useGlobalContext } from '../context/contextProvider';

const useGetAgent = () => {
  const {getAllAgents} = useGlobalContext();
  useEffect(() => {
    getAllAgents();
  }, []);
};

export default useGetAgent;
