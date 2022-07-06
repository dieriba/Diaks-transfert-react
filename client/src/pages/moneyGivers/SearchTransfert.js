import {
  Button,
  NumberInput,
  NumberInputField,
  VStack,
} from '@chakra-ui/react';
import { useMoneyGiverContext } from '../../context/context-provider/moneyGiverContext';
import {
  ValidateTransfert,
  SearchTransfertComp,
  AlertDialogPop,
} from '../../components/moneygiver';
const SearchTransfert = () => {
  const handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;
    handleChange({ name, value });
  };

  const {
    cleanError,
    errorStatus,
    displayError,
    transfertCode,
    showAlert,
    alertText,
    searchTransfert,
    isLoading,
    handleChange,
    foundTransfert,
    transfert,
    resetPage,
    contactNumber,
    transfertValidated,
  } = useMoneyGiverContext();

  if (foundTransfert) {
    return (
      <VStack w="100%">
        <ValidateTransfert
          showAlert={showAlert}
          alertText={alertText}
          cleanError={cleanError}
          {...transfert}
          errorStatus={errorStatus}
        />
        <NumberInput
          size="md"
          value={contactNumber}
          variant="filled"
          width="90%"
        >
          <NumberInputField
            onChange={handleInput}
            placeholder="Contact"
            id="contactNumber"
            name="contactNumber"
            variant="filled"
          />
        </NumberInput>
        {!transfertValidated && <AlertDialogPop w="90%" h="teal" />}
        {transfertValidated && (
          <Button
            w="90%"
            _hover={{ backgroundColor: 'teal' }}
            onClick={resetPage}
          >
            Validez Nouveau Transfert
          </Button>
        )}
      </VStack>
    );
  }

  return (
    <SearchTransfertComp
      searchTransfert={searchTransfert}
      displayError={displayError}
      isLoading={isLoading}
      showAlert={showAlert}
      errorStatus={errorStatus}
      cleanError={cleanError}
      alertText={alertText}
      transfertCode={transfertCode}
      handleInput={handleInput}
    />
  );
};
export default SearchTransfert;
