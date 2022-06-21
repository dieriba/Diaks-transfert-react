import {
  CLEAN_ERROR,
  DISPLAY_ERROR,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
} from './action';

const reducer = (state, action) => {
  const { type } = action;

  if (type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (type === SETUP_USER_SUCCESS) {
    return { ...state, isLoading: false };
  }

  if (type === SETUP_USER_ERROR) {
    return { ...state, isLoading: false };
  }

  if (type === DISPLAY_ERROR)
    return {
      ...state,
      alertText: action.payload.alertText,
      showAlert: true,
    };

  if (type === CLEAN_ERROR)
    return { ...state, showAlert: false, alertText: '' };

  if (type === HANDLE_CHANGE) {
    const { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
    };
  }
};

export default reducer;
