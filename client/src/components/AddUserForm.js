import React, { useState } from 'react';
import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const AddUserForm = () => {
  const [show, setShow] = useState(false);

  const {
    handleLogin,
    showAlert,
    alertText,
    displayError,
    cleanError,
    isLoading,
  } = useGlobalContext();
  const handleClick = () => {
    setShow(!show);
  };

  const loginFormValue = {
    pseudo: '',
    password: '',
  };

  const [value, setValues] = useState(loginFormValue);

  const onSubmit = e => {
    const { pseudo, password } = value;
    e.preventDefault();
    if (!pseudo) return displayError('Pseudo Requis');
    if (!password) return displayError('Mot de Passe Requis');
    handleLogin();
  };

  const handleLoginForm = e => {
    setValues(prevObj => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
  };
  return (
    <Box maxWidth="450px" justifySelf="center">
      <Text textAlign="center" fontSize="3xl" fontStyle="italic">
        Se Connecter
      </Text>
    
      {showAlert && (
        <Alert
          status="error"
          fontSize="1rem"
          height="auto"
          borderRadius="15px"
          marginBottom="0.5rem"
          marginTop="0.5rem"
          position="relative"
        >
          <AlertIcon />
          {alertText}
          <CloseButton position="absolute" right="1rem" onClick={cleanError} />
        </Alert>
      )}

      <form onSubmit={onSubmit}>
        <Box>
          <FormLabel htmlFor="pseudo">Pseudo</FormLabel>
          <Input
            variant="filled"
            placeholder="Pseudo"
            id="pseudo"
            type="pseudo"
            onChange={handleLoginForm}
            name="pseudo"
          />
        </Box>
        <Box marginTop="15px">
          <FormLabel htmlFor="email">Mot de Passe</FormLabel>
          <InputGroup>
            <Input
              variant="filled"
              placeholder="Mot de passe"
              id="password"
              type={show ? 'text' : 'password'}
              onChange={handleLoginForm}
              name="password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button w="100%" isLoading={isLoading} marginTop="20px" type="submit">
          Connection
        </Button>
      </form>
    </Box>
  );
};

export default AddUserForm;
