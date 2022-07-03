import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Table,
  Tbody,
  TableContainer,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/fr';
import { useRef } from 'react';
import useTransfertContext from '../../context/context-provider/transfertContext';
import { useGlobalContext } from '../../context/context-provider/globalContext';
import { TdRowMobile, ThRowMobile } from '../styleComp/TableCompStyle';
const CalculShow = ({ ml, mt, mb, w }) => {
  const {
    totalAmountTransfered,
    queryMoneyTypes,
    queryCity,
    querySenderName,
    queryHasTakeMoney,
    queryDateStart,
    queryDateEnd,
  } = useTransfertContext();

  const { isOnMobile } = useGlobalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button
        size="md"
        w={w ? w : null}
        mt={mt ? mt : null}
        mb={mb ? mb : null}
        ml={ml ? ml : null}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Résultats Calcul
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={isOnMobile ? 'bottom' : 'right'}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Résultats</DrawerHeader>

          <DrawerBody>
            <TableContainer width="95%" boxShadow="lg">
              <Table size="sm" variant="simple">
                <Tbody>
                  {querySenderName && (
                    <Tr>
                      <ThRowMobile>Nom Agent</ThRowMobile>
                      <TdRowMobile>{querySenderName}</TdRowMobile>
                    </Tr>
                  )}
                  {queryMoneyTypes && (
                    <Tr>
                      <ThRowMobile>Type</ThRowMobile>
                      <TdRowMobile>{queryMoneyTypes}</TdRowMobile>
                    </Tr>
                  )}
                  {queryHasTakeMoney && (
                    <Tr>
                      <ThRowMobile>A Pris L'argent</ThRowMobile>
                      <TdRowMobile>{queryHasTakeMoney}</TdRowMobile>
                    </Tr>
                  )}
                  {queryCity && (
                    <Tr>
                      <ThRowMobile>Ville</ThRowMobile>
                      <TdRowMobile>{queryCity}</TdRowMobile>
                    </Tr>
                  )}
                  {queryDateStart && (
                    <Tr>
                      <ThRowMobile>Du</ThRowMobile>
                      <TdRowMobile>
                        {moment(queryDateStart).format('L')}
                      </TdRowMobile>
                    </Tr>
                  )}
                  {queryDateEnd && (
                    <Tr>
                      <ThRowMobile>Au</ThRowMobile>
                      <TdRowMobile>
                        {moment(queryDateEnd).format('L')}
                      </TdRowMobile>
                    </Tr>
                  )}
                  {totalAmountTransfered && (
                    <Tr>
                      <ThRowMobile>Montant</ThRowMobile>
                      <TdRowMobile>
                        {totalAmountTransfered.toLocaleString()}
                      </TdRowMobile>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Retour
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default CalculShow;
