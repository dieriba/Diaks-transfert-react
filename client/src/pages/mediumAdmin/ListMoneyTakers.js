import { useEffect } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { Loading } from '../../components';
import Pagination from '../../components/pagination/Pagination';
import { useMoneyTakerContext } from '../../context/context-provider/moneyTakerContext';

import TableCompMobileMoneyTaker from '../../components/moneyTakers/TableCompMobileMoneyTaker';
import TableCompMoneyTaker from '../../components/moneyTakers/TableCompMoneyTaker';
import { useGlobalContext } from '../../context/context-provider/globalContext';
const ListMoneyTakers = () => {
  const {
    moneyTakers,
    currentMoneyTakerPage,
    changePage,
    iteratorMoneyTaker,
    getAllMoneyTakers,
    totalPagesMoneyTaker,
    endingLinkMoneyTaker,
    isLoading,
    setEditForm,
    deleteFromDb,
  } = useMoneyTakerContext();
  const { isOnMobile, useHandleResize } = useGlobalContext();
  useEffect(
    () => {
      getAllMoneyTakers();
    },
    //eslint-disable-next-line
    [currentMoneyTakerPage]
  );

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
              deleteFromDb={deleteFromDb}
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
        deleteFromDb={deleteFromDb}
      />
      {totalPagesMoneyTaker > 1 && (
        <Pagination
          currentPage={currentMoneyTakerPage}
          endingLink={endingLinkMoneyTaker}
          iterator={iteratorMoneyTaker}
          totalPages={totalPagesMoneyTaker}
          changePage={changePage}
          mt="1rem"
        />
      )}
    </Flex>
  );
};

export default ListMoneyTakers;
