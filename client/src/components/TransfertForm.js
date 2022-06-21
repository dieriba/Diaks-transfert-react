import React, { useEffect, useState } from 'react';
import {
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Select,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const TransfertForm = () => {
  const {
    showAlert,
    displayError,
    alertText,
    cleanError,
    isLoading,
    moneyTypesOptions,
    moneyTypes,
    cityOptions,
    clientName,
    phoneNumber,
    amountOfMoneyInEuro,
    addTransfert,
    handleChange,
    hasPaid,
    isEditing,
  } = useGlobalContext();

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const [phoneNumberState, setPhoneNumberState] = useState(true);

  useEffect(() => {
    if (moneyTypes === 'Liquide') {
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

    addTransfert();
  };

  return (
    <Box maxWidth="450px" margin="0 auto" marginTop="5rem">
      <form onSubmit={onSubmit}>
        <VStack spacing={4}>
          <Text textAlign="left" fontSize="2xl" fontStyle="italic">
            {isEditing ? 'Modifier Transfert' : 'Ajouter Transfert'}
          </Text>
          {showAlert && (
            <Alert
              status="error"
              fontSize="0.9rem"
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
          >
            {moneyTypesOptions.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </Select>
          <Select
            onChange={handleInput}
            name="senderName"
            variant="filled"
            cursor="pointer"
          >
            {cityOptions.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </Select>
          <Select
            onChange={handleInput}
            name="city"
            variant="filled"
            cursor="pointer"
          >
            {cityOptions.map((senderName, index) => {
              return (
                <option key={index} value={senderName}>
                  {senderName}
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
            placeholder="Numéro Ex : XXX-XX-XX-XX"
            id="amountOfMoneyInEuro"
            value={phoneNumber}
            onChange={handleInput}
            isDisabled={phoneNumberState}
            name="phoneNumber"
          />
          <RadioGroup
            defaultValue={hasPaid ? null : 'false'}
            display="flex"
            justifyContent="center"
          >
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="red"
                onChange={handleInput}
                name="hasPaid"
                value="false"
                checked={hasPaid === false ? true : false}
              >
                N'a Pas Payé
              </Radio>
              <Radio
                colorScheme="green"
                onChange={handleInput}
                name="hasPaid"
                value="true"
                checked={hasPaid === true ? true : false}
              >
                A Payé
              </Radio>
            </Stack>
          </RadioGroup>
          <Button w="100%" isLoading={isLoading} type="submit">
            Ajouter Transfert
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TransfertForm;
