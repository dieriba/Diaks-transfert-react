import { Flex, useColorModeValue, IconButton , Icon ,Box} from '@chakra-ui/react';
import NavItemMobile from './NavItemMobile';
import { data } from '../dataList/adminSidebar';
import { CloseIcon } from '../icons';
import { useGlobalContext } from '../context/contextProvider';
import {  ScaleFade } from '@chakra-ui/react';
const SmallSidebar = () => {
  const color = useColorModeValue('light', 'dark');
  const { showSidebar, toggleSidebar } = useGlobalContext();

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
        <Icon ml={5} mt={5} fontSize="30px" as={CloseIcon} onClick={toggleSidebar} />

        <Box mt={4}>
          {data.map((link, index) => {
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
