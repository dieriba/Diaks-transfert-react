import { useState } from 'react';
import { useAuthContext } from '../../../context/context-provider/authContext';
import {
  VStack,
  Flex,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Button,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
const ChangePassword = () => {
  const {
    changePassword,
    isLoading,
    handleChange,
    oldPasswordAccount,
    newPasswordAccount,
    confirmNewPasswordAccount,
    showAlert,
    displayError,
    errorStatus,
    alertText,
    cleanError,
  } = useAuthContext();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const onSubmit = e => {
    e.preventDefault();
    if (
      !confirmNewPasswordAccount ||
      !oldPasswordAccount ||
      !newPasswordAccount
    )
      return displayError('Veuillez remplir tous les champs');

    changePassword();
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const handleClick = id => {
    if (id === 1) return setShowCurrentPassword(!showCurrentPassword);
    if (id === 2) return setShowNewPassword(!showNewPassword);
    return setShowConfirmNewPassword(!showConfirmNewPassword);
  };
  return (
    <Flex direction="column" width="100%" alignItems="center">
      <Box
        w={[350, 400, 500]}
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
          Modifier Mot de passe
        </Text>

        <form onSubmit={onSubmit}>
          <VStack spacing={6}>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Mot de passe actuel"
                id="oldPasswordAccount"
                type={showCurrentPassword ? 'text' : 'password'}
                onChange={handleInput}
                name="oldPasswordAccount"
                value={oldPasswordAccount}
              />

              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => handleClick(1)}>
                  {showCurrentPassword ? 'Hide' : 'Show '}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Nouveau Mot de passe"
                id="newPasswordAccount"
                type={showNewPassword ? 'text' : 'password'}
                onChange={handleInput}
                name="newPasswordAccount"
                value={newPasswordAccount}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => handleClick(2)}>
                  {showNewPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Confirmez Mot de passe"
                id="confirmNewPasswordAccount"
                type={showConfirmNewPassword ? 'text' : 'password'}
                onChange={handleInput}
                name="confirmNewPasswordAccount"
                value={confirmNewPasswordAccount}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showConfirmNewPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              w="100%"
              isLoading={isLoading}
              marginTop="20px"
              type="submit"
            >
              Modifier Mot de passe
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
export default ChangePassword;
