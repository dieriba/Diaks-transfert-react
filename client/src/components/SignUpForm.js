import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';

const SignUpForm = () => {
  const [show, setShow] = useState(false);

  const { signUpForm, handleSignUp, handleSignUpForm } = useGlobalContext();
  const { isErrors , pseudo , password , email , confirmPassword , condition} = signUpForm;
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Box maxWidth="450px" justifySelf="center">
      <Text textAlign="center" fontSize="3xl" fontStyle="italic">
        Inscription
      </Text>
      <form onSubmit={handleSignUp}>
        <FormControl isInvalid={isErrors.stateError}>
          <Box>
            <FormLabel htmlFor="pseudo">Pseudo</FormLabel>
            <Input
              variant="filled"
              placeholder="Pseudo"
              id="pseudo"
              type="text"
              onChange={e => handleSignUpForm(e)}
              name="pseudo"
              value={pseudo}
            />
            {isErrors !== undefined && isErrors.pseudo ? (
              <FormErrorMessage>Pseudo Requis.</FormErrorMessage>
            ) : null}
          </Box>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              variant="filled"
              placeholder="Pseudo"
              id="email"
              type="email"
              onChange={e => handleSignUpForm(e)}
              name="email"
              value={email}
            />
            {isErrors !== undefined && isErrors.email ? (
              <FormErrorMessage>Email Requis.</FormErrorMessage>
            ) : null}
          </Box>
          <Box marginTop="15px">
            <FormLabel htmlFor="password">Mot de Passe</FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Mot de passe"
                id="password"
                type={show ? 'text' : 'password'}
                onChange={e => handleSignUpForm(e)}
                name="password"
                value={password}
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
          <Box marginTop="15px">
            <FormLabel htmlFor="confirmPassword">
              Confirmez Mot de passe
            </FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Mot de passe"
                id="confirmPassword"
                type={show ? 'text' : 'password'}
                onChange={e => handleSignUpForm(e)}
                name="confirmPassword"
                value={confirmPassword}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isErrors !== undefined && isErrors.confirmPassword ? (
              <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
            ) : (
              ''
            )}
          </Box>
          <Checkbox
            colorScheme="green"
            mt={3}
            name="condition"
            onChange={e => handleSignUpForm(e)}
            value = {condition}
          >
            <Text fontSize={{ base: '13px', md: '15px', lg: '15px' }}>
              J'accepete les conditions générales d'inscriptions
            </Text>
          </Checkbox>
          {isErrors !== undefined && isErrors.condition ? (
            <FormErrorMessage>Veuillez chochez la case..</FormErrorMessage>
          ) : (
            ''
          )}
          <Button
            onClick={handleSignUp}
            w="100%"
            marginTop="13px"
            type="submit"
            fontStyle="italic"
          >
            Inscription
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default SignUpForm;
