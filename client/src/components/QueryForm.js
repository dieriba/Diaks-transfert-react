import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Text,
  Select,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  Grid,
  Fade,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/contextProvider';
import useGetAgent from '../hooks/useGetAgents';

const QueryForm = () => {
  const {
    handleChange,
    getAllAgents,
    moneyTypesOptions,
    agents,
    cityOptions,
    hasPaid,
    isLoading,
    showQueryForm,
    queryDateEnd,
    queryDateStart,
    queryClientName,
    querySenderName,
    queryCity,
    queryHasTakeMoney,
    queryMoneyTypes,
    getAllTransferts,
    resetQueryForm
  } = useGlobalContext();

  useGetAgent();
  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    e.stopPropagation();
    handleChange({ name, value });
  };

  const onSubmit = e => {
    e.preventDefault();
    getAllAgents();
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetQueryForm();
  }
  return (
    <Fade in={showQueryForm} unmountOnExit>
      <Grid
        height="650px"
        borderWidth={1}
        p={4}
        direction="column"
        mt="1rem"
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
            <Select
              onChange={handleInput}
              name="queryCity"
              variant="filled"
              cursor="pointer"
              value={queryCity}
            >
              {['', ...cityOptions].map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </Select>
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
            <RadioGroup
              defaultValue={hasPaid ? null : 'false'}
              display="flex"
              justifyContent="center"
            >
              <Stack spacing={5} direction="row">
                <Radio
                  colorScheme="red"
                  onChange={handleInput}
                  name="hasPaid"
                  value="false"
                  checked={hasPaid === false ? true : false}
                >
                  N'a Pas Payé
                </Radio>
                <Radio
                  colorScheme="green"
                  onChange={handleInput}
                  name="hasPaid"
                  value="true"
                  checked={hasPaid === true ? true : false}
                >
                  A Payé
                </Radio>
              </Stack>
            </RadioGroup>
            <Button
              w="100%"
              _hover={{ backgroundColor: 'red', color: 'white' }}
              type='button'
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
    </Fade>
  );
};

export default QueryForm;
