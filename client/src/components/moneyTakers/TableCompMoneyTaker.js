import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableContainer,
  Link,
  Button,
  Badge,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import AlertDialogPop from '../global/AlertDialog';
import { TdRow, ThRow } from '../styleComp/TableCompStyle';

const TableCompMoneyTaker = ({ moneyTakers, setEditForm, deleteFromDb }) => {
  return (
    <TableContainer w="100%">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <ThRow>Nom Récupérateur</ThRow>
            <ThRow>Numéro</ThRow>
            <ThRow>Montant</ThRow>
            <ThRow>A récupéré</ThRow>
            <ThRow>Date de retrait</ThRow>
            <ThRow>Info</ThRow>
            <ThRow>Actions</ThRow>
          </Tr>
        </Thead>
        <Tbody>
          {moneyTakers.map(user => {
            const {
              _id,
              name,
              optionalInfo,
              amountMoney,
              phoneNumber,
              hasTakeMoney,
              payoutDay,
            } = user;
            return (
              <Tr key={_id} fontSize="0.8rem">
                <TdRow>{name}</TdRow>
                <TdRow>{phoneNumber}</TdRow>
                <TdRow>{amountMoney}</TdRow>
                <TdRow>
                  {hasTakeMoney ? (
                    <Badge colorScheme="green">Oui</Badge>
                  ) : (
                    <Badge colorScheme="red">Non</Badge>
                  )}
                </TdRow>
                <TdRow>{payoutDay || 'Pas Encore Récupré La Somme'}</TdRow>
                <TdRow>{optionalInfo}</TdRow>
                <TdRow>
                  <Link
                    as={ReachLink}
                    to="/med-admin/add-money-takers"
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
                  <AlertDialogPop
                    ml="0.5rem"
                    h="#FF7F7F"
                    s="sm"
                    _id={_id}
                    deleteFromDb={deleteFromDb}
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
export default TableCompMoneyTaker;
