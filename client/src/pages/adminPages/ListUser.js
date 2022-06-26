import { useEffect } from 'react';
import { useGlobalContext } from '../../context/contextProvider';
import { Flex, VStack } from '@chakra-ui/react';
import Pagination from '../../components/Pagination';
import TableCompMobileUser from '../../components/TableCompMobileUser';
import TableCompUser from '../../components/TableCompUser';
const ListUser = () => {
  const { isOnMobile, useHandleResize, getAllUsers, users, currentPage } =
    useGlobalContext();

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  useHandleResize();

  if (isOnMobile) {
    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        {users.map(user => {
          return <TableCompMobileUser key={user._id} {...user} />;
        })}
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
      <TableCompUser />
    </Flex>
  );
};

export default ListUser;
