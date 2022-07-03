import {
  Input,
  Button,
  Text,
  Select,
  Stack,
  VStack,
  Grid,
  FormLabel,
  Checkbox,
} from '@chakra-ui/react';
import useTransfertContext from '../../context/context-provider/transfertContext';
import { useAgentContext } from '../../context/context-provider/agentContext';
import { useAuthContext } from '../../context/context-provider/authContext';

const QueryFormMobile = () => {
  const {
    handleChange,
    moneyTypesOptions,
    cityOptions,
    isLoading,
    queryDateEnd,
    queryDateStart,
    queryClientName,
    querySenderName,
    queryCity,
    queryHasTakeMoney,
    queryMoneyTypes,
    getAllTransferts,
    resetQueryForm,
  } = useTransfertContext();
  const { agents } = useAgentContext();
  const { userRole } = useAuthContext();
  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const checked = e.target.checked;
    handleChange({ name, value, type, checked });
  };

  const onSubmit = e => {
    e.preventDefault();
    getAllTransferts();
  };

  const handleReset = e => {
    e.preventDefault();
    resetQueryForm();
  };
  return (
    <Grid
      height="650px"
      borderWidth={1}
      p={4}
      direction="column"
      mt="3rem"
      boxShadow="lg"
    >
      <form onSubmit={onSubmit}>
        <VStack spacing={6}>
          <Text textAlign="left" fontSize="2xl" fontStyle="italic">
            Recherche Transfert
          </Text>
          <Select
            name="queryMoneyTypes"
            id="queryMoneyTypes"
            onChange={handleInput}
            variant="filled"
            cursor="pointer"
            value={queryMoneyTypes}
          >
            {['', ...moneyTypesOptions].map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </Select>
          {userRole !== 'agent' && (
            <Select
              onChange={handleInput}
              name="querySenderName"
              variant="filled"
              cursor="pointer"
              value={querySenderName}
            >
              {['', ...agents].map((agent, index) => {
                const { senderName } = agent;
                return (
                  <option key={index} value={senderName}>
                    {senderName || ''}
                  </option>
                );
              })}
            </Select>
          )}
          {userRole !== 'moneyGiver' && (
            <Select
              onChange={handleInput}
              name="queryCity"
              variant="filled"
              cursor="pointer"
              value={queryCity}
            >
              {['', ...cityOptions].map((city, index) => {
                if (city === 'COLLAB' && userRole === 'mediumAdmin')
                  return null;
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </Select>
          )}
          <Input
            variant="filled"
            placeholder="Nom Prénom"
            id="clientName"
            value={queryClientName}
            onChange={handleInput}
            name="queryClientName"
          />

          <Input
            variant="filled"
            type="date"
            id="start"
            value={queryDateStart}
            onChange={handleInput}
            name="queryDateStart"
          />
          <Input
            variant="filled"
            type="date"
            id="end"
            value={queryDateEnd}
            onChange={handleInput}
            name="queryDateEnd"
          />
          {userRole !== 'moneyGiver' && (
            <Stack spacing={5} direction="row">
              <FormLabel fontStyle="italic">A Pris L'argent</FormLabel>
              <Checkbox
                name="queryHasTakeMoney"
                onChange={handleInput}
                colorScheme="green"
                checked={queryHasTakeMoney}
                defaultChecked={queryHasTakeMoney}
              />
            </Stack>
          )}

          <Button
            w="100%"
            _hover={{ backgroundColor: 'red', color: 'white' }}
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            w="100%"
            _hover={{ backgroundColor: 'teal', color: 'white' }}
            isLoading={isLoading}
            type="submit"
            onClick={getAllTransferts}
          >
            Recherche
          </Button>
        </VStack>
      </form>
    </Grid>
  );
};

export default QueryFormMobile;
