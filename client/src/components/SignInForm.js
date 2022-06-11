import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const SignInForm = () => {
  const [show, setShow] = useState(false);

  const { loginForm, handleLogin, handleLoginForm } = useGlobalContext();
  const { isErrors } = loginForm;
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Box maxWidth="450px" justifySelf="center">
      <Text textAlign="center" fontSize="3xl" fontStyle="italic">
        Se Connecter
      </Text>
      <form onSubmit={handleLogin}>
        <FormControl isInvalid={isErrors !== undefined && isErrors.isTrue}>
          <Box>
            <FormLabel htmlFor="pseudo">Pseudo</FormLabel>
            <Input
              variant="filled"
              placeholder="Pseudo"
              id="pseudo"
              type="pseudo"
              onChange={e => handleLoginForm(e)}
              name="pseudo"
            />
            {isErrors !== undefined && isErrors.pseudo ? (
              <FormErrorMessage>Pseudo Requis.</FormErrorMessage>
            ) : null}
          </Box>
          <Box marginTop="15px">
            <FormLabel htmlFor="email">Mot de Passe</FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Mot de passe"
                id="password"
                type={show ? 'text' : 'password'}
                onChange={e => handleLoginForm(e)}
                name="password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isErrors !== undefined && isErrors.password ? (
              <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
            ) : (
              ''
            )}
          </Box>
        </FormControl>
        <Button w="100%" marginTop="20px" type="submit">
          Connection
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
