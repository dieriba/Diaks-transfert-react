import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { TableCompMobile, TableComp } from '../../components';
import { VStack } from '@chakra-ui/react';

const ListUser = () => {
  const { windowWidth, useHandleResize, isOnMobile } = useGlobalContext();

  useHandleResize();

  if (isOnMobile) {
    return (
      <VStack spacing={4} mt={4} mb={4}>
        <TableCompMobile />
        <TableCompMobile />
        <TableCompMobile />
        <TableCompMobile />
      </VStack>
    );
  }

  return (
    <>
      <TableComp />
    </>
  );
};
export default ListUser;
