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
  LOGOUT_USER,
  GET_ALL_AGENTS,
  CREATE_TRANSFERT_BEGIN,
  CREATE_TRANSFERT_SUCCESS,
  CREATE_TRANSFERT_ERROR,
  GET_ALL_TRANSFERTS_BEGIN,
  GET_ALL_TRANSFERTS_SUCCESS,
  GET_ALL_TRANSFERTS_ERROR,
  TOGGLE_QUERY_FORM,
  RESET_FORM,
  CHANGE_PAGE,
  RESET_PAGE,
  GET_ALL_USERS,
} from './action';

const reducer = (state, action) => {
  const { type } = action;

  if (type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (type === SETUP_USER_SUCCESS) {
    const { token, user, role } = action.payload;
    return {
      ...state,
      isLoading: false,
      user,
      token,
      role,
      showAlert: false,
      alertText: '',
    };
  }

  if (type === SETUP_USER_ERROR) {
    return {
      ...state,
      alertText: action.payload,
      isLoading: false,
      showAlert: true,
      errorStatus: 'error',
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

  if (type === TOGGLE_SIDEBAR)
    return { ...state, showSidebar: !state.showSidebar };

  if (type === GET_WINDOW_WIDTH) {
    if (action.payload < 1000)
      return { ...state, windowWidth: action.payload, isOnMobile: true };

    return { ...state, windowWidth: action.payload, isOnMobile: false };
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
      isEditing: true,
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

  if (type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }

  if (type === GET_ALL_AGENTS) {
    const { agents, iterator, currentPage, endingLink, totalPages } =
      action.payload;
    return {
      ...state,
      agents,
      senderName: agents[0]?.senderName,
      currentAgentPage: currentPage,
      totalPagesAgent: totalPages,
      endingLinkAgent: endingLink,
      iteratorAgent: iterator,
    };
  }
  if (type === GET_ALL_USERS) {
    const { users } = action.payload;
    return {
      ...state,
      users,
    };
  }
  if (type === CREATE_TRANSFERT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (type === CREATE_TRANSFERT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'success',
    };
  }

  if (type === CREATE_TRANSFERT_ERROR) {
    return {
      ...state,
      alertText: action.payload,
      isLoading: false,
      showAlert: true,
      errorStatus: 'error',
    };
  }

  if (type === GET_ALL_TRANSFERTS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (type === GET_ALL_TRANSFERTS_SUCCESS) {
    const { transferts, currentPage, totalPages, endingLink, iterator } =
      action.payload;
    return {
      ...state,
      transferts,
      currentPage,
      totalPages,
      endingLink,
      iterator,
      isLoading: false,
    };
  }
  if (type === GET_ALL_TRANSFERTS_ERROR) {
    return { ...state, isLoading: false };
  }

  if (type === TOGGLE_QUERY_FORM) {
    return { ...state, showQueryForm: !state.showQueryForm };
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

  if (type === CHANGE_PAGE) return { ...state, currentPage: action.payload };
};

export default reducer;
