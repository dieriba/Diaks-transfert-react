import { Td, Th } from '@chakra-ui/react';

const TdRow = ({ children }) => {
  return <Td textAlign="center">{children}</Td>;
};

const ThRow = ({ children }) => {
  return <Th textAlign="center">{children}</Th>;
};

export { TdRow, ThRow };
