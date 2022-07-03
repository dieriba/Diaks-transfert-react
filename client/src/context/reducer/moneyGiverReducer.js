import { RESET_PAGE } from '../action/moneyGiverAction';
import {
  SET_LOADING_BEGIN,
  SET_LOADING_SUCCESS,
  SET_LOADING_ERROR,
  DISPLAY_ERROR,
  CLEAN_ERROR,
  HANDLE_CHANGE,
  SEARCH_TRANSFERT_SUCCESS,
} from '../action/moneyGiverAction';

const moneyGiverReducer = (state, action) => {
  const { type } = action;

  if (type === RESET_PAGE) {
    return {
      ...state,
      foundTransfert: false,
      transfert: {},
      transfertValidated: false,
    };
  }
  if (type === SEARCH_TRANSFERT_SUCCESS) {
    const { transfert, transfertFoundId } = action.payload;
    return {
      ...state,
      foundTransfert: true,
      transfert,
      isLoading: false,
      transfertFoundId,
    };
  }
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

  if (type === SET_LOADING_BEGIN) return { ...state, isLoading: true };
  if (type === SET_LOADING_SUCCESS)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'success',
      transfertValidated: true,
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

export default moneyGiverReducer;
