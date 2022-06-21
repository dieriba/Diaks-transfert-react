import {
  Table,
  Thead,
  Tbody,
  Tr,
  Icon,
  Th,
  Td,
  Link,
  TableContainer,
} from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { EditIcon,DeleteIcon } from '../icons';

const TableComp = (
  clientName,
  senderName,
  city,
  amountOfMoneyInEuro,
  date,
  id,
  hasTakeMoney
) => {
  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Agent</Th>
            <Th>Code</Th>
            <Th>Nom Client</Th>
            <Th>Ville</Th>
            <Th>Numéro</Th>
            <Th>Montant</Th>
            <Th>Statut</Th>
            <Th>Ajouté le</Th>
            <Th>Détails</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
          <Tr fontSize="1rem">
            <Td>Dansoko</Td>
            <Td>T598</Td>
            <Td>Ousmane Bangoura</Td>
            <Td>Conakry</Td>
            <Td>622.34.17.25</Td>
            <Td>50000</Td>
            <Td>
              {hasTakeMoney ? (
                <Badge colorScheme="green">Payé</Badge>
              ) : (
                <Badge colorScheme="red">Non payé</Badge>
              )}
            </Td>
            <Td>21/06/2022</Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                Détails
              </Link>
            </Td>
            <Td>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={EditIcon} cursor="pointer" />
              </Link>
              <Link _hover={{ color: 'teal' }} as={ReachLink} to="/user/login">
                <Icon fontSize="25px" as={DeleteIcon} />
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TableComp