import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { TableCompMobile, TableComp, QueryForm } from '../../components';
import { Loading } from '../../components/index';
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Button, VStack, Text, Link, Box } from '@chakra-ui/react';
import Pagination from '../../components/Pagination';
import CalculShow from '../../components/CalculShow';
import useGetAgent from '../../hooks/useGetAgents';
import QueryFormShow from '../../components/QueryFormShow';
const Dashboard = () => {
  const {
    isOnMobile,
    useHandleResize,
    getAllTransferts,
    transferts,
    currentPage,
    isLoading,
    setEditForm,
    totalPages,
    deleteTransfert,
    changePage,
    endingLink,
    iterator,
    getTransfertDetails,
  } = useGlobalContext();

  useEffect(() => {
    getAllTransferts();
  }, [currentPage]);
  useHandleResize();

  useGetAgent();

  if (isOnMobile) {
    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        <Flex direction="column" w="100%" alignItems="center">
          <QueryFormShow text="Formulaire Recherche" w="90%" />
          <CalculShow w="90%" mt="1rem" />
        </Flex>
        {transferts.map(transfert => {
          return (
            <TableCompMobile
              key={transfert._id}
              {...transfert}
              setEditForm={setEditForm}
              isLoading={isLoading}
              deleteTransfert={deleteTransfert}
            />
          );
        })}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            endingLink={endingLink}
            iterator={iterator}
            changePage={changePage}
          />
        )}
      </VStack>
    );
  }
  if (isLoading) {
    return <Loading />;
  }

  if (transferts.length === 0) {
    return (
      <Flex
        width="100%"
        minH="90vh"
        justifyContent="center"
        alignItems="center"
      >
        <Flex alignSelf="flex-start" width="100%">
          <QueryFormShow />
          <CalculShow mt="0.6rem" mb="0.6rem" ml="1rem" />
        </Flex>
        <Box justifySelf="center" w="100%">
          <Text>Aucun Transfert Trouvé....</Text>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex
      width="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex width="100%">
        <QueryFormShow text="Formulaire Recherche" mt="0.6rem" ml="0.5rem" />
        <CalculShow mt="0.6rem" mb="0.6rem" ml="0.5rem" />
      </Flex>

      <TableComp
        setEditForm={setEditForm}
        transferts={transferts}
        getTransfertDetails={getTransfertDetails}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          endingLink={endingLink}
          iterator={iterator}
          changePage={changePage}
          mt="0.6rem"
        />
      )}
    </Flex>
  );
};

export default Dashboard;
