import React from 'react';
import { SignInForm } from '../../components';
import { Box , Grid } from '@chakra-ui/react';

const Login = () => {
  return (
      <Box w={[300, 400, 500]} height="500px" justifySelf="center">
        <SignInForm />
      </Box>
  );
};

export default Login;
