import { useEffect } from 'react';
import { useGlobalContext } from '../../context/context-provider/globalContext';
import { Flex, VStack } from '@chakra-ui/react';
import { Loading } from '../../components';
import Pagination from '../../components/pagination/Pagination';
import TableCompMobileAgent from '../../components/agents/TableCompMobileAgent';
import TableCompAgent from '../../components/agents/TableCompAgent';
import { useAgentContext } from '../../context/context-provider/agentContext';
const ListAgent = () => {
  const { isOnMobile, useHandleResize } = useGlobalContext();

  const {
    agents,
    currentAgentPage,
    changePage,
    iteratorAgent,
    getAllAgents,
    totalPagesAgent,
    endingLinkAgent,
    isLoading,
    setEditForm,
    deleteFromDb
  } = useAgentContext();

  useEffect(() => {
    getAllAgents();
  }, [currentAgentPage]);

  useHandleResize();

  if (isOnMobile) {
    if (isLoading) return <Loading />;
    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        {agents.map(agent => {
          return (
            <TableCompMobileAgent
              key={agent._id}
              {...agent}
              isLoading={isLoading}
              setEditForm={setEditForm}
              deleteFromDb={deleteFromDb}
            />
          );
        })}
        {totalPagesAgent > 1 && (
          <Pagination
            currentPage={currentAgentPage}
            endingLink={endingLinkAgent}
            iterator={iteratorAgent}
            totalPages={totalPagesAgent}
            changePage={changePage}
          />
        )}
      </VStack>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <Flex
      width="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <TableCompAgent
        agents={agents}
        isLoading={isLoading}
        setEditForm={setEditForm}
        deleteFromDb={deleteFromDb}
      />
      {totalPagesAgent > 1 && (
        <Pagination
          currentPage={currentAgentPage}
          endingLink={endingLinkAgent}
          iterator={iteratorAgent}
          totalPages={totalPagesAgent}
          changePage={changePage}
          mt="1rem"
        />
      )}
    </Flex>
  );
};

export default ListAgent;
