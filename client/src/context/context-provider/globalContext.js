import {
  GET_WINDOW_WIDTH,
  GET_RATE,
  NEW_RATE_ADDED,
  CONVERT_MONEY,
  TOGGLE_SIDEBAR,
} from '../action/globalAction';
import globalInitialState from '../initialStates/globalContext';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import globalReducer from '../reducer/globalReducer';
import { useAuthContext } from './authContext';
import { SET_LOADING_BEGIN, SET_LOADING_ERROR, SET_LOADING_SUCCESS } from '../action/agentAction';

export const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);
  const { token , logoutUser} = useAuthContext();
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

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

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

  const convertMoney = async () => {
    dispatch({ type: SET_LOADING_BEGIN });
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
        type: SET_LOADING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const getRate = async () => {
    const { data } = await authFetch.get('/shared/taux');
    const { rate } = data;
    dispatch({ type: GET_RATE, payload: rate });
  };

  const addNewRate = async () => {
    dispatch({ type: SET_LOADING_SUCCESS });
    try {
      const { data } = await authFetch.post('/med-admin/new-rate', {
        rate: state.newRate,
      });
      const { newRate, message } = data;
      dispatch({ type: NEW_RATE_ADDED, payload: { ...newRate, message } });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        toggleSidebar,
        useHandleResize,
        convertMoney,
        getRate,
        addNewRate,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(stateContext);
};

export { useGlobalContext };
