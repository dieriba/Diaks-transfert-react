import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
} from '@chakra-ui/react';
import { Loading } from './index';
import { EditIcon, DeleteIcon } from '../icons';
import { Badge } from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const TableCompMobileUser = ({
  _id,
  username,
  role,
  isBanned
}) => {
  const { isLoading } = useGlobalContext();

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
              <Icon
                onClick={() => console.log('edit')}
                fontSize="23px"
                as={EditIcon}
                cursor="pointer"
              />
              <Icon
                onClick={() => console.log('delete')}
                fontSize="25px"
                as={DeleteIcon}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompMobileUser;
