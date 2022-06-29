import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { Flex, VStack } from '@chakra-ui/react';
import { Loading } from '../../components';
import Pagination from '../../components/Pagination';
import TableCompMobileMoneyTaker from '../../components/TableCompMobileMoneyTaker';
import TableCompMoneyTaker from '../../components/TableCompMoneyTaker';
const ListMoneyTakers = () => {
  const {
    isOnMobile,
    useHandleResize,
    moneyTakers,
    currentMoneyTakerPage,
    changePage,
    iteratorMoneyTaker,
    getAllMoneyTakers,
    totalPagesMoneyTaker,
    endingLinkMoneyTaker,
    isLoading,
    setEditForm,
  } = useGlobalContext();

  useEffect(() => {
    getAllMoneyTakers();
  }, [currentMoneyTakerPage]);

  useHandleResize();

  if (isOnMobile) {
    if (isLoading) return <Loading />;
    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        {moneyTakers.map(agent => {
          return (
            <TableCompMobileMoneyTaker
              key={agent._id}
              {...agent}
              isLoading={isLoading}
              setEditForm={setEditForm}
            />
          );
        })}
        {totalPagesMoneyTaker > 1 && (
          <Pagination
            currentPage={currentMoneyTakerPage}
            endingLink={endingLinkMoneyTaker}
            iterator={iteratorMoneyTaker}
            totalPages={totalPagesMoneyTaker}
            changePage={changePage}
            collection="moneyTaker"
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
      <TableCompMoneyTaker
        moneyTakers={moneyTakers}
        isLoading={isLoading}
        setEditForm={setEditForm}
      />
      {totalPagesMoneyTaker > 1 && (
        <Pagination
          currentPage={currentMoneyTakerPage}
          endingLink={endingLinkMoneyTaker}
          iterator={iteratorMoneyTaker}
          totalPages={totalPagesMoneyTaker}
          changePage={changePage}
          collection="moneyTaker"
          mt="1rem"
        />
      )}
    </Flex>
  );
};

export default ListMoneyTakers;
