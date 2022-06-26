import React, { useState } from 'react';
import {
  Input,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const AddAgentForm = () => {
  const {
    createAgent,
    showAlert,
    alertText,
    displayError,
    cleanError,
    isLoading,
    handleChange,
    errorStatus,
    senderNameUser,
    phoneNumberAgent,
    senderCode,
  } = useGlobalContext();

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!senderCode || !senderNameUser || !phoneNumberAgent)
      return displayError('Veuillez remplir tous les champs');

    createAgent();
  };

  return (
    <Flex
      justifyContent="center"
      direction="column"
      minHeight="90vh"
      width="100%"
      alignItems="center"
    >
      <Box
        w={[350, 400, 500]}
        height={showAlert ? '420px' : '350px'}
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
          Ajouter Agent
        </Text>

        <form onSubmit={onSubmit}>
          <VStack spacing={6}>
            <Input
              variant="filled"
              placeholder="Nom Agent"
              id="senderNameAgent"
              onChange={handleInput}
              name="senderNameUser"
              value={senderNameUser}
            />
            <Input
              variant="filled"
              placeholder="Numéro Ex: XX-XX-XX-XX-XX"
              id="phoneNumberAgent"
              onChange={handleInput}
              name="phoneNumberAgent"
              value={phoneNumberAgent}
            />
            <Input
              variant="filled"
              placeholder="Code"
              id="senderCode"
              onChange={handleInput}
              name="senderCode"
              value={senderCode}
            />
            <Button
              w="100%"
              isLoading={isLoading}
              marginTop="20px"
              type="submit"
            >
              Ajouter Agent
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddAgentForm;
