import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  Link,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';



import { EditIcon, DeleteIcon } from '../icons';
import { Badge } from '@chakra-ui/react';

const TableCompMobile = ({
  clientName,
  senderName,
  city,
  amountOfMoneyInEuro,
  date,
  id,
  hasTakeMoney,
}) => {
  return (
    <TableContainer
      width="90%"
      boxShadow="lg"
      
      borderWidth={1}
      borderRadius={7}
    >
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Th color="teal">Agent</Th>
            <Td width="10px">Diakhoumba</Td>
          </Tr>
          <Tr>
            <Th color="teal">Code</Th>
            <Td>D15</Td>
          </Tr>
          <Tr>
            <Th color="teal">Ajouté le</Th>
            <Td>12/06/2022</Td>
          </Tr>
          <Tr>
            <Th color="teal">Nom</Th>
            <Td>Ousmane Bangoura</Td>
          </Tr>
          <Tr>
            <Th color="teal">Contact</Th>
            <Td>622.34.14.25</Td>
          </Tr>
          <Tr>
            <Th color="teal">Numéro</Th>
            <Td>622-34-17-25</Td>
          </Tr>
          <Tr>
            <Th color="teal">Ville</Th>
            <Td>Conakry</Td>
          </Tr>
          <Tr>
            <Th color="teal">Type Retrait</Th>
            <Td>Orange Money</Td>
          </Tr>
          <Tr>
            <Th color="teal">Montant</Th>
            <Td>5500</Td>
          </Tr>
          <Tr>
            <Th color="teal">Statut</Th>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
          </Tr>
          <Tr>
            <Th color="teal">Actions</Th>
            <Td>
              <Link as = {ReachLink}to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link as = {ReachLink}to="/user/login">
                <Icon fontSize="30px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableCompMobile;
