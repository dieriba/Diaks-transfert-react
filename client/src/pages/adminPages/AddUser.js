import { useState } from 'react';
import {
  Input,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Flex,
  VStack,
} from '@chakra-ui/react';
import useUserContext from '../../context/context-provider/userContext';

const AddUser = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    showAlert,
    alertText,
    displayError,
    cleanError,
    isLoading,
    handleChange,
    errorStatus,
    username,
    password,
    role,
    confirmPassword,
    roleOptions,
    senderCode,
    senderNameUser,
    phoneNumberAgent,
    createUser,
    isEditingUser,
    cancelModification,
  } = useUserContext();

  const handleCancel = e => {
    e.preventDefault();
    cancelModification();
  };

  const [showFormAgent, setShowFormAgent] = useState(
    role === 'agent' ? true : false
  );
  const handleClick = id => {
    if (id === 1) return setShow(!show);
    return setShowConfirm(!showConfirm);
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'role' && value !== 'agent') setShowFormAgent(false);
    if (name === 'role' && value === 'agent') setShowFormAgent(true);
    handleChange({ name, value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!username || !password)
      return displayError('Veuillez remplir tous les champs');
    if (showFormAgent && (!senderNameUser || !senderCode))
      return displayError('Veuillez remplir tous les champs');
    createUser();
  };

  return (
    <Flex direction="column" width="100%" alignItems="center">
      <Box
        w={[300, 400, 500]}
        height="auto"
        borderWidth={1}
        flexDirection="column"
        p={4}
        mt="2rem"
        boxShadow="lg"
      >
        {showAlert && (
          <Alert
            status={errorStatus || 'error'}
            fontSize="0.8rem"
            height="auto"
            borderRadius="15px"
            marginBottom="0.5rem"
            marginTop="0.5rem"
            position="relative"
          >
            <AlertIcon />
            {alertText}
            <CloseButton
              position="absolute"
              right="0.3rem"
              onClick={cleanError}
            />
          </Alert>
        )}
        <Text
          borderBottomWidth={1}
          textAlign="center"
          fontSize="2xl"
          mb="1rem"
          fontStyle="italic"
        >
          {isEditingUser ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}
        </Text>

        <form onSubmit={onSubmit}>
          <VStack spacing={6}>
            <Input
              variant="filled"
              placeholder="Nom d'utilisateur"
              id="username"
              onChange={handleInput}
              name="username"
              value={username}
            />
            <Select
              onChange={handleInput}
              name="role"
              variant="filled"
              cursor="pointer"
              value={role}
            >
              {roleOptions?.map((role, index) => {
                return (
                  <option key={index} value={role}>
                    {role}
                  </option>
                );
              })}
            </Select>
            {!isEditingUser ? (
              <>
                <InputGroup>
                  <Input
                    variant="filled"
                    placeholder="Mot de passe"
                    id="password"
                    type={show ? 'text' : 'password'}
                    onChange={handleInput}
                    name="password"
                    value={password}
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => handleClick(1)}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Input
                    variant="filled"
                    placeholder="Confirmez Mot de passe"
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    onChange={handleInput}
                    name="confirmPassword"
                    value={confirmPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {showConfirm ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </>
            ) : null}
            {showFormAgent && (
              <>
                <Text
                  borderBottomWidth={1}
                  textAlign="center"
                  fontSize="2xl"
                  mb="1rem"
                  fontStyle="italic"
                >
                  Info Agent
                </Text>
                <Input
                  variant="filled"
                  placeholder="Nom Agent"
                  id="senderNameAgent"
                  onChange={handleInput}
                  name="senderNameUser"
                  value={senderNameUser}
                />
                <Input
                  variant="filled"
                  placeholder="Numéro Ex: XX-XX-XX-XX-XX"
                  id="phoneNumberAgent"
                  onChange={handleInput}
                  name="phoneNumberAgent"
                  value={phoneNumberAgent}
                />
                <Input
                  variant="filled"
                  placeholder="Code"
                  id="senderCode"
                  onChange={handleInput}
                  name="senderCode"
                  value={senderCode}
                />
              </>
            )}
            <Button
              w="100%"
              isLoading={isLoading}
              marginTop="20px"
              type="submit"
            >
              {isEditingUser ? 'Modifier Utilisateur' : 'Créer un utilisateur'}
            </Button>
            {isEditingUser && (
              <Button
                w="100%"
                _hover={{ backgroundColor: 'teal', color: 'white' }}
                type="button"
                onClick={handleCancel}
              >
                Annuler Modification
              </Button>
            )}
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddUser;
