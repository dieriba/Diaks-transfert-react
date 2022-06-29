import {
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Flex,
  VStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const AddAgentForm = () => {
  const {
    showAlert,
    alertText,
    displayError,
    cleanError,
    isLoading,
    handleChange,
    errorStatus,
    isEditingMoneyTaker,
    cancelModification,
    editMoneyTaker,
    moneyTakerAmount,
    moneyTakerName,
    moneyTakerPhoneNumber,
    moneyTakerOptionalInfo,
    createMoneyTaker,
  } = useGlobalContext();

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const handleCancel = e => {
    e.preventDefault();
    cancelModification('moneyTaker');
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!moneyTakerName || !moneyTakerPhoneNumber || !moneyTakerAmount)
      return displayError('Veuillez remplir tous les champs');
    if (isEditingMoneyTaker) return editMoneyTaker();
    createMoneyTaker();
  };

  return (
    <Flex
      direction="column"
      width="100%"
      alignItems="center"
      minH="85vh"
      mt="2rem"
    >
      <Box
        w={[350, 400, 500]}
        height="auto"
        borderWidth={1}
        flexDirection="column"
        p={4}
        boxShadow="lg"
      >
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
        <Text
          borderBottomWidth={1}
          textAlign="center"
          fontSize="2xl"
          mb="1rem"
          fontStyle="italic"
        >
          {isEditingMoneyTaker
            ? 'Modifier Récupérateur'
            : 'Ajouter Récupérateur'}
        </Text>

        <form onSubmit={onSubmit}>
          <VStack spacing={6}>
            <Input
              variant="filled"
              placeholder="Nom Récupérateur"
              id="moneyTakerName"
              onChange={handleInput}
              name="moneyTakerName"
              value={moneyTakerName}
            />
            <NumberInput
              size="md"
              value={moneyTakerAmount}
              variant="filled"
              width="100%"
              name="moneyTakerAmount"
              id="moneyTakerAmount"
            >
              <NumberInputField
                value={moneyTakerAmount}
                placeholder="Montant en €"
                variant="filled"
                onChange={handleInput}
              />
            </NumberInput>
            <Input
              variant="filled"
              placeholder="Numéro"
              id="moneyTakerPhoneNumber"
              onChange={handleInput}
              name="moneyTakerPhoneNumber"
              value={moneyTakerPhoneNumber}
            />
            <Input
              type="textarea"
              id="moneyTakerOptionalInfo"
              onChange={handleInput}
              placeholder="Info supplémentaires"
              name="moneyTakerOptionalInfo"
              value={moneyTakerOptionalInfo}
            />
            <Button
              w="100%"
              isLoading={isLoading}
              marginTop="20px"
              type="submit"
            >
              {isEditingMoneyTaker
                ? 'Modifier Récupérateur'
                : 'Ajouter Récupérateur'}
            </Button>
            {isEditingMoneyTaker && (
              <Button
                w="100%"
                _hover={{ backgroundColor: 'teal', color: 'white' }}
                type="button"
                onClick={handleCancel}
              >
                Annuler Modification
              </Button>
            )}
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddAgentForm;
