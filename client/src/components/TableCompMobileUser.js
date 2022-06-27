import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  Link,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import AlertDialogPop from './AlertDialog';
import { Loading } from './index';

const TableCompMobileUser = ({
  _id,
  username,
  role,
  isBanned,
  isLoading,
  setEditForm,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <TableContainer width="90%" boxShadow="lg" borderWidth={1} borderRadius={7}>
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Th color="teal">Nom Utilisateur</Th>
            <Td width="10px">{username}</Td>
          </Tr>
          <Tr>
            <Th color="teal">role</Th>
            <Td>{role}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Banni</Th>
            <Td>
              {isBanned ? (
                <Badge colorScheme="red">Banni</Badge>
              ) : (
                <Badge colorScheme="green">Non Banni</Badge>
              )}
            </Td>
          </Tr>
          <Tr>
            <Th color="teal">Actions</Th>
            <Td>
              <Link
                as={ReachLink}
                textDecor="none"
                to="/admin/add-user"
                onClick={() => setEditForm('user', _id)}
              >
                <Button size="xs">Modifier</Button>
              </Link>
              <AlertDialogPop ml="0.5rem" s="xs" _id={_id} field="user" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompMobileUser;
