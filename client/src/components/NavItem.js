import { Flex, Icon, Menu, Link, MenuButton, Text } from '@chakra-ui/react';
import { NavLink as ReachLink } from 'react-router-dom';
const NavItem = ({ icon, title, path }) => {
  return (
    <Flex mt="15px" flexDir="column" w="100%" alignItems="flex-start">
      <Menu placement="righ">
        <Link
          as={ReachLink}
          to={path}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'teal' }}
          _activeLink={{ backgroundColor: 'teal' }}
          w="90%"
        >
          <MenuButton w="100%">
            <Flex display="flex" alignItems="center">
              <Icon as={icon} />
              <Text ml={4}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};
export default NavItem;
