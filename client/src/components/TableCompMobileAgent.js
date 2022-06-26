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

const TableCompMobileAgent = ({
  _id,
  senderName,
  senderCode,
  phoneNumber,
  transfertCounts,
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
export default TableCompMobileAgent;
