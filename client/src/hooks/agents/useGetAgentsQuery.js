import { useEffect } from 'react';
import { useAgentContext } from '../../context/context-provider/agentContext';

const useGetAgentsQuery = () => {
  const { getAgents } = useAgentContext();
  useEffect(() => {
    getAgents();
  }, []);
};

export default useGetAgentsQuery;
