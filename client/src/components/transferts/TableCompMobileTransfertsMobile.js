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
import { Loading } from '../index';
import AlertDialogPop from '../global/AlertDialog';
import { Badge } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { formatDate, formatHours } from '../../utils/formatDate';
import { TdRowMobile, ThRowMobile } from '../styleComp/TableCompStyle';
const TableCompTransfertsMobile = ({
  clientName,
  senderName,
  city,
  amountOfMoneyInEuro,
  date,
  _id,
  payoutDay,
  hasTakeMoney,
  phoneNumber,
  moneyTypes,
  isLoading,
  setEditForm,
  userRole,
  contactNumber,
  code,
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
            <Th color="teal">Agent</Th>
            <Td width="10px">{senderName}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Code</Th>
            <Td>{code || 'Pas de code'}</Td>
          </Tr>
          <Tr>
            <Th color="teal">Ajouté le</Th>
            <Td>{`${formatDate(date)} à ${formatHours(date)}`}</Td>
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
              <Th color="teal">Orange Money Numéro</Th>
              <Td>{phoneNumber}</Td>
            </Tr>
          )}
          {contactNumber && (
            <Tr>
              <Th color="teal">Numéro Contact</Th>
              <Td>{contactNumber}</Td>
            </Tr>
          )}
          <Tr>
            <Th color="teal">Ville</Th>
            <Td>{city}</Td>
          </Tr>

          <Tr>
            <Th color="teal">Montant</Th>
            <Td>{amountOfMoneyInEuro.toLocaleString()}</Td>
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
          {payoutDay && (
            <Tr color="teal">
              <Th>Date de paiement</Th>
              <Td>{formatDate(payoutDay)}</Td>
            </Tr>
          )}
          {userRole !== 'mediumAdmin' && userRole !== 'moneyGiver' && (
            <Tr>
              <Th color="teal">Actions</Th>
              <Td>
                <Link
                  as={ReachLink}
                  textDecor="none"
                  to="/shared/add-transfert"
                  onClick={() => setEditForm(_id)}
                >
                  <Button size="xs">Modifier</Button>
                </Link>
                <AlertDialogPop
                  ml="0.5rem"
                  s="xs"
                  _id={_id}
                  field="transfert"
                  deleteFromDb={deleteFromDb}
                />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompTransfertsMobile;
