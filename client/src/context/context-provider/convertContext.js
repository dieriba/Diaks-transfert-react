import {
  CONVERT_MONEY,
  NEW_RATE_ADDED,
  GET_RATE,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
  HANDLE_CHANGE,
  DISPLAY_ERROR,
  CLEAN_ERROR,
} from '../action/convertAction';
import axios from '../../apiCall/axios';
import { useAuthContext } from './authContext';
import { createContext, useContext, useReducer } from 'react';
import convertInitialState from '../initialStates/convertInitialState';
import convertReducer from '../reducer/convertReducer';
export const stateContext = createContext();

export const ConvertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(convertReducer, convertInitialState);
  const { token, logoutUser } = useAuthContext();
  const authFetch = axios.create({
    baseURL: 'https://diaks-app.herokuapp.com/',
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

  const convertMoney = async () => {
    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { amountEuro, amountGnf } = state;
      const { data } = await authFetch.post('/shared/convertisseur', {
        euro: amountEuro.toString(),
        gnf: amountGnf.toString(),
      });
      const { euro, gnf, fee , rate} = data;
      dispatch({ type: CONVERT_MONEY, payload: { euro, gnf, fee , rate} });
    } catch (error) {
      dispatch({
        type: SET_LOADING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

  const getRate = async () => {
    const { data } = await authFetch.get('/shared/taux');
    const { rate } = data;
    dispatch({ type: GET_RATE, payload: rate });
  };
  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const addNewRate = async () => {
    dispatch({ type: SET_LOADING_BEGIN });
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
  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  return (
    <stateContext.Provider
      value={{
        ...state,
        convertMoney,
        getRate,
        addNewRate,
        handleChange,
        displayError,
        cleanError,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
const useConvertContext = () => {
  return useContext(stateContext);
};

export { useConvertContext };
