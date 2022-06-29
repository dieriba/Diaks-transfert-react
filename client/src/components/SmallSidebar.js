import {
  Flex,
  useColorModeValue,
  IconButton,
  Icon,
  Box,
} from '@chakra-ui/react';
import NavItemMobile from './NavItemMobile';
import { data } from '../dataList/adminSidebar';
import { CloseIcon } from '../icons';
import { useGlobalContext } from '../context/contextProvider';
import { data as adminSidebar } from '../dataList/adminSidebar';
import { data as agentSidebar } from '../dataList/agentSidebar';
import { data as mediumAdminSidebar } from '../dataList/mediumAdminSidebar';
import { data as moneyGiverSidebar } from '../dataList/moneyGiverSidebar';
import { ScaleFade } from '@chakra-ui/react';
const SmallSidebar = () => {
  const color = useColorModeValue('light', 'dark');
  const { logoutUser, userRole, nameUser, showSidebar, toggleSidebar } =
    useGlobalContext();
  let sidebarData;

  if (userRole === 'highAdmin') sidebarData = adminSidebar;
  if (userRole === 'admin') sidebarData = adminSidebar;
  if (userRole === 'mediumAdmin') sidebarData = mediumAdminSidebar;
  if (userRole === 'agent') sidebarData = agentSidebar;
  if (userRole === 'moneyGiver') sidebarData = moneyGiverSidebar;
  return (
    <ScaleFade initialScale={0.9} in={showSidebar} unmountOnExit>
      <Flex
        w="100vw"
        h="100vh"
        zIndex={20}
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        bg={`${color === 'dark' ? '#1A202C' : 'white'}`}
        justifyContent="center"
        display={[`${showSidebar ? 'flex' : 'none'}`, 'none']}
      >
        <Icon
          ml={4}
          mt={9}
          fontSize="30px"
          as={CloseIcon}
          onClick={toggleSidebar}
        />

        <Box 
        h='100%'
        mt={4}>
          {sidebarData.map((link, index) => {
            return (
              <NavItemMobile
                key={index}
                title={link.title}
                icon={link.icon}
                index={index}
                path={link.path}
                color={color}
              />
            );
          })}
        </Box>
      </Flex>
    </ScaleFade>
  );
};
export default SmallSidebar;
