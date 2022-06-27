import {
  Button,
  Table,
  Th,
  Td,
  Tbody,
  TableContainer,
  Tr,
  Flex,
  Link,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { useGlobalContext } from '../context/contextProvider';
import { TdRowMobile, ThRowMobile } from './TableCompStyle';
const DetailsTransfert = () => {
  const {
    senderName,
    city,
    moneyTypes,
    clientName,
    phoneNumber,
    hasPaid,
    amountOfMoneyInEuro,
    hasTakeMoney,
    date,
    updatedDate,
    hasBeenModified,
    payoutDay,
    rate,
  } = useGlobalContext();

  return (
    <Flex
      width="100%"
      minH="90vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <TableContainer width={['90%',"60%"]} boxShadow="lg">
        <Table size="sm" variant="simple">
          <Tbody>
            {senderName && (
              <Tr>
                <ThRowMobile>Nom Agent</ThRowMobile>
                <TdRowMobile>{senderName}</TdRowMobile>
              </Tr>
            )}
            {clientName && (
              <Tr>
                <ThRowMobile>Nom Client</ThRowMobile>
                <TdRowMobile>{clientName}</TdRowMobile>
              </Tr>
            )}
            {moneyTypes === 'ORANGE MONEY' && (
              <Tr>
                <ThRowMobile>Numéro</ThRowMobile>
                <TdRowMobile>{phoneNumber}</TdRowMobile>
              </Tr>
            )}
            {moneyTypes && (
              <Tr>
                <ThRowMobile>Type</ThRowMobile>
                <TdRowMobile>{moneyTypes}</TdRowMobile>
              </Tr>
            )}
            {amountOfMoneyInEuro && (
              <Tr>
                <ThRowMobile>Montant</ThRowMobile>
                <TdRowMobile>{amountOfMoneyInEuro}</TdRowMobile>
              </Tr>
            )}
            {rate && (
              <Tr>
                <ThRowMobile>Taux</ThRowMobile>
                <TdRowMobile>{rate}</TdRowMobile>
              </Tr>
            )}
            {city && (
              <Tr>
                <ThRowMobile>Ville</ThRowMobile>
                <TdRowMobile>{city}</TdRowMobile>
              </Tr>
            )}
            {date && (
              <Tr>
                <ThRowMobile>Le</ThRowMobile>
                <TdRowMobile>{moment(date).format('L')}</TdRowMobile>
              </Tr>
            )}
            {hasBeenModified && (
              <Tr>
                <ThRowMobile>Modifié Le</ThRowMobile>
                <TdRowMobile>{moment(updatedDate).format('L')}</TdRowMobile>
              </Tr>
            )}
            {hasTakeMoney && (
              <Tr>
                <ThRowMobile>Paiement Le</ThRowMobile>
                <TdRowMobile>{payoutDay}</TdRowMobile>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Link mt='1rem' w='90%' as={ReachLink} to="/admin/dashboard">
        <Button w='100%'  _hover={{ backgroundColor: 'teal' }}>Retour</Button>
      </Link>
    </Flex>
  );
};
export default DetailsTransfert;
