import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Button,
} from '@chakra-ui/react';
import { Loading } from './index';
import { Link as ReachLink } from 'react-router-dom';
import AlertDialogPop from './AlertDialog';
const TableCompMobileAgent = ({
  _id,
  senderName,
  senderCode,
  phoneNumber,
  transfertCounts,
  isLoading,
  setEditForm
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
            <Td width="10px">{senderName}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Code</Th>
            <Td>{senderCode}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Nombre Transferts</Th>
            <Td>{transfertCounts}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Numéro</Th>
            <Td>{phoneNumber}</Td>
          </Tr>

          <Tr>
            <Th color="teal">Actions</Th>
            <Td>
              <Link
                as={ReachLink}
                textDecor="none"
                to="/admin/add-agent"
                onClick={() => setEditForm('agent',_id)}
              >
                <Button size="xs">Modifier</Button>
              </Link>
              <AlertDialogPop ml="0.5rem" s="xs" _id={_id} field="agent" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompMobileAgent;
