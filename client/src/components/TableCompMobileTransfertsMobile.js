import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Link,
} from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/fr';
import { Loading } from './index';
import AlertDialogPop from './AlertDialog';
import { Badge } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { useState } from 'react';

const TableCompTransfertsMobile = ({
  clientName,
  senderName,
  city,
  amountOfMoneyInEuro,
  date,
  _id,
  hasTakeMoney,
  phoneNumber,
  moneyTypes,
  isLoading,
  deleteTransfert,
  setEditForm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = id => {
    deleteTransfert(id);
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  const formatedDate = moment(date).format('L');
  const hours = moment(date).format('LT');

  return (
    <TableContainer width="90%" boxShadow="lg" borderWidth={1} borderRadius={7}>
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Th color="teal">Agent</Th>
            <Td width="10px">{senderName}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Code</Th>
            <Td>D15</Td>
          </Tr>
          <Tr>
            <Th color="teal">Ajouté le</Th>
            <Td>{`${formatedDate} à ${hours}`}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Nom</Th>
            <Td>{clientName}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Type Retrait</Th>
            <Td>{moneyTypes}</Td>
          </Tr>

          {phoneNumber && (
            <Tr>
              <Th color="teal">Contact</Th>
              <Td>622.34.14.25</Td>
            </Tr>
          )}
          <Tr>
            <Th color="teal">Ville</Th>
            <Td>{city}</Td>
          </Tr>

          <Tr>
            <Th color="teal">Montant</Th>
            <Td>{amountOfMoneyInEuro}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Statut</Th>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
          </Tr>
          <Tr>
            <Th color="teal">Actions</Th>
            <Td>
              <Link
                as={ReachLink}
                textDecor='none'
                to="/shared/add-transfert"
                onClick={() => setEditForm(_id)}
              >
                <Button size="xs">Modifier</Button>
              </Link>
              <AlertDialogPop ml="0.5rem" s="xs" _id={_id} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompTransfertsMobile;
