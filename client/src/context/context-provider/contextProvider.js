// @ts-nocheck
import React, { createContext, useContext, useReducer, useEffect } from 'react';

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
  GET_ALL_TRANSFERTS_ERROR,
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

import axios from 'axios';
import reducer from '../reducer/qglobalReducer';
import {
  agentInitialState,
  authInitialState,
  moneyTakerInitialState,
  userInitialState,
} from '../initialStates';
import { userReducer, agentReducer, authReducer } from '../reducer/index';

export const stateContext = createContext();
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  errorStatus: '',
  showSidebar: false,
  isOnMobile: window.innerWidth < 1000 ? true : false,
  windowWidth: window.innerWidth,
  rate: '',
  amountEuro: '',
  amountGnf: '',
  fees: '',
  newPasswordAccount: '',
  confirmNewPasswordAccount: '',
  oldPasswordAccount: '',
  searchTransfertCode: '',
  ...authInitialState,
  ...agentInitialState,
  ...userInitialState,
  ...moneyTakerInitialState,
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [stateAgent, dispatchAgent] = useReducer(
    agentReducer,
    agentInitialState
  );

  const [stateUser, dispatchUser] = useReducer(userReducer, userInitialState);

  const [stateAuth, dispatchAuth] = useReducer(authReducer, authInitialState);

  const authFetch = axios.create({
    baseURL: 'http://localhost:1000',
  });

  authFetch.interceptors.request.use(
    config => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  console.log(state);
  const addUserToLocalStorage = ({ user, token, userRole }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
  };
  const deleteUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  };
  //HANDLE LOGIN
  const handleLogin = async ({ username, password }) => {
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await axios.post('http://localhost:1000/user/login', {
        username,
        password,
      });
      const { token, user, userRole } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, userRole },
      });
      addUserToLocalStorage({ token, user, userRole });
    } catch (error) {
      dispatch({
        type: SHOW_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    deleteUserFromLocalStorage();
  };

  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  const handleResize = () =>
    dispatch({ type: GET_WINDOW_WIDTH, payload: window.innerWidth });

  const useHandleResize = () => {
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  };

  const getAllAgents = async () => {
    const { userRole } = state;
    if (userRole === 'agent') return;

    dispatch({ type: SET_LOADING });
    try {
      const { currentAgentPage } = state;

      let url = `/admin/agents?page=${currentAgentPage}`;

      const { data } = await authFetch(url);
      dispatch({ type: GET_ALL_AGENTS, payload: { ...data } });
    } catch (error) {
      dispatch({ type: GET_ALL_TRANSFERTS_ERROR });
    }
  };

  //ONLY TO FETCH AGENTS IN QUERY FORM AND ADD FORM
  const getAgents = async () => {
    try {
      const { data } = await authFetch('/shared/agents');
      dispatch({ type: GET_AGENTS_QUERY, payload: data });
    } catch (error) {}
  };
  const getAllUsers = async () => {
    const { data } = await authFetch('/admin/users');
    const { users } = data;
    dispatch({ type: GET_ALL_USERS, payload: { users } });
  };
  const createTransfert = async () => {
    const {
      senderName,
      city,
      moneyTypes,
      clientName,
      phoneNumber,
      hasPaid,
      amountOfMoneyInEuro,
    } = state;
    dispatch({ type: SET_LOADING });
    try {
      console.log(state);

      const { data } = await authFetch.post('/shared/add-transfert', {
        senderName,
        amountOfMoneyInEuro,
        city,
        moneyTypes,
        clientName,
        phoneNumber,
        hasPaid,
      });
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const getAllTransferts = async () => {
    const {
      queryCity,
      queryClientName,
      queryDateEnd,
      queryDateStart,
      queryHasTakeMoney,
      queryMoneyTypes,
      querySenderName,
      currentPage,
    } = state;
    const { userRole } = state;
    let url = '';
    if (userRole === 'agent') {
      url = `/agent/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&city=${queryCity}&moneyTypes=${queryMoneyTypes}`;
    }
    if (userRole === 'mediumAdmin') {
      url = `/med-admin/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&senderName=${querySenderName}&city=${queryCity}&moneyTypes=${queryMoneyTypes}`;
      if (queryClientName) {
        url = url + `&clientName=${queryClientName}`;
      }
    }

    if (userRole === 'highAdmin') {
      url = `/admin/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&senderName=${querySenderName}&city=${queryCity}&moneyTypes=${queryMoneyTypes}`;
      if (queryClientName) {
        url = url + `&clientName=${queryClientName}`;
      }
    }

    if (userRole === 'moneyGiver') {
      url = `/moneygiver/all-transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&senderName=${querySenderName}&moneyTypes=${queryMoneyTypes}`;

      if (queryClientName) {
        url = url + `&clientName=${queryClientName}`;
      }
    }
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch(url);

      dispatch({
        type: GET_ALL_TRANSFERTS_SUCCESS,
        payload: { ...data },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const resetQueryForm = () => {
    dispatch({ type: RESET_FORM });
    getAllTransferts();
  };

  const changePage = (page, collection) => {
    if (collection === 'transfert')
      return dispatch({ type: CHANGE_PAGE_TRANSFERT, payload: page });

    if (collection === 'agent')
      return dispatch({ type: CHANGE_PAGE_AGENT, payload: page });

    if (collection === 'moneyTaker')
      return dispatch({ type: CHANGE_PAGE_MONEYTAKERS, payload: page });
  };

  const createUser = async () => {
    const {
      senderNameUser,
      senderCode,
      username,
      password,
      confirmPassword,
      phoneNumberAgent,
      role,
    } = state;
    let userObj = {};
    if (role !== 'agent') {
      userObj.username = username;
      userObj.password = password;
      userObj.confirmPassword = confirmPassword;
      userObj.role = role;
    } else {
      userObj.username = username;
      userObj.senderName = senderNameUser;
      userObj.password = password;
      userObj.confirmPassword = confirmPassword;
      userObj.role = role;
      userObj.senderCode = senderCode;
      userObj.phoneNumber = phoneNumberAgent;
    }
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.post('/admin/add-user', {
        ...userObj,
      });
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const createAgent = async () => {
    const { senderNameUser, phoneNumberAgent, senderCode } = state;

    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.post('/admin/add-agent', {
        senderName: senderNameUser,
        phoneNumber: phoneNumberAgent,
        senderCode,
      });
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const setEditForm = (field, id) => {
    if (field === 'transfert')
      return dispatch({ type: SET_EDIT_TRANSFERT, payload: id });

    if (field === 'agent')
      return dispatch({ type: SET_EDIT_AGENT, payload: id });
    if (field === 'user') return dispatch({ type: SET_EDIT_USER, payload: id });
    if (field === 'moneyTaker')
      return dispatch({ type: SET_EDIT_MONEYTAKER, payload: id });
  };

  const editTransfert = async () => {
    const {
      senderName,
      city,
      moneyTypes,
      clientName,
      phoneNumber,
      hasPaid,
      amountOfMoneyInEuro,
      editTransfertId,
    } = state;

    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.patch(
        `/shared/edit-transfert/${editTransfertId}`,
        {
          senderName,
          amountOfMoneyInEuro,
          city,
          moneyTypes,
          clientName,
          phoneNumber,
          hasPaid,
        }
      );
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const editAgent = async () => {
    const { senderNameUser, phoneNumberAgent, editAgentId, senderCode } = state;

    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.patch(
        `/admin/edit-agent/${editAgentId}`,
        {
          senderNameUser,
          phoneNumber: phoneNumberAgent,
          senderCode,
        }
      );
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const deleteFromDb = async (field, id) => {
    if (field === 'user') {
      await authFetch.delete(`/admin/delete-user/${id}`);
      return getAllUsers();
    }
    if (field === 'transfert') {
      await authFetch.delete(`/shared/delete-transfert/${id}`);
      return getAllTransferts();
    }
    if (field === 'agent') {
      await authFetch.delete(`/admin/delete-agent/${id}`);
      return getAllAgents();
    }

    if (field === 'moneyTaker') {
      await authFetch.delete(`/shared/delete-money-taker/${id}`);
      return getAllMoneyTakers();
    }
  };

  const cancelModification = field => {
    if (field === 'transfert')
      return dispatch({ type: CANCEL_MODIFICATION_TRANSFERT });
    if (field === 'agent') return dispatch({ type: CANCEL_MODIFICATION_AGENT });
    if (field === 'user') return dispatch({ type: CANCEL_MODIFICATION_USER });
    if (field === 'moneyTaker')
      return dispatch({ type: CANCEL_MODIFICATION_MONEYTAKER });
  };

  const getTransfertDetails = id => {
    dispatch({ type: GET_DETAILS_TRANSFERT, payload: id });
  };

  const convertMoney = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const { amountEuro, amountGnf } = state;
      const { data } = await authFetch.post('/shared/convertisseur', {
        euro: amountEuro.toString(),
        gnf: amountGnf.toString(),
      });
      const { euro, gnf, fee } = data;
      dispatch({ type: CONVERT_MONEY, payload: { euro, gnf, fee } });
    } catch (error) {
      dispatch({
        type: SHOW_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const getRate = async () => {
    const { data } = await authFetch.get('/shared/taux');
    const { rate } = data;
    dispatch({ type: GET_RATE, payload: rate });
  };

  const changePassword = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const {
        oldPasswordAccount,
        newPasswordAccount,
        confirmNewPasswordAccount,
      } = state;
      const { data } = await authFetch.patch('/shared/change-password', {
        actualPassword: oldPasswordAccount,
        newPassword: newPasswordAccount,
        confirmNewPassword: confirmNewPasswordAccount,
      });
      const { message } = data;
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const createMoneyTaker = async () => {
    const {
      moneyTakerAmount,
      moneyTakerName,
      moneyTakerPhoneNumber,
      moneyTakerOptionalInfo,
    } = state;

    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.post('/med-admin/add-money-taker', {
        name: moneyTakerName,
        phoneNumber: moneyTakerPhoneNumber,
        optionalInfo: moneyTakerOptionalInfo || null,
        amountMoney: moneyTakerAmount,
      });
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const editMoneyTaker = async () => {
    const {
      moneyTakerAmount,
      moneyTakerName,
      moneyTakerPhoneNumber,
      moneyTakerOptionalInfo,
      editMoneyTakerId,
    } = state;

    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.patch(
        `/shared/edit-money-taker/${editMoneyTakerId}`,
        {
          name: moneyTakerName,
          phoneNumber: moneyTakerPhoneNumber,
          optionalInfo: moneyTakerOptionalInfo || null,
          amountMoney: moneyTakerAmount,
        }
      );
      dispatch({ type: END_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };
  const getAllMoneyTakers = async () => {
    const { currentMoneyTakerPage } = state;
    let url = `/shared/list-money-takers?page=${currentMoneyTakerPage}`;

    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch(url);
      dispatch({
        type: GET_MONEY_TAKERS,
        payload: { ...data },
      });
    } catch (error) {
      dispatch({ SHOW_ERROR });
    }
  };

  const addNewRate = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await authFetch.post('/med-admin/new-rate', {
        rate: state.newRate,
      });
      const { newRate, message } = data;
      dispatch({ type: NEW_RATE_ADDED, payload: { ...newRate, message } });
    } catch (error) {
      dispatch({ type: SHOW_ERROR, payload: error.response.data.msg });
    }
  };

  const searchTransfert = async () => {
    try {
      dispatch({});
    } catch (error) {}
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        cancelModification,
        displayError,
        handleLogin,
        cleanError,
        handleChange,
        toggleSidebar,
        useHandleResize,
        logoutUser,
        getAllAgents,
        createTransfert,
        getAllTransferts,
        resetQueryForm,
        getAllUsers,
        changePage,
        createUser,
        createAgent,
        setEditForm,
        editTransfert,
        deleteFromDb,
        getTransfertDetails,
        editAgent,
        convertMoney,
        getRate,
        changePassword,
        getAgents,
        createMoneyTaker,
        editMoneyTaker,
        getAllMoneyTakers,
        addNewRate,
        searchTransfert,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(stateContext);
};

export { useGlobalContext, initialState };
