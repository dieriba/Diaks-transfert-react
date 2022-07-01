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

const AlertDialogPop = ({ _id, ml, h, s , deleteFromDb}) => {
  const cancelRef = useRef();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <Button
        _hover={{ backgroundColor: h ? h : null }}
        ml={ml ? ml : null}
        size={s ? s : null}
        onClick={() => setIsOpen(true)}
      >
        Supprimer
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
          <AlertDialogHeader>Supprimer le transfert?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Etes vous sûr de vouloir supprimer le transfert ?.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
              Non
            </Button>
            <Button onClick={() => deleteFromDb(_id)} colorScheme="red" ml={3}>
              Oui
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogPop;
