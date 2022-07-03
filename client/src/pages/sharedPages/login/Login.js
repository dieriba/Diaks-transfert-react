import React from 'react';
import { SignInForm } from '../../../components';
import { Flex } from '@chakra-ui/react';

const Login = () => {
  return (
    <Flex minH="100vh" width="100%" justifyContent="center" alignItems="center">
      <SignInForm />
    </Flex>
  );
};

export default Login;
