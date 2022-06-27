import {
  Table,
  Thead,
  Tbody,
  Tr,
  Link,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import AlertDialogPop from './AlertDialog';
import { TdRow, ThRow } from './TableCompStyle';

const TableComp = ({ users, setEditForm }) => {
  return (
    <TableContainer w="100%">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr textAlign="center">
            <ThRow>Nom Utilisateurs</ThRow>
            <ThRow>Role</ThRow>
            <ThRow>Banni</ThRow>
            <ThRow>Action</ThRow>
          </Tr>
        </Thead>
        <Tbody textAlign="center">
          {users.map(user => {
            const { _id, username, isBanned, role } = user;
            return (
              <Tr key={_id} fontSize="0.8rem">
                <TdRow>{username}</TdRow>
                <TdRow>{role}</TdRow>
                <TdRow>
                  {isBanned ? (
                    <Badge colorScheme="red">Banni</Badge>
                  ) : (
                    <Badge colorScheme="green">Non Banni</Badge>
                  )}
                </TdRow>
                <TdRow>
                  <Link
                    as={ReachLink}
                    textDecoration="none"
                    to="/admin/add-user"
                    onClick={() => setEditForm('user', _id)}
                  >
                    <Button
                      size="sm"
                      _hover={{ backgroundColor: 'teal' }}
                      cursor="pointer"
                    >
                      Modifier
                    </Button>
                  </Link>
                  <AlertDialogPop
                    ml="0.5rem"
                    h="#FF7F7F"
                    s="sm"
                    _id={_id}
                    field="user"
                  />
                </TdRow>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableComp;
