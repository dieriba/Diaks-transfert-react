import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box, Flex, Text } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
const Navbar = () => {
  return (
    <Flex height="100px" position="sticky" >
      <Box justifySelf='flex-end'>
        <GiHamburgerMenu />
      </Box>
      <Text>Navbar</Text>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Navbar;
