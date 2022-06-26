import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { TableCompMobile, TableComp, QueryForm } from '../../components';
import { Loading } from '../../components/index';
import { Flex, Button, VStack } from '@chakra-ui/react';
import Pagination from '../../components/Pagination';
const Dashboard = () => {
  const {
    isOnMobile,
    useHandleResize,
    getAllTransferts,
    transferts,
    toggleQueryForm,
    currentPage,
    isLoading,
    setEditForm,
    totalPages,
    deleteTransfert,
    changePage,
    endingLink,
    iterator,
  } = useGlobalContext();

  useEffect(() => {
    getAllTransferts();
  }, [currentPage]);
  useHandleResize();

  if (isOnMobile) {
    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        <Flex direction="column" w="100%" alignItems="center">
          <Button w="90%" onClick={toggleQueryForm}>
            Ouvrir Formulaire Recherche
          </Button>
          <QueryForm />
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
  return (
    <Flex
      width="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* <QueryForm /> */}

      <TableComp setEditForm={setEditForm} transferts={transferts} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          endingLink={endingLink}
          iterator={iterator}
          changePage={changePage}
          mt="1rem"
        />
      )}
    </Flex>
  );
};

export default Dashboard;
