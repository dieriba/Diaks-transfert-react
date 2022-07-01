import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableContainer,
  Link,
  Button,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import AlertDialogPop from '../global/AlertDialog';
import { TdRow, ThRow } from '../styleComp/TableCompStyle';

const TableComp = ({ agents, setEditForm , deleteFromDb }) => {
  return (
    <TableContainer w="100%">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <ThRow>Nom Agent</ThRow>
            <ThRow>Code</ThRow>
            <ThRow>Nombre de transferts</ThRow>
            <ThRow>Numéro</ThRow>
            <ThRow>Actions</ThRow>
          </Tr>
        </Thead>
        <Tbody>
          {agents.map(user => {
            const {
              _id,
              senderName,
              senderCode,
              phoneNumber,
              transfertCounts,
            } = user;
            return (
              <Tr key={_id} fontSize="0.8rem">
                <TdRow>{senderName}</TdRow>
                <TdRow>{senderCode}</TdRow>
                <TdRow>{transfertCounts}</TdRow>
                <TdRow>{phoneNumber}</TdRow>
                <TdRow>
                  <Link
                    as={ReachLink}
                    to="/admin/add-agent"
                    onClick={() => setEditForm(_id)}
                    textDecoration="none"
                  >
                    <Button
                      size="sm"
                      _hover={{ backgroundColor: 'teal' }}
                      cursor="pointer"
                    >
                      Modifier
                    </Button>
                  </Link>
                  <AlertDialogPop deleteFromDb={deleteFromDb} ml="0.5rem" h="#FF7F7F" s="sm" _id={_id} />
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
