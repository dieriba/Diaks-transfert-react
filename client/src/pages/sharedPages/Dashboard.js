import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { Loading, TableCompMobile, TableComp } from '../../components';
import { Flex , VStack} from '@chakra-ui/react';
const Dashboard = () => {
  const { isLoading, isOnMobile, useHandleResize } = useGlobalContext();
  
  useHandleResize();
  if (isLoading) {
    return <Loading />;
  }
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
    <Flex
      width="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <TableComp />
    </Flex>
  );
};

export default Dashboard;
