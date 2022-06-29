import { useEffect } from 'react';
import { useGlobalContext } from '../context/contextProvider';

const useGetAgentsQuery = () => {
  const { getAgents } = useGlobalContext();
  useEffect(() => {
    getAgents();
  }, []);
};

export default useGetAgentsQuery;
