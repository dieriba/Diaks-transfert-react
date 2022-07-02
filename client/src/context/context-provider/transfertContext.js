import React, { createContext, useContext, useReducer } from 'react';
import { transfertInitialState } from '../initialStates';
import transfertReducer from '../reducer/transfertReducer';
import {
  GET_ALL_TRANSFERTS_SUCCESS,
  CHANGE_PAGE_TRANSFERT,
  CANCEL_MODIFICATION_TRANSFERT,
  GET_DETAILS_TRANSFERT,
  SET_EDIT_TRANSFERT,
  SET_LOADING_SUCCESS,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
  RESET_FORM,
  HANDLE_CHANGE,
  CLEAN_ERROR,
  RESET_TRANSFERT_FORM,
  DISPLAY_ERROR,
} from '../action/transfertAction';
import axios from 'axios';
import { useAuthContext } from './authContext';

export const stateContext = createContext();

export const TransfertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transfertReducer, transfertInitialState);

  const { token, logoutUser, userRole } = useAuthContext();
  const authFetch = axios.create({
    baseURL: 'http://localhost:1000',
  });

  authFetch.interceptors.request.use(
    config => {
      config.headers.common['Authorization'] = `Bearer ${token}`;
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

  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

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
    dispatch({ type: SET_LOADING_BEGIN });
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
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
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

    let url = '';
    if (userRole === 'agent') {
      url = `/agent/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&city=${queryCity}&moneyTypes=${queryMoneyTypes}&hasTakeMoney=${queryHasTakeMoney}`;
    }
    if (userRole === 'mediumAdmin') {
      url = `/med-admin/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&senderName=${querySenderName}&city=${queryCity}&moneyTypes=${queryMoneyTypes}&hasTakeMoney=${queryHasTakeMoney}`;
      if (queryClientName) {
        url = url + `&clientName=${queryClientName}`;
      }
    }

    if (userRole === 'highAdmin') {
      url = `/admin/transferts?page=${currentPage}&start=${queryDateStart}&end=${queryDateEnd}&senderName=${querySenderName}&city=${queryCity}&moneyTypes=${queryMoneyTypes}&hasTakeMoney=${queryHasTakeMoney}`;
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
    dispatch({ type: SET_LOADING_BEGIN });
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

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const resetQueryForm = () => {
    dispatch({ type: RESET_FORM });
  };
  const resetTransfertForm = () => {
    dispatch({ type: RESET_TRANSFERT_FORM });
  };

  const changePage = page => {
    dispatch({ type: CHANGE_PAGE_TRANSFERT, payload: page });
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
      editTransfertId,
    } = state;

    dispatch({ type: SET_LOADING_BEGIN });
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
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  const deleteFromDb = async id => {
    await authFetch.delete(`/shared/delete-transfert/${id}`);
    return getAllTransferts();
  };

  const cancelModification = () => {
    dispatch({ type: CANCEL_MODIFICATION_TRANSFERT });
  };

  const getTransfertDetails = id => {
    dispatch({ type: GET_DETAILS_TRANSFERT, payload: id });
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        getTransfertDetails,
        deleteFromDb,
        cancelModification,
        editTransfert,
        setEditForm,
        changePage,
        resetQueryForm,
        getAllTransferts,
        createTransfert,
        handleChange,
        cleanError,
        resetTransfertForm,
        displayError,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useTransfertContext = () => {
  return useContext(stateContext);
};

export default useTransfertContext;
