import {
  SET_EDIT_USER,
  GET_ALL_USERS,
  CANCEL_MODIFICATION_USER,
  SET_LOADING_BEGIN,
  SET_LOADING_SUCCESS,
  SET_LOADING_ERROR,
  DISPLAY_ERROR,
  CLEAN_ERROR,
  HANDLE_CHANGE,
  RESET_FORM,
} from '../action/userAction';

const userReducer = (state, action) => {
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

  if (type === GET_ALL_USERS) {
    const { users } = action.payload;
    return {
      ...state,
      users,
      isLoading: false,
    };
  }
  if (type === SET_LOADING_ERROR)
    return {
      ...state,
      alertText: action.payload,
      isLoading: false,
      showAlert: true,
      errorStatus: 'error',
    };

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

  if (type === SET_EDIT_USER) {
    const user = state.users.find(user => user._id === action.payload);
    const { _id, username, role } = user;

    return {
      ...state,
      isEditingUser: true,
      editUserId: _id,
      username,
      password: '',
      confirmPassword: '',
      role,
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

  if (type === CANCEL_MODIFICATION_USER)
    return { ...state, isEditingUser: false, username: '', role: 'agent' };
};
export default userReducer;
