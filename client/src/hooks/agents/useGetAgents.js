import { useEffect } from 'react';
import { useAgentContext } from '../../context/context-provider/agentContext';

const useGetAgent = () => {
  const {getAllAgents} = useAgentContext();
  useEffect(() => {
    getAllAgents();
  }, []);
};

export default useGetAgent;
