import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { Flex, VStack } from '@chakra-ui/react';
import Pagination from '../../components/Pagination';
import TableCompMobileAgent from '../../components/TableCompMobileAgent';
import TableCompAgent from '../../components/TableCompAgent';
const ListAgent = () => {
  const {
    isOnMobile,
    useHandleResize,
    agents,
    currentPageAgent,
    iteratorAgent,
    getAllAgents,
    totalPagesAgent,
    endingLinkAgent,
    isLoading,
    setEditForm
  } = useGlobalContext();

  useEffect(() => {
    getAllAgents();
  }, [currentPageAgent]);

  useHandleResize();

  if (isOnMobile) {
    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        {agents.map(agent => {
          return (
            <TableCompMobileAgent
              key={agent._id}
              {...agent}
              isLoading={isLoading}
              setEditForm = {setEditForm}
            />
          );
        })}
        {totalPagesAgent > 1 && (
          <Pagination
            currentPage={currentPageAgent}
            endingLink={endingLinkAgent}
            iterator={iteratorAgent}
            totalPages={totalPagesAgent}
          />
        )}
      </VStack>
    );
  }
  return (
    <Flex
      width="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <TableCompAgent agents={agents} isLoading={isLoading} setEditForm={setEditForm} />
      {totalPagesAgent > 1 && (
        <Pagination
          currentPage={currentPageAgent}
          endingLink={endingLinkAgent}
          iterator={iteratorAgent}
          totalPages={totalPagesAgent}
          mt="1rem"
        />
      )}
    </Flex>
  );
};

export default ListAgent;
