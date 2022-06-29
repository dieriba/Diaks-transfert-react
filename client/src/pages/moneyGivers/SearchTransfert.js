import {
  VStack,
  Flex,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Button,
  Input,
} from '@chakra-ui/react';

import { useGlobalContext } from '../../context/contextProvider';

const SearchTransfert = () => {
  const {
    showAlert,
    cleanError,
    alertText,
    errorStatus,
    handleChange,
    displayError,
    isLoading,
    searchTransfert,
    searchTransfertCode,
  } = useGlobalContext();

  const searchCode = e => {
    e.preventDefault();
    if (!searchTransfertCode)
      return displayError('Veuillez Entrez Le Code Du Transfert');

    searchTransfert();
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };
  return (
    <Flex width="100%" direction="column" alignItems="center">
      <Box
        w={[350, 400, '90%']}
        height="auto"
        borderWidth={1}
        flexDirection="column"
        p={4}
        mt="2rem"
        boxShadow="lg"
      >
        <form onSubmit={searchCode}>
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
              Recherchez Un Transfert
            </Text>

            <Input
              onChange={handleInput}
              placeholder="Rechercher Transfert"
              id="searchTransfertCode"
              name="searchTransfertCode"
              variant="filled"
              value={searchTransfertCode}
            />

            <Button
              w="100%"
              _hover={{ backgroundColor: 'teal', color: 'white' }}
              fontStyle="italic"
              type="submit"
              isLoading={isLoading}
            >
              Rechercher Transfert
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
export default SearchTransfert;
