import { Flex, Icon, Menu, Link, MenuButton, Text } from '@chakra-ui/react';
import { NavLink as ReachLink } from 'react-router-dom';
const NavItem = ({ icon, title, path , color}) => {
  return (
    <Flex 
    mt="15px" 
    w="100%" 
    alignItems="flex-center"
    textAlign='center'
    fontSize={18}
    >
      <Menu>
        <Link
          as={ReachLink}
          to={path}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'teal' }}
          _activeLink={{ backgroundColor: 'teal' }}
          w="100%"
        >
          <MenuButton  
          w="100%">
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
