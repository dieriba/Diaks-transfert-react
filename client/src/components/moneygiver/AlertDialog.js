import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useMoneyGiverContext } from '../../context/context-provider/moneyGiverContext';

const AlertDialogPop = ({ _id, ml, h, s, w }) => {
  const cancelRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { validateTransfert } = useMoneyGiverContext();
  return (
    <>
      <Button
        _hover={{ backgroundColor: h ? h : null }}
        ml={ml ? ml : null}
        size={s ? s : null}
        w={w ? w : null}
        onClick={() => setIsOpen(true)}
      >
        Valider Transfert
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={isOpen}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Valider le transfert?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Etes vous sûr de vouloir valider le transfert ?.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
              Non
            </Button>
            <Button
              onClick={() => validateTransfert(_id)}
              colorScheme="green"
              ml={3}
            >
              Oui
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogPop;
