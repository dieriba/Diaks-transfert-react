import React from 'react';
import { SignInForm, SignUpForm } from '../components';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';

const Auth = () => {
  return (
    <Box w={[300, 400, 500]} height = '500px' justifySelf="center">
      <Tabs isFitted variant="enclosed" defaultIndex={1}>
        <TabList mb="1em">
          <Tab>Inscription</Tab>
          <Tab>Connection</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignUpForm />
          </TabPanel>
          <TabPanel>
            <SignInForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Auth;
