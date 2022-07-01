import {
  CLEAN_ERROR,
  DISPLAY_ERROR,
  GET_WINDOW_WIDTH,
  HANDLE_CHANGE,
  GET_RATE,
  SET_LOADING,
  SHOW_ERROR,
  END_LOADING_SUCCESS,
  NEW_RATE_ADDED,
  RESET_FORM,
  CONVERT_MONEY,
  TOGGLE_SIDEBAR,
  SUBMIT_NEW_RATE
} from '../action/globalAction';

import {
  GET_AGENTS_QUERY,
  CHANGE_PAGE_AGENT,
  SET_EDIT_AGENT,
  GET_ALL_AGENTS,
  CANCEL_MODIFICATION_AGENT,
} from '../action/agentAction';

import {
  GET_ALL_TRANSFERTS_SUCCESS,
  CHANGE_PAGE_TRANSFERT,
  CANCEL_MODIFICATION_TRANSFERT,
  GET_DETAILS_TRANSFERT,
  SET_EDIT_TRANSFERT,
} from '../action/transfertAction';

import {
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  SET_EDIT_USER,
  GET_ALL_USERS,
  CANCEL_MODIFICATION_USER,
} from '../action/userAction';

import {
  SET_EDIT_MONEYTAKER,
  CHANGE_PAGE_MONEYTAKERS,
  CANCEL_MODIFICATION_MONEYTAKER,
  GET_MONEY_TAKERS,
} from '../action/moneyTakerAction';

import { initialState } from '../context-provider/contextProvider';

const reducer = (state, action) => {
  const { type } = action;

  if (type === SET_LOADING) return { ...state, isLoading: true };
  if (type === END_LOADING_SUCCESS)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      errorStatus: 'success',
    };

  if (type === SHOW_ERROR)
    return {
      ...state,
      alertText: action.payload,
      isLoading: false,
      showAlert: true,
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
  if (type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userRole: null,
    };
  }

  if (type === GET_ALL_AGENTS) {
    const { agents, iterator, currentPage, endingLink, totalPages } =
      action.payload;

    return {
      ...state,
      agents,
      isLoading: false,
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

  if (type === CHANGE_PAGE_TRANSFERT)
    return { ...state, currentPage: action.payload };
  if (type === CHANGE_PAGE_AGENT)
    return { ...state, currentAgentPage: action.payload };
  if (type === CHANGE_PAGE_MONEYTAKERS)
    return { ...state, currentMoneyTakerPage: action.payload };

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
  if (type === CANCEL_MODIFICATION_MONEYTAKER)
    return {
      ...state,
      isEditingMoneyTaker: false,
      moneyTakerAmount: '',
      moneyTakerPhoneNumber: '',
      moneyTakerName: '',
      moneyTakerOptionalInfo: '',
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

  if (type === GET_AGENTS_QUERY) {
    return { ...state, agents: action.payload };
  }

  if (type === GET_MONEY_TAKERS) {
    const { moneyTakers, iterator, currentPage, endingLink, totalPages } =
      action.payload;

    return {
      ...state,
      moneyTakers,
      isLoading: false,
      currentMoneyTakerPage: currentPage,
      totalPagesMoneyTaker: totalPages,
      endingLinkMoneyTaker: endingLink,
      iteratorMoneyTaker: iterator,
    };
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

export default reducer;
