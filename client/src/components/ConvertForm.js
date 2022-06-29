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
  FormHelperText,
  InputGroup,
  InputRightAddon,
  FormControl,
} from '@chakra-ui/react';

import { useGlobalContext } from '../context/contextProvider';

import useGetRate from '../hooks/useGetRate';

const ConvertForm = () => {
  const {
    showAlert,
    cleanError,
    alertText,
    errorStatus,
    rate,
    handleChange,
    isOnMobile,
    amountEuro,
    amountGnf,
    displayError,
    convertMoney,
    isLoading,
    fee,
    newRate,
    addNewRate,
  } = useGlobalContext();

  useGetRate();
  const handleSubmit = e => {
    e.preventDefault();
    if (!amountEuro && !amountGnf)
      return displayError('Veuillez remplir une des valeurs');

    convertMoney();
  };

  const submitNewRate = e => {
    if (!newRate) return displayError('Veuillez entrez un taux');
    e.preventDefault();

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
        w={[300, 400, 500]}
        height="auto"
        borderWidth={1}
        flexDirection="column"
        p={4}
        mt="2rem"
        boxShadow="lg"
      >
        <Text textAlign="left" fontSize="sm" fontStyle="italic">
          Taux : {rate ? rate : ''}
        </Text>
        <form onSubmit={handleSubmit}>
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
              Convertisseur
            </Text>
            <FormControl>
              <InputGroup>
                <NumberInput
                  size="md"
                  value={amountEuro}
                  variant="filled"
                  width="100%"
                >
                  <NumberInputField
                    onChange={handleInput}
                    placeholder="Montant en €"
                    id="amountOfMoneyInEuro"
                    name="amountEuro"
                    variant="filled"
                  />
                </NumberInput>
                <InputRightAddon
                  w={isOnMobile ? '25%' : '15%'}
                  children="EURO"
                />
              </InputGroup>
              {fee && (
                <FormHelperText mt="0.4rem" textAlign="right">
                  Frais : {fee}
                </FormHelperText>
              )}
            </FormControl>

            <InputGroup>
              <NumberInput
                size="md"
                value={amountGnf}
                variant="filled"
                width="100%"
              >
                <NumberInputField
                  onChange={handleInput}
                  placeholder="Montant en Franc"
                  id="amountGnf"
                  name="amountGnf"
                  variant="filled"
                />
              </NumberInput>
              <InputRightAddon w={isOnMobile ? '25%' : '15%'} children="GNF" />
            </InputGroup>

            <Button
              w="100%"
              _hover={{ backgroundColor: 'teal', color: 'white' }}
              fontStyle="italic"
              type="submit"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Conversion
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
export default ConvertForm;
