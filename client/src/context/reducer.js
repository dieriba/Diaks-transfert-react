import {
  CLEAN_ERROR,
  DISPLAY_ERROR,
  GET_WINDOW_WIDTH,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  SET_EDIT_TRANSFERT,
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

  if (type === TOGGLE_SIDEBAR)
    return { ...state, showSidebar: !state.showSidebar };

  if (type === GET_WINDOW_WIDTH) {
    if (action.payload < 1000)
      return { ...state, windowWidth: action.payload, isOnMobile: true };

    return { ...state, windowWidth: action.payload, isOnMobile: false };
  }

  if (action.type === SET_EDIT_TRANSFERT) {
    const transfert = state.transferts.find(
      transfert => transfert._id === action.payload.id
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
      isEditing: true,
      editJobId: _id,
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
};

export default reducer;
