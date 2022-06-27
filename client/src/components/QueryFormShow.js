import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Text,
  Select,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  Grid,
} from '@chakra-ui/react';

import { useGlobalContext } from '../context/contextProvider';
import 'moment/locale/fr';
import { useRef } from 'react';
import { QueryForm } from '.';
const QueryFormShow = ({ isOnMobile, mt, w, text, mb, ml }) => {
  console.log(mt);
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        mt={mt ? mt : null}
        mb={mb ? mb : null}
        ml={ml ? ml : null}
        w={w ? w : null}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        {text}
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
          <DrawerBody>
            <QueryForm />
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
export default QueryFormShow;
