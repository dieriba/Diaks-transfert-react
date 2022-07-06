import {
  Table,
  Tbody,
  TableContainer,
  Tr,
  Flex,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/fr';
import { TdRowMobile, ThRowMobile } from '../styleComp/TableCompStyle';

const ValidateTransfert = ({
  senderName,
  clientName,
  amountOfMoneyInEuro,
  date,
  moneyTypes,
  phoneNumber,
  showAlert,
  errorStatus,
  alertText,
  cleanError,
  contactNumber
}) => {
  return (
    <Flex width="100%" alignItems="center" direction="column" mt="2rem">
      {showAlert && (
        <Alert
          status={errorStatus || 'error'}
          fontSize="0.8rem"
          height="auto"
          borderRadius="15px"
          marginBottom="0.5rem"
          marginTop="0.5rem"
          position="relative"
          w="90%"
        >
          <AlertIcon />
          {alertText}
          <CloseButton
            position="absolute"
            right="0.3rem"
            onClick={cleanError}
          />
        </Alert>
      )}
      <TableContainer width={['90%', '90%']} boxShadow="lg">
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
            {date && (
              <Tr>
                <ThRowMobile>Date d'ajout </ThRowMobile>
                <TdRowMobile>{moment(date).format('L')}</TdRowMobile>
              </Tr>
            )}
            {moneyTypes && (
              <Tr>
                <ThRowMobile>Type</ThRowMobile>
                <TdRowMobile>{moneyTypes}</TdRowMobile>
              </Tr>
            )}
            {moneyTypes === 'ORANGE MONEY' && (
              <Tr>
                <ThRowMobile>Numéro</ThRowMobile>
                <TdRowMobile>{phoneNumber}</TdRowMobile>
              </Tr>
            )}
            {contactNumber && (
              <Tr>
                <ThRowMobile>Numéro de contact</ThRowMobile>
                <TdRowMobile>{contactNumber}</TdRowMobile>
              </Tr>
            )}
            {amountOfMoneyInEuro && (
              <Tr>
                <ThRowMobile>Montant A Retiré</ThRowMobile>
                <TdRowMobile>
                  {amountOfMoneyInEuro.toLocaleString()} €
                </TdRowMobile>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
export default ValidateTransfert;
