import { useEffect } from 'react';
import { useGlobalContext } from '../../context/context-provider/globalContext';
import { Flex, VStack } from '@chakra-ui/react';
import TableCompMobileUser from '../../components/users/TableCompMobileUser';
import TableCompUser from '../../components/users/TableCompUser';
import useUserContext from '../../context/context-provider/userContext';
import { Loading } from '../../components';
const ListUser = () => {
  const { isOnMobile, useHandleResize } = useGlobalContext();

  const { setEditForm, isLoading, users, getAllUsers, deleteFromDb } =
    useUserContext();

  useEffect(
    () => {
      getAllUsers();
    },
    //eslint-disable-next-line
    []
  );
  useHandleResize();

  if (isOnMobile) {
    if (isLoading) return <Loading />;

    return (
      <VStack display="flex" w="100%" spacing={4} mt={4} mb={4}>
        {users.map(user => {
          return (
            <TableCompMobileUser
              key={user._id}
              {...user}
              isLoading={isLoading}
              setEditForm={setEditForm}
              deleteFromDb={deleteFromDb}
            />
          );
        })}
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
      <TableCompUser
        users={users}
        setEditForm={setEditForm}
        isLoading={isLoading}
        deleteFromDb={deleteFromDb}
      />
    </Flex>
  );
};

export default ListUser;
