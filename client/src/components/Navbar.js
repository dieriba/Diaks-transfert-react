import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiLogOut } from 'react-icons/bi';
import { useGlobalContext } from '../context/contextProvider';

const Navbar = () => {
  const { toggleSidebar, logoutUser } = useGlobalContext();
  return (
    <Flex
      height="100px"
      alignItems="center"
      position="sticky"
      justifyContent="space-between"
      p={4}
      borderBottomWidth={1}
      boxShadow="lg"
    >
      <Box justifySelf="flex-end">
        <Icon
          as={GiHamburgerMenu}
          fontSize="30px"
          cursor="pointer"
          display={['content', 'content', 'content', 'none']}
          onClick={toggleSidebar}
        />
      </Box>
      <IconButton
        display={['inline-flex', 'inline-flex', 'inline-flex', 'none']}
        fontSize={23}
        aria-label="Search database"
        icon={<BiLogOut />}
        onClick={logoutUser}
      />
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Navbar;
