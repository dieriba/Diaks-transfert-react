import {
  VStack,
  Flex,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  NumberInput,
  NumberInputField,
  Button,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';

import { useGlobalContext } from '../../context/context-provider/contextProvider';
const Rate = () => {
  const {
    showAlert,
    cleanError,
    alertText,
    errorStatus,
    handleChange,
    isOnMobile,
    handleSubmit,
    displayError,
    isLoading,
    newRate,
    addNewRate,
  } = useGlobalContext();
  const submitNewRate = e => {
    e.preventDefault();
    if (!newRate) return displayError('Veuillez entrez un taux');

    addNewRate();
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };
  return (
    <Flex width="100%" direction="column" alignItems="center">
      <Box
        w={[350, 400, 500]}
        height="auto"
        borderWidth={1}
        flexDirection="column"
        p={4}
        mt="2rem"
        boxShadow="lg"
      >
        <form onSubmit={submitNewRate}>
          <VStack spacing={6}>
            {showAlert && (
              <Alert
                status={errorStatus || 'error'}
                fontSize="0.8rem"
                height="auto"
                borderRadius="15px"
                marginBottom="0.5rem"
                marginTop="0.5rem"
                position="relative"
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
            <Text textAlign="left" fontSize="2xl" fontStyle="italic">
              Changement Taux
            </Text>

            <InputGroup>
              <NumberInput
                size="md"
                value={newRate}
                variant="filled"
                width="100%"
              >
                <NumberInputField
                  onChange={handleInput}
                  placeholder="Nouveau Taux"
                  id="newRate"
                  name="newRate"
                  variant="filled"
                />
              </NumberInput>
              <InputRightAddon w={isOnMobile ? '25%' : '15%'} children="TAUX" />
            </InputGroup>

            <Button
              w="100%"
              _hover={{ backgroundColor: 'teal', color: 'white' }}
              fontStyle="italic"
              type="submit"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Ajouter Nouveau Taux
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
export default Rate;
