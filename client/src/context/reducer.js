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
  RESET_FORM,
  CHANGE_PAGE,
  RESET_PAGE,
  EDIT_TRANSFERT_SUCCESS,
  GET_ALL_USERS,
  SET_EDIT_AGENT,
  SET_EDIT_USER,
  CANCEL_MODIFICATION,
  CANCEL_MODIFICATION_TRANSFERT,
  CANCEL_MODIFICATION_USER,
  CANCEL_MODIFICATION_AGENT,
  GET_DETAILS_TRANSFERT,
} from './action';

import { initialState } from './contextProvider';

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
  if (type === SET_EDIT_AGENT) {
    const agent = state.agents.find(agent => agent._id === action.payload);
    const { _id, phoneNumber, senderName, senderCode } = agent;
    return {
      ...state,
      isEditingAgent: true,
      editAgentId: _id,
      phoneNumberAgent: phoneNumber,
      senderNameUser: senderName,
      senderCode,
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
  if (type === GET_ALL_TRANSFERTS_ERROR) {
    return { ...state, isLoading: false };
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

  if (type === EDIT_TRANSFERT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'success',
      isEditingTransfert: false,
      clientName: '',
      amountOfMoneyInEuro: '',
      moneyTypes: 'LIQUIDE',
      city: 'CONAKRY',
      phoneNumber: '',
    };
  }

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
  if (type === CANCEL_MODIFICATION_USER)
    return { ...state, isEditingUser: false, username: '', role: 'agent' };
  if (type === CANCEL_MODIFICATION_AGENT)
    return {
      ...state,
      isEditingAgent: false,
      senderNameUser: '',
      phoneNumberAgent: '',
      senderCode: '',
    };

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

export default reducer;
