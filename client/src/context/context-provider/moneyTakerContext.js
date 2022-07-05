import {
  SET_EDIT_MONEYTAKER,
  CHANGE_PAGE_MONEYTAKERS,
  CANCEL_MODIFICATION_MONEYTAKER,
  GET_MONEY_TAKERS,
  RESET_FORM,
  HANDLE_CHANGE,
  CLEAN_ERROR,
  DISPLAY_ERROR,
  SET_LOADING_SUCCESS,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
} from '../action/moneyTakerAction';
import axios from 'axios';

import { useReducer, createContext, useContext } from 'react';
import { moneyTakerInitialState } from '../initialStates';
import moneyTakerReducer from '../reducer/moneyTakerReducer';
import { useAuthContext } from './authContext';

export const stateContext = createContext();

export const MoneyTakerProvider = ({ children }) => {
  const { token, logoutUser } = useAuthContext();

  const [state, dispatch] = useReducer(
    moneyTakerReducer,
    moneyTakerInitialState
  );

  const authFetch = axios.create({
    baseURL: 'https://diaks-reacst.herokuapp.com',
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

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  const resetQueryForm = () => {
    dispatch({ type: RESET_FORM });
    getAllMoneyTakers();
  };

  const changePage = page => {
    return dispatch({ type: CHANGE_PAGE_MONEYTAKERS, payload: page });
  };

  const setEditForm = id => {
    dispatch({ type: SET_EDIT_MONEYTAKER, payload: id });
  };

  const deleteFromDb = async id => {
    await authFetch.delete(`/shared/delete-money-taker/${id}`);
    return getAllMoneyTakers();
  };

  const cancelModification = () => {
    dispatch({ type: CANCEL_MODIFICATION_MONEYTAKER });
  };

  const createMoneyTaker = async () => {
    const {
      moneyTakerAmount,
      moneyTakerName,
      moneyTakerPhoneNumber,
      moneyTakerOptionalInfo,
    } = state;

    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { data } = await authFetch.post('/med-admin/add-money-taker', {
        name: moneyTakerName,
        phoneNumber: moneyTakerPhoneNumber,
        optionalInfo: moneyTakerOptionalInfo || null,
        amountMoney: moneyTakerAmount,
      });
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
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

    dispatch({ type: SET_LOADING_BEGIN });
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
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };
  const getAllMoneyTakers = async () => {
    const { currentMoneyTakerPage } = state;
    let url = `/shared/list-money-takers?page=${currentMoneyTakerPage}`;

    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { data } = await authFetch(url);
      dispatch({
        type: GET_MONEY_TAKERS,
        payload: { ...data },
      });
    } catch (error) {
      logoutUser();
    }
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        cancelModification,
        displayError,
        cleanError,
        handleChange,
        resetQueryForm,
        changePage,
        setEditForm,
        deleteFromDb,
        createMoneyTaker,
        editMoneyTaker,
        getAllMoneyTakers,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useMoneyTakerContext = () => {
  return useContext(stateContext);
};

export { useMoneyTakerContext };
