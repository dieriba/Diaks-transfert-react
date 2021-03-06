import { CircularProgress, Flex } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex
      w="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        isIndeterminate
        emptycolor="gray.200"
        color="teal"
        size="200px"
        thickness="4px"
      />
    </Flex>
  );
};
export default Loading;
