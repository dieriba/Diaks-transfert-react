import {
  SET_EDIT_MONEYTAKER,
  CHANGE_PAGE_MONEYTAKERS,
  CANCEL_MODIFICATION_MONEYTAKER,
  GET_MONEY_TAKERS,
  SET_LOADING_BEGIN,
  SET_LOADING_SUCCESS,
  SET_LOADING_ERROR,
  DISPLAY_ERROR,
  CLEAN_ERROR,
  HANDLE_CHANGE,
  RESET_FORM,
} from '../action/moneyTakerAction';

const moneyTakerReducer = (state, action) => {
  const { type } = action;

  if (type === DISPLAY_ERROR)
    return {
      ...state,
      alertText: action.payload.alertText,
      showAlert: true,
      errorStatus: 'error',
    };

  if (type === CLEAN_ERROR)
    return { ...state, showAlert: false, alertText: '' };

  if (type === HANDLE_CHANGE) {
    const { name, value } = action.payload;

    return {
      ...state,
      currentPage: 1,
      [name]: value,
    };
  }

  if (type === SET_EDIT_MONEYTAKER) {
    const moneyTaker = state.moneyTakers.find(
      moneyTaker => moneyTaker._id === action.payload
    );
    const { phoneNumber, amountMoney, name, optionalInfo, _id } = moneyTaker;
    return {
      ...state,
      isEditingMoneyTaker: true,
      editMoneyTakerId: _id,
      moneyTakerAmount: amountMoney,
      moneyTakerPhoneNumber: phoneNumber,
      moneyTakerName: name,
      moneyTakerOptionalInfo: optionalInfo,
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

  if (type === CHANGE_PAGE_MONEYTAKERS)
    return { ...state, currentMoneyTakerPage: action.payload };

  if (type === CANCEL_MODIFICATION_MONEYTAKER)
    return {
      ...state,
      isEditingMoneyTaker: false,
      moneyTakerAmount: '',
      moneyTakerPhoneNumber: '',
      moneyTakerName: '',
      moneyTakerOptionalInfo: '',
    };

  if (type === GET_MONEY_TAKERS) {
    const { moneyTakers, iterator, currentPage, endingLink, totalPages } =
      action.payload;

    return {
      ...state,
      moneyTakers,
      isLoading: false,
      showAlert: false,
      currentMoneyTakerPage: currentPage,
      totalPagesMoneyTaker: totalPages,
      endingLinkMoneyTaker: endingLink,
      iteratorMoneyTaker: iterator,
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
};

export default moneyTakerReducer;
