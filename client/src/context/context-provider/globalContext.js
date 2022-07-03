import {
  GET_WINDOW_WIDTH,
  DISPLAY_ERROR,
  CLEAN_ERROR,
  TOGGLE_SIDEBAR,
} from '../action/globalAction';
import globalInitialState from '../initialStates/globalContext';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import globalReducer from '../reducer/globalReducer';
import { useAuthContext } from './authContext';

export const stateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);
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

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

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

  return (
    <stateContext.Provider
      value={{
        ...state,
        toggleSidebar,
        useHandleResize,
        displayError,
        cleanError,
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
