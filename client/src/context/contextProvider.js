// @ts-nocheck
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  CHANGE_PAGE,
  CLEAN_ERROR,
  CREATE_TRANSFERT_BEGIN,
  CREATE_TRANSFERT_ERROR,
  CREATE_TRANSFERT_SUCCESS,
  DISPLAY_ERROR,
  GET_ALL_AGENTS,
  GET_ALL_TRANSFERTS_BEGIN,
  GET_ALL_TRANSFERTS_ERROR,
  GET_ALL_TRANSFERTS_SUCCESS,
  GET_WINDOW_WIDTH,
  HANDLE_CHANGE,
  LOGOUT_USER,
  RESET_FORM,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_QUERY_FORM,
  TOGGLE_SIDEBAR,
  GET_ALL_USERS,
  SET_EDIT_TRANSFERT,
} from './action';
import axios from 'axios';
import reducer from './reducer';

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    errorStatus: '',
    showSidebar: false,
    showQueryForm: false,
    isOnMobile: window.innerWidth < 1000 ? true : false,
    windowWidth: window.innerWidth,
    //TRANSFERT FROM VALUE
    amountOfMoneyInEuro: '',
    cityOptions: ['CONAKRY', 'KINDIA', 'BOKE', 'COLLAB'],
    moneyTypesOptions: ['LIQUIDE', 'ORANGE MONEY'],
    hasPaid: false,
    city: 'CONAKRY',
    moneyTypes: 'LIQUIDE',
    clientName: '',
    phoneNumber: '',
    senderName: '',
    hasTakeMoney: '',
    code: '',
    hasReceiveMoney: '',
    contactNumber: '',
    payoutDay: '',
    isEditing: false,
    editTransfertId: '',
    phoneNumberState: false,
    //USER

    //AUTH
    user: user ? JSON.parse(user) : null,
    token: token ? token : '',
    userRole: '',

    //AGENTS
    agents: [],
    currentAgentPage: 1,
    totalPagesAgent: '',
    endingLinkAgent: 0,
    iteratorAgent: 0,
    //TRANSFERTS FETCH
    transferts: [],
    currentPage: 1,
    totalPages: '',
    endingLink: 0,
    iterator: 0,
    //QUERY
    queryClientName: '',
    queryMoneyTypes: 'Tous',
    queryCity: 'Tous',
    querySenderName: 'Tous',
    queryHasTakeMoney: false,
    queryDateStart: '',
    queryDateEnd: '',
    //CREATE USER
    username: '',
    password: '',
    confirmPassword: '',
    senderNameUser: '',
    senderCode: '',
    roleOptions: ['highAdmin', 'admin', 'mediumAdmin', 'agent', 'moneyGiver'],
    role: 'agent',
    phoneNumberAgent: '',
    users: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
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
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const deleteUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  //HANDLE LOGIN
  const handleLogin = async ({ username, password }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post('http://localhost:1000/user/login', {
        username,
        password,
      });
      const { token, user, role } = data;
      dispatch({ type: SETUP_USER_SUCCESS, payload: { token, user, role } });
      addUserToLocalStorage({ token, user });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
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
    const { data } = await authFetch('/admin/agents');
    dispatch({ type: GET_ALL_AGENTS, payload: { ...data } });
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

    dispatch({ type: CREATE_TRANSFERT_BEGIN });
    try {
      const { data } = await authFetch.post('/shared/add-transfert', {
        senderName,
        amountOfMoneyInEuro,
        city,
        moneyTypes,
        clientName,
        phoneNumber,
        hasPaid,
      });
      dispatch({ type: CREATE_TRANSFERT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_TRANSFERT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const getAllTransferts = async () => {
    dispatch({ type: GET_ALL_TRANSFERTS_BEGIN });
    try {
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

      let url = `/admin/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&senderName=${querySenderName}&city=${queryCity}&moneyTypes=${queryMoneyTypes}`;
      if (queryClientName) {
        url = url + `&clientName=${queryClientName}`;
      }
      const { data } = await authFetch(url);

      dispatch({
        type: GET_ALL_TRANSFERTS_SUCCESS,
        payload: { ...data },
      });
    } catch (error) {
      dispatch({ type: GET_ALL_TRANSFERTS_ERROR });
    }
  };

  const toggleQueryForm = () => dispatch({ type: TOGGLE_QUERY_FORM });
  const resetQueryForm = () => {
    dispatch({ type: RESET_FORM });
    getAllTransferts();
  };

  const changePage = page => dispatch({ type: CHANGE_PAGE, payload: page });

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
    dispatch({ type: CREATE_TRANSFERT_BEGIN });
    try {
      const { data } = await authFetch.post('/admin/add-user', {
        ...userObj,
      });
      dispatch({ type: CREATE_TRANSFERT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_TRANSFERT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const createAgent = async () => {
    const { senderNameUser, phoneNumberAgent, senderCode } = state;

    dispatch({ type: CREATE_TRANSFERT_BEGIN });
    try {
      const { data } = await authFetch.post('/admin/add-agent', {
        senderName: senderNameUser,
        phoneNumber: phoneNumberAgent,
        senderCode,
      });
      dispatch({ type: CREATE_TRANSFERT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_TRANSFERT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const deleteTransfert = async id => {
    await authFetch.delete(`/shared/delete-transfert/${id}`);
    getAllTransferts();
  };

  const setEditForm = id => {
    dispatch({ type: SET_EDIT_TRANSFERT, payload: id });
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
      editTransfertId
    } = state;

    dispatch({ type: CREATE_TRANSFERT_BEGIN });
    try {
      const { data } = await authFetch.patch(`/shared/edit-transfert/${editTransfertId}`, {
        senderName,
        amountOfMoneyInEuro,
        city,
        moneyTypes,
        clientName,
        phoneNumber,
        hasPaid,
      });
      dispatch({ type: CREATE_TRANSFERT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_TRANSFERT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  return (
    <stateContext.Provider
      value={{
        ...state,
        toggleQueryForm,
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
        deleteTransfert,
        setEditForm,
        editTransfert,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(stateContext);
};
