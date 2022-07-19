import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Select,
  FormLabel,
  Stack,
  VStack,
  NumberInput,
  NumberInputField,
  Flex,
  Checkbox,
} from '@chakra-ui/react';
import useGetAgentsQuery from '../../hooks/agents/useGetAgentsQuery';
import useTransfertContext from '../../context/context-provider/transfertContext';
import { useAgentContext } from '../../context/context-provider/agentContext';
import { useAuthContext } from '../../context/context-provider/authContext';

const TransfertForm = () => {
  const { agents } = useAgentContext();
  const {
    isEditingTransfert,
    hasPaid,
    errorStatus,
    cityOptions,
    hasFullyPaid,
    clientName,
    phoneNumber,
    amountOfMoneyInEuro,
    moneyTypesOptions,
    moneyTypes,
    handleChange,
    isLoading,
    senderName,
    city,
    alertText,
    cancelModification,
    cleanError,
    resetTransfertForm,
    showAlert,
    editTransfert,
    createTransfert,
    displayError,
    amountGiven,
    date
  } = useTransfertContext();
  const { userRole } = useAuthContext();
  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const checked = e.target.checked;
    handleChange({ name, value, type, checked });
  };
  const [phoneNumberState, setPhoneNumberState] = useState(true);

  const handleReset = e => {
    e.preventDefault();
    resetTransfertForm();
  };

  useGetAgentsQuery();
  useEffect(() => {
    if (moneyTypes === 'LIQUIDE') {
      setPhoneNumberState(true);
    } else {
      setPhoneNumberState(false);
    }
  }, [moneyTypes]);

  const onSubmit = e => {
    e.preventDefault();

    if (!clientName || !amountOfMoneyInEuro)
      return displayError('Veuillez remplir tous les champs requis');

    if (moneyTypes === 'Orange Money' && !phoneNumber)
      return displayError('Numéro Requis');

    if (isEditingTransfert) return editTransfert();

    createTransfert();
  };

  const handleCancel = e => {
    e.preventDefault();
    cancelModification('transfert');
  };
  return (
    <Flex width="100%" justifyContent="center">
      <Box
        w={[300, 400, 500]}
        height="auto"
        borderWidth={1}
        flexDirection="column"
        p={4}
        mt="2rem"
        boxShadow="lg"
      >
        <form onSubmit={onSubmit}>
          <VStack spacing={6}>
            <Text textAlign="left" fontSize="2xl" fontStyle="italic">
              {isEditingTransfert ? 'Modifier Transfert' : 'Ajouter Transfert'}
            </Text>
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
            <Select
              name="moneyTypes"
              onChange={handleInput}
              variant="filled"
              cursor="pointer"
              value={moneyTypes}
            >
              {moneyTypesOptions?.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>
            {userRole !== 'agent' && (
              <Select
                onChange={handleInput}
                name="senderName"
                variant="filled"
                cursor="pointer"
                value={senderName}
              >
                {agents?.map(agent => {
                  const { _id, senderName } = agent;
                  return (
                    <option key={_id} value={senderName}>
                      {senderName}
                    </option>
                  );
                })}
              </Select>
            )}
            <Select
              onChange={handleInput}
              name="city"
              variant="filled"
              cursor="pointer"
              value={city}
            >
              {cityOptions?.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </Select>
            <Input
              variant="filled"
              placeholder="Nom Prénom"
              id="senderName"
              value={clientName}
              onChange={handleInput}
              name="clientName"
            />
            <NumberInput
              size="md"
              value={amountOfMoneyInEuro}
              variant="filled"
              width="100%"
            >
              <NumberInputField
                onChange={handleInput}
                placeholder="Montant en €"
                id="amountOfMoneyInEuro"
                name="amountOfMoneyInEuro"
                variant="filled"
              />
            </NumberInput>

            <Input
              variant="filled"
              type="date"
              id="start"
              value={date}
              onChange={handleInput}
              name="date"
            />

            <Stack spacing={5} direction="row">
              <FormLabel fontStyle="italic">A Payé </FormLabel>
              <Checkbox
                name="hasPaid"
                onChange={handleInput}
                colorScheme="green"
                checked={hasPaid}
                defaultChecked={hasPaid}
              />
              <FormLabel fontStyle="italic">En Totalité </FormLabel>
              <Checkbox
                name="hasFullyPaid"
                onChange={handleInput}
                colorScheme="green"
                checked={hasFullyPaid}
                defaultChecked={hasFullyPaid}
              />
            </Stack>

            {!hasFullyPaid && (
              <NumberInput
                size="md"
                value={amountGiven}
                variant="filled"
                width="100%"
              >
                <NumberInputField
                  onChange={handleInput}
                  placeholder="Montant Donné"
                  id="amountGiven"
                  name="amountGiven"
                  variant="filled"
                />
              </NumberInput>
            )}
            <Input
              variant="filled"
              placeholder="Numéro Ex : XXX-XX-XX-XX"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleInput}
              isDisabled={phoneNumberState}
              name="phoneNumber"
            />

            <Button
              w="100%"
              _hover={{ backgroundColor: 'red', color: 'white' }}
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              w="100%"
              _hover={{ backgroundColor: 'teal', color: 'white' }}
              isLoading={isLoading}
              type="submit"
            >
              {isEditingTransfert ? 'Modifier Transfert' : 'Ajouter Transfert'}
            </Button>
            {isEditingTransfert && (
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

export default TransfertForm;
