import { Link } from 'react-router-dom';
import { Box, Text, Heading, Flex } from '@chakra-ui/react';

const Unauthorized = () => {
  return (
    <Flex
      minHeight="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box w={[300, 400, 700]} textAlign="center">
        <Box maxWidth="600px" width="100%">
          <Box>
            <Heading
              fontSize="16px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="3px"
              paddingLeft="6px"
              margin="0px"
            >
              Oops ! Vous n'êtes pas autorisés
            </Heading>
            <Text fontSize={[150, 200, 252]} margin="0px" padding="0px">
              401
            </Text>
          </Box>
          <Heading
            fontSize={[15, 20, 20]}
            fontWeight="400"
            textTransform="uppercase"
            marginTop="0px"
            marginBottom="25px"
          >
            Nous somme désolés, mais vous n'avez pas le droit d'accèder à cette
            page
          </Heading>
          <Link to="/" className="">
            Retour à la page précèdente
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};
export default Unauthorized;
