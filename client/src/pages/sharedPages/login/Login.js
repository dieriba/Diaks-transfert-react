import React from 'react';
import { SignInForm } from '../../../components';
import { Box, Grid, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

const Login = () => {
  return (
    <Flex
      minH='100vh'
      width = '100%'
      justifyContent = 'center'
      alignItems='center'
    >
      <SignInForm />
    </Flex>
  );
};

export default Login;
