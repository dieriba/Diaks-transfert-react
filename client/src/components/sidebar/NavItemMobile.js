import { Flex, Icon, Menu, Link, MenuButton, Text } from '@chakra-ui/react';
import { NavLink as ReachLink } from 'react-router-dom';
import { useGlobalContext } from '../../context/context-provider/globalContext';

const NavItem = ({ icon, title, path, color }) => {
  const { toggleSidebar } = useGlobalContext();

  return (
    <Flex w="100%" alignItems="flex-center" textAlign="center" fontSize={18}>
      <Menu>
        <Link
          as={ReachLink}
          to={path}
          p={3}
          _activeLink={{
            textDecor: 'none',
            backgroundColor: `${color === 'dark' ? 'teal' : '#1A202C'}`,
            color: `${color === 'dark' ? '1A202C' : 'white'}`,
          }}
          w="100%"
        >
          <MenuButton w="100%" onClick={toggleSidebar}>
            <Flex display="flex" justifyContent="center" alignItems="center">
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
