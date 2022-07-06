import {
  Button,
  Table,
  Tbody,
  TableContainer,
  Tr,
  Flex,
  Link,
  Badge,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import { TdRowMobile, ThRowMobile } from '../styleComp/TableCompStyle';
import useTransfertContext from '../../context/context-provider/transfertContext';
import { useAuthContext } from '../../context/context-provider/authContext';
const DetailsTransfert = () => {
  const {
    senderName,
    city,
    moneyTypes,
    clientName,
    phoneNumber,
    amountOfMoneyInEuro,
    hasTakeMoney,
    date,
    updatedDate,
    hasBeenModified,
    payoutDay,
    rate,
    leftAmountToPay,
    hasFullyPaid,
    contactNumber,
    amountGiven,
  } = useTransfertContext();

  const { userRole } = useAuthContext();

  let backLink;

  if (userRole === 'highAdmin') backLink = '/admin/transferts';
  if (userRole === 'mediumAdmin') backLink = '/med-admin/transferts';
  if (userRole === 'agent') backLink = '/agent/transferts';
  if (userRole === 'moneyGiver') backLink = '/moneygiver/all-transferts';
  return (
    <Flex
      width="100%"
      minH="90vh"
      alignItems="center"
      direction="column"
      mt="2rem"
    >
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
            {moneyTypes && (
              <Tr>
                <ThRowMobile>Type</ThRowMobile>
                <TdRowMobile>{moneyTypes}</TdRowMobile>
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
            <Tr>
              <ThRowMobile>A payé En Totalité </ThRowMobile>
              <TdRowMobile>
                {hasFullyPaid ? (
                  <Badge colorScheme="green">Oui</Badge>
                ) : (
                  <Badge colorScheme="red">Non</Badge>
                )}
              </TdRowMobile>
            </Tr>
            {!hasFullyPaid && (
              <>
                {amountGiven && (
                  <Tr>
                    <ThRowMobile>Montant Donné</ThRowMobile>
                    <TdRowMobile>{amountGiven.toLocaleString()}</TdRowMobile>
                  </Tr>
                )}
                {leftAmountToPay && (
                  <Tr>
                    <ThRowMobile>Montant Restant A Payé</ThRowMobile>
                    <TdRowMobile>
                      {leftAmountToPay.toLocaleString()} €
                    </TdRowMobile>
                  </Tr>
                )}
              </>
            )}

            <Tr>
              <ThRowMobile>Statut</ThRowMobile>
              <TdRowMobile>
                {hasTakeMoney ? (
                  <Badge colorScheme="green">Payé</Badge>
                ) : (
                  <Badge colorScheme="red">Non payé</Badge>
                )}
              </TdRowMobile>
            </Tr>

            {rate && (
              <Tr>
                <ThRowMobile>Taux</ThRowMobile>
                <TdRowMobile>
                  {rate.toLocaleString()} Franc Guinéens
                </TdRowMobile>
              </Tr>
            )}
            {city && (
              <Tr>
                <ThRowMobile>Ville</ThRowMobile>
                <TdRowMobile>{city}</TdRowMobile>
              </Tr>
            )}

            {hasBeenModified && (
              <Tr>
                <ThRowMobile>Modifié Le</ThRowMobile>
                <TdRowMobile>{moment(updatedDate).format('L')}</TdRowMobile>
              </Tr>
            )}
            {payoutDay && (
              <Tr>
                <ThRowMobile>Paiement Le</ThRowMobile>
                <TdRowMobile>{moment(payoutDay).format('L')}</TdRowMobile>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Link mt="1rem" w="90%" as={ReachLink} to={backLink}>
        <Button w="100%" _hover={{ backgroundColor: 'teal' }}>
          Retour
        </Button>
      </Link>
    </Flex>
  );
};
export default DetailsTransfert;
