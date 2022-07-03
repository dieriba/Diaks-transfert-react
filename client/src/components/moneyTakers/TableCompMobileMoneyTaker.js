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
import AlertDialogPop from '../global/AlertDialog';
import { Loading } from '../index';

const TableCompMobileMoneyTaker = ({
  _id,
  name,
  optionalInfo,
  amountMoney,
  phoneNumber,
  hasTakeMoney,
  payoutDay,
  isLoading,
  setEditForm,
  deleteFromDb,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <TableContainer width="90%" boxShadow="lg" borderWidth={1} borderRadius={7}>
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Th color="teal">Nom Agent</Th>
            <Td width="10px">{name}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Numéro</Th>
            <Td>{phoneNumber}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Montant</Th>
            <Td width="10px">{amountMoney}</Td>
          </Tr>
          <Tr>
            <Th color="teal">A récupéré</Th>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Oui</Badge>
              ) : (
                <Badge colorScheme="red">Non</Badge>
              )}
            </Td>
          </Tr>
          <Tr>
            <Th color="teal">Date de retrait</Th>
            <Td width="10px">{payoutDay}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Info</Th>
            <Td width="10px">{optionalInfo}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Actions</Th>
            <Td>
              <Link
                as={ReachLink}
                textDecor="none"
                to="/admin/add-user"
                onClick={() => setEditForm(_id)}
              >
                <Button size="xs">Modifier</Button>
              </Link>
              <AlertDialogPop
                ml="0.5rem"
                s="xs"
                _id={_id}
                deleteFromDb={deleteFromDb}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompMobileMoneyTaker;
