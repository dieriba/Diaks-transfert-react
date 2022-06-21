import { useGlobalContext } from '../../context/contextProvider';
import { Loading, TableCompMobile,TableComp } from '../../components';
import { Flex } from '@chakra-ui/react';
const Dashboard = () => {
  const { isLoading , onMobile } = useGlobalContext();
  
  if (isLoading) {
    return <Loading />;
  }
  if(onMobile){
    return (
      <Flex
        width="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <TableCompMobile />
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
      <TableComp />
 
    </Flex>
  );
};

export default Dashboard;
