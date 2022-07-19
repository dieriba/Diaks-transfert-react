import {
  GET_RATE,
  NEW_RATE_ADDED,
  CONVERT_MONEY,
  SUBMIT_NEW_RATE,
  DISPLAY_ERROR,
  CLEAN_ERROR,
  HANDLE_CHANGE,
} from '../action/globalAction';

const convertReducer = (state, action) => {
  const { type } = action;

  if (type === CONVERT_MONEY) {
    return {
      ...state,
      rate : action.payload.rate,
      amountEuro: action.payload.euro,
      amountGnf: action.payload.gnf,
      fee: action.payload.fee,
      isLoading: false,
    };
  }

  if (type === CLEAN_ERROR)
    return { ...state, showAlert: false, alertText: '' };
  if (type === HANDLE_CHANGE) {
    const { name, value } = action.payload;

    return {
      ...state,
      [name]: value,
    };
  }
  if (type === DISPLAY_ERROR)
    return {
      ...state,
      alertText: action.payload.alertText,
      showAlert: true,
      errorStatus: 'error',
    };

  if (type === GET_RATE) {
    return { ...state, rate: action.payload };
  }

  if (type === SUBMIT_NEW_RATE) {
    return { ...state, newRate: action.payload };
  }

  if (type === NEW_RATE_ADDED) {
    const { rate, message } = action.payload;
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: message,
      errorStatus: 'success',
      rate,
    };
  }
};

export default convertReducer;
