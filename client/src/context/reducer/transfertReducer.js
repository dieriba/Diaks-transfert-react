import {
  SET_EDIT_TRANSFERT,
  GET_ALL_TRANSFERTS_SUCCESS,
  CHANGE_PAGE_TRANSFERT,
  CANCEL_MODIFICATION_TRANSFERT,
  GET_DETAILS_TRANSFERT,
  RESET_FORM,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
  SET_LOADING_SUCCESS,
  HANDLE_CHANGE,
  CLEAN_ERROR,
} from '../action/transfertAction';

const transfertReducer = (state, action) => {
  const { type } = action;

  if (type === CLEAN_ERROR)
    return { ...state, showAlert: false, alertText: '' };

  if (type === SET_EDIT_TRANSFERT) {
    const transfert = state.transferts.find(
      transfert => transfert._id === action.payload
    );
    const {
      _id,
      clientName,
      city,
      senderName,
      amountOfMoneyInEuro,
      hasTakeMoney,
      phoneNumber,
      moneyTypes,
      hasPaid,
      contactNumber,
    } = transfert;
    return {
      ...state,
      isEditingTransfert: true,
      editTransfertId: _id,
      clientName,
      city,
      senderName,
      amountOfMoneyInEuro,
      hasTakeMoney,
      phoneNumber,
      moneyTypes,
      hasPaid,
      contactNumber,
    };
  }

  if (type === SET_EDIT_TRANSFERT) {
    const transfert = state.transferts.find(
      transfert => transfert._id === action.payload
    );
    const {
      _id,
      clientName,
      city,
      senderName,
      amountOfMoneyInEuro,
      hasTakeMoney,
      phoneNumber,
      moneyTypes,
      hasPaid,
      contactNumber,
    } = transfert;
    return {
      ...state,
      isEditingTransfert: true,
      editTransfertId: _id,
      clientName,
      city,
      senderName,
      amountOfMoneyInEuro,
      hasTakeMoney,
      phoneNumber,
      moneyTypes,
      hasPaid,
      contactNumber,
    };
  }

  if (type === SET_LOADING_BEGIN) return { ...state, isLoading: true };
  if (type === SET_LOADING_SUCCESS)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'success',
    };
  if (type === SET_LOADING_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'error',
    };

  if (type === GET_ALL_TRANSFERTS_SUCCESS) {
    const { transferts, currentPage, totalPages, endingLink, iterator, sum } =
      action.payload;
    return {
      ...state,
      isEditingTransfert: false,
      transferts,
      currentPage,
      totalPages,
      endingLink,
      iterator,
      totalAmountTransfered: sum,
      isLoading: false,
    };
  }

  if (type === CHANGE_PAGE_TRANSFERT)
    return { ...state, currentPage: action.payload };

  if (type === CANCEL_MODIFICATION_TRANSFERT)
    return {
      ...state,
      isEditingTransfert: false,
      clientName: '',
      amountOfMoneyInEuro: '',
      moneyTypes: 'LIQUIDE',
      city: 'CONAKRY',
      phoneNumber: '',
    };

  if (type === HANDLE_CHANGE) {
    const { name, value } = action.payload;

    return {
      ...state,
      currentPage: 1,
      [name]: value,
    };
  }

  if (type === RESET_FORM) {
    return {
      ...state,
      queryClientName: '',
      queryMoneyTypes: 'Tous',
      queryCity: 'Tous',
      querySenderName: 'Tous',
      queryHasTakeMoney: false,
      queryDateStart: '',
      queryDateEnd: '',
      currentPage: 1,
    };
  }

  if (type === GET_DETAILS_TRANSFERT) {
    const transfert = state.transferts.find(
      transfert => transfert._id === action.payload
    );
    const {
      amountOfMoneyInEuro,
      hasPaid,
      city,
      moneyTypes,
      clientName,
      phoneNumber,
      senderName,
      hasTakeMoney,
      code,
      contactNumber,
      payoutDay,
      date,
      updatedDate,
      hasBeenModified,
      rate,
    } = transfert;

    return {
      ...state,
      amountOfMoneyInEuro,
      hasPaid,
      city,
      moneyTypes,
      clientName,
      phoneNumber,
      senderName,
      hasTakeMoney,
      code,
      contactNumber,
      payoutDay,
      date,
      updatedDate,
      hasBeenModified,
      rate,
    };
  }
};

export default transfertReducer;
