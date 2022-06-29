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
import moment from 'moment';
import 'moment/locale/fr';
const TableComp = ({ setEditForm, transferts, getTransfertDetails , userRole }) => {
  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <Thead>
          <Tr textAlign="center">
            <ThRow>Agent</ThRow>
            <ThRow>Code</ThRow>
            <ThRow>Nom Client</ThRow>
            <ThRow>Ville</ThRow>
            <ThRow>Type</ThRow>
            <ThRow>Numéro</ThRow>
            <ThRow>Montant</ThRow>
            <ThRow>Ajouté le</ThRow>
            <ThRow>Statut</ThRow>
            <ThRow>Détails</ThRow>
            {userRole !== 'mediumAdmin' && <ThRow>Actions</ThRow>}
          </Tr>
        </Thead>
        <Tbody>
          {transferts.map(transfert => {
            const {
              clientName,
              senderName,
              city,
              amountOfMoneyInEuro,
              date,
              _id,
              hasTakeMoney,
              phoneNumber,
              moneyTypes,
            } = transfert;
            const formatedDate = moment(date).format('L');
            const hours = moment(date).format('LT');
            return (
              <Tr key={_id} fontSize="0.8rem">
                <TdRow>{senderName}</TdRow>
                <TdRow>T598</TdRow>
                <TdRow>{clientName}</TdRow>
                <TdRow>{city}</TdRow>
                <TdRow>{moneyTypes}</TdRow>
                <TdRow>{phoneNumber ? phoneNumber : ''}</TdRow>
                <TdRow>{amountOfMoneyInEuro}</TdRow>
                <TdRow>{`${formatedDate} à ${hours}`}</TdRow>
                <TdRow>
                  {hasTakeMoney ? (
                    <Badge colorScheme="green">Payé</Badge>
                  ) : (
                    <Badge colorScheme="red">Non payé</Badge>
                  )}
                </TdRow>
                <TdRow>
                  <Link
                    _hover={{ color: 'teal' }}
                    as={ReachLink}
                    to={`/shared/details`}
                    onClick={() => getTransfertDetails(_id)}
                  >
                    Détails
                  </Link>
                </TdRow>
                {userRole !== 'mediumAdmin' && (
                  <TdRow>
                    <Link
                      as={ReachLink}
                      to="/shared/add-transfert"
                      onClick={() => setEditForm('transfert', _id)}
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
                    <AlertDialogPop
                      ml="0.5rem"
                      h="#FF7F7F"
                      s="sm"
                      _id={_id}
                      field="transfert"
                    />
                  </TdRow>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableComp;
