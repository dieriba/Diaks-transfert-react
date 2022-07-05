import { Avatar, Divider, Flex, Heading, Text, Box } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { IconButton } from '@chakra-ui/react';
import NavItem from './NavItem';
import { data as adminSidebar } from '../../dataList/adminSidebar';
import { data as agentSidebar } from '../../dataList/agentSidebar';
import { data as mediumAdminSidebar } from '../../dataList/mediumAdminSidebar';
import { data as moneyGiverSidebar } from '../../dataList/moneyGiverSidebar';
import { useAuthContext } from '../../context/context-provider/authContext';

const Sidebar = () => {
  const { logoutUser, userRole, nameUser } = useAuthContext();
  let sidebarData;

  if (userRole === 'highAdmin') sidebarData = adminSidebar;
  if (userRole === 'admin') sidebarData = adminSidebar;
  if (userRole === 'mediumAdmin') sidebarData = mediumAdminSidebar;
  if (userRole === 'agent') sidebarData = agentSidebar;
  if (userRole === 'moneyGiver') sidebarData = moneyGiverSidebar;

  return (
    <Flex
      position="sticky"
      w="300px"
      h="100vh"
      flexDir="column"
      p={4}
      ml="0"
      left={0}
      borderRightWidth={1}
      boxShadow="lg"
      display={['none', 'none', 'none', 'flex']}
    >
      <Box mt="6rem">
        {sidebarData.map((link, index) => {
          return (
            <NavItem
              key={index}
              title={link.title}
              icon={link.icon}
              index={index}
              path={link.path}
              isClickable={link.onClick ? true : false}
            />
          );
        })}
      </Box>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        position="absolute"
        bottom="1%"
      >
        <Divider />
        <Flex mt={4} align="center">
          <Flex ml={4} justifyContent="space-between" w="170px">
            <Box>
              <Heading as="h3" size="sm">
                {nameUser && nameUser}
              </Heading>
              <Text fontSize="1rem">{userRole}</Text>
            </Box>
            <IconButton
              onClick={logoutUser}
              aria-label="Search database"
              icon={<BiLogOut />}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Sidebar;
