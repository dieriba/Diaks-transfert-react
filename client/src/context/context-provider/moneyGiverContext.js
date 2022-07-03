import {
  DISPLAY_ERROR,
  CLEAN_ERROR,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
  SET_LOADING_SUCCESS,
  SEARCH_TRANSFERT_SUCCESS,
  HANDLE_CHANGE,
  RESET_PAGE,
} from '../action/moneyGiverAction';
import { useAuthContext } from './authContext';
import React, { createContext, useContext, useReducer } from 'react';
import moneyGiverInitialState from '../initialStates/moneyGiverInitialState';
import moneyGiverReducer from '../reducer/moneyGiverReducer';
import axios from 'axios';
export const stateContext = createContext();

export const MoneyGiverProvider = ({ children }) => {
  const { token, logoutUser } = useAuthContext();
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

  const [state, dispatch] = useReducer(
    moneyGiverReducer,
    moneyGiverInitialState
  );

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const searchTransfert = async () => {
    try {
      dispatch({ type: SET_LOADING_BEGIN });
      const { transfertCode } = state;
      const { data } = await authFetch.post('/moneygiver/search', {
        code: transfertCode.toUpperCase(),
      });
      dispatch({ type: SEARCH_TRANSFERT_SUCCESS, payload: { ...data } });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  const validateTransfert = async () => {
    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { transfertFoundId } = state;
      const { data } = await authFetch.patch(
        `/moneygiver/validate/${transfertFoundId}`
      );
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  const resetPage = () => {
    dispatch({ type: RESET_PAGE });
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        displayError,
        cleanError,
        searchTransfert,
        handleChange,
        validateTransfert,
        resetPage,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useMoneyGiverContext = () => {
  return useContext(stateContext);
};

export { useMoneyGiverContext };
