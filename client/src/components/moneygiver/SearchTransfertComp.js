import {
  Button,
  Flex,
  Box,
  VStack,
  Alert,
  AlertIcon,
  CloseButton,
  Text,
  Input,
} from '@chakra-ui/react';

const SearchTransfertComp = ({
  transfertCode,
  searchTransfert,
  displayError,
  isLoading,
  showAlert,
  errorStatus,
  cleanError,
  alertText,
  handleInput,
}) => {
  const searchCode = e => {
    e.preventDefault();
    if (!transfertCode)
      return displayError('Veuillez Entrez Le Code Du Transfert');
    searchTransfert();
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
              id="transfertCode"
              name="transfertCode"
              variant="filled"
              value={transfertCode}
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
export default SearchTransfertComp;
