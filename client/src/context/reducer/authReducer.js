import {
  SETUP_USER_SUCCESS,
  DISPLAY_ERROR,
  RESET_FORM,
  SET_LOADING_BEGIN,
  SET_LOADING_SUCCESS,
  SET_LOADING_ERROR,
  HANDLE_CHANGE,
  CLEAN_ERROR,
  LOGOUT_USER,
} from '../action/authAction';

const authReducer = (state, action) => {
  const { type } = action;

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

  if (type === SETUP_USER_SUCCESS) {
    const { token, user, userRole } = action.payload;
    return {
      ...state,
      isLoading: false,
      user,
      token,
      userRole,
      showAlert: false,
      alertText: '',
      nameUser: user?.username,
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

  if (type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: '',
      userRole: '',
      nameUser : ''
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
};
export default authReducer;
