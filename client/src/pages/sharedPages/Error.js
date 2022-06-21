import { Link } from 'react-router-dom';
import { Box, Text, Heading } from '@chakra-ui/react';

const Error = () => {
  return (
    <Box 
    w={[300, 400, 700]} 
    textAlign="center" 
    justifySelf="center"
    alignSelf='center'
    >
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
            Oops ! Page non trouvé
          </Heading>
          <Text fontSize={[150, 200, 252]} margin="0px" padding="0px">
            404
          </Text>
        </Box>
        <Heading
          fontSize={[15, 20, 20]}
          fontWeight="400"
          textTransform="uppercase"
          marginTop="0px"
          marginBottom="25px"
        >
          Nous somme désolés, mais la page que vous recherchez n'existe pas
        </Heading>
        <Link to="/" className="">
          Retour à la page précèdente
        </Link>
      </Box>
    </Box>
  );
};
export default Error;
