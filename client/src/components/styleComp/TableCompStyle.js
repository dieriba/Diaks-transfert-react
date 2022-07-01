import { Td, Th } from '@chakra-ui/react';

const TdRow = ({ children }) => {
  return <Td textAlign="center">{children}</Td>;
};

const ThRow = ({ children }) => {
  return <Th textAlign="center">{children}</Th>;
};

const ThRowMobile = ({ children }) => {
  return (
    <Th borderWidth={1} w="50%" textAlign="center" borderColor="teal">
      {children}
    </Th>
  );
};

const TdRowMobile = ({ children }) => {
  return (
    <Td borderWidth={1} textAlign="center" borderColor="teal">
      {children}
    </Td>
  );
};

export { TdRow, ThRow , ThRowMobile , TdRowMobile };
