import { Avatar, Divider, Flex, Heading, Text, Box } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { IconButton } from '@chakra-ui/react';
import NavItem from './NavItem';
import { data } from '../dataList.js/adminSidebar';

const Sidebar = () => {
  return (
    <Flex position="sticky" w="300px" h="100vh" flexDir="column">
      <Box mt='6rem'>
        {data.map((link, index) => {
          return (
            <NavItem
              key={index}
              title={link.title}
              icon={link.icon}
              index={index}
              path={link.path}
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
          <Avatar size="sm" />
          <Flex ml={4} justifyContent="space-between" w="170px">
            <Box>
              <Heading as="h3" size="sm">
                Dieriba
              </Heading>
              <Text fontSize="1rem">Admin</Text>
            </Box>
            <IconButton aria-label="Search database" icon={<BiLogOut />} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Sidebar;
