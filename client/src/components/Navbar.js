import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
const Navbar = () => {
  return (
    <SimpleGrid height="50px" position="sticky">
      <Text>Navbar</Text>
      <ColorModeSwitcher />
    </SimpleGrid>
  );
};

export default Navbar;
