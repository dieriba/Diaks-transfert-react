import {
  GET_WINDOW_WIDTH,
  GET_RATE,
  NEW_RATE_ADDED,
  CONVERT_MONEY,
  TOGGLE_SIDEBAR,
  SUBMIT_NEW_RATE,
} from '../action/globalAction';

const globalReducer = (state, action) => {
  const { type } = action;

  if (type === TOGGLE_SIDEBAR)
    return { ...state, showSidebar: !state.showSidebar };

  if (type === GET_WINDOW_WIDTH) {
    if (action.payload < 1000)
      return { ...state, windowWidth: action.payload, isOnMobile: true };

    return { ...state, windowWidth: action.payload, isOnMobile: false };
  }

  if (type === CONVERT_MONEY) {
    return {
      ...state,
      amountEuro: action.payload.euro,
      amountGnf: action.payload.gnf,
      fee: action.payload.fee,
      isLoading: false,
    };
  }

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

export default globalReducer;
