import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import useAuthRedirect from '../../hooks/users/useAuthRedirect';
import { useAuthContext } from '../../context/context-provider/authContext';
const SignInForm = () => {
  const [show, setShow] = useState(false);

  const {
    handleLogin,
    showAlert,
    alertText,
    displayError,
    cleanError,
    isLoading,
  } = useAuthContext();
  const handleClick = () => {
    setShow(!show);
  };

  // HOOKS TO REDIRECT LOGGED USER TO THEIR BELONG HOMEPAGES
  useAuthRedirect();

  const loginFormValue = {
    username: '',
    password: '',
  };

  const [value, setValues] = useState(loginFormValue);

  const onSubmit = e => {
    const { username, password } = value;
    e.preventDefault();
    if (!username) return displayError('Pseudo Requis');
    if (!password) return displayError('Mot de Passe Requis');
    handleLogin({ username, password });
  };

  const handleLoginForm = e => {
    setValues(prevObj => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
  };
  return (
    <Flex
      width="full"
      p={4}
      w={[350, 400]}
      h="auto"
      borderWidth={1}
      flexDirection="column"
      px={4}
      boxShadow="lg"
    >
      <Box py={3} alignSelf="flex-end">
        <ColorModeSwitcher />
      </Box>
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
      <Text
        textAlign="left"
        mb="1rem"
        fontSize={['xl', '2xl']}
        fontStyle="italic"
      >
        Se Connecter
      </Text>

      <form onSubmit={onSubmit}>
        <Box>
          <Input
            variant="filled"
            placeholder="Nom d'utilisateur"
            id="username"
            onChange={handleLoginForm}
            name="username"
          />
        </Box>
        <Box marginTop="15px">
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
    </Flex>
  );
};

export default SignInForm;
