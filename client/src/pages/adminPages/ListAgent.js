import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { Flex, VStack } from '@chakra-ui/react';
import { Loading } from '../../components';
import Pagination from '../../components/Pagination';
import TableCompMobileAgent from '../../components/TableCompMobileAgent';
import TableCompAgent from '../../components/TableCompAgent';
const ListAgent = () => {
  const {
    isOnMobile,
    useHandleResize,
    agents,
    currentAgentPage,
    changePage,
    iteratorAgent,
    getAllAgents,
    totalPagesAgent,
    endingLinkAgent,
    isLoading,
    setEditForm,
    editAgent,
  } = useGlobalContext();

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
            collection="agent"
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
      />
      {totalPagesAgent > 1 && (
        <Pagination
          currentPage={currentAgentPage}
          endingLink={endingLinkAgent}
          iterator={iteratorAgent}
          totalPages={totalPagesAgent}
          changePage={changePage}
          collection="agent"
          mt="1rem"
        />
      )}
    </Flex>
  );
};

export default ListAgent;
