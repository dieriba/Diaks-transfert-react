import {
  Table,
  Thead,
  Tbody,
  Tr,
  Icon,
  TableContainer,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';
import { EditIcon, DeleteIcon } from '../icons';

import { TdRow, ThRow } from './TableCompStyle';

const TableComp = () => {
  const { agents } = useGlobalContext();

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
            const { _id, senderName, senderCode, phoneNumber, transfertCounts } =
              user;
            return (
              <Tr key={_id} fontSize="0.8rem">
                <TdRow>{senderName}</TdRow>
                <TdRow>{senderCode}</TdRow>
                <TdRow>{transfertCounts}</TdRow>
                <TdRow>{phoneNumber}</TdRow>
                <TdRow>
                  <Icon
                    onClick={() => console.log('edit')}
                    fontSize="25px"
                    as={EditIcon}
                    cursor="pointer"
                  />
                  <Icon
                    onClick={() => console.log('delete')}
                    fontSize="30px"
                    as={DeleteIcon}
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
