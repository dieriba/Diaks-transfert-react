import { useEffect } from 'react';
import { useGlobalContext } from '../../../context/context-provider/globalContext';
import useTransfertContext from '../../../context/context-provider/transfertContext';
import { TableCompMobile, TableComp } from '../../../components';
import { Loading } from '../../../components/index';
import { Flex, VStack, Text, Box } from '@chakra-ui/react';
import Pagination from '../../../components/pagination/Pagination';
import CalculShow from '../../../components/transferts/CalculShow';
import QueryFormShow from '../../../components/transferts/QueryFormShow';
import useGetAgentsQuery from '../../../hooks/agents/useGetAgentsQuery';
import { useAuthContext } from '../../../context/context-provider/authContext';
const Dashboard = () => {
  const { isOnMobile, useHandleResize } = useGlobalContext();
  const { userRole } = useAuthContext();

  const {
    getTransfertDetails,
    getAllTransferts,
    transferts,
    deleteFromDb,
    setEditForm,
    currentPage,
    totalPages,
    changePage,
    endingLink,
    iterator,
    isLoading,
  } = useTransfertContext();

  useEffect(() => {
    getAllTransferts();
  }, [currentPage]);
  useHandleResize();

  useGetAgentsQuery();

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
              deleteFromDb={deleteFromDb}
              userRole={userRole}
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
            collection="transfert"
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
          <QueryFormShow
            text="Formulaire Recherche"
            mt="0.6rem"
            ml="1rem"
          />
          <CalculShow w="20%" mt="0.6rem" mb="0.6rem" ml="1rem" />
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
        userRole={userRole}
        deleteFromDb={deleteFromDb}
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
