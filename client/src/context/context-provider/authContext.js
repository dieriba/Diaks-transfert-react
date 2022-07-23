import axios from 'axios';
import { authInitialState } from '../initialStates';
import { createContext, useContext, useReducer } from 'react';
import {
  SETUP_USER_SUCCESS,
  DISPLAY_ERROR,
  SET_LOADING_BEGIN,
  SET_LOADING_SUCCESS,
  SET_LOADING_ERROR,
  HANDLE_CHANGE,
  CLEAN_ERROR,
  LOGOUT_USER,
} from '../action/authAction';
import authReducer from '../reducer/authReducer';

export const stateContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const { token } = state;
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

  //HANDLE LOGIN
  const handleLogin = async ({ username, password }) => {
    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { data } = await axios.post(
        'https://diaks-app.herokuapp.com/user/login',
        {
          username,
          password,
        }
      );
      const { token, user, userRole } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, userRole },
      });
      addUserToLocalStorage({ token, user, userRole });
    } catch (error) {
      dispatch({
        type: SET_LOADING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const getToken = async () => {
    try {
      const { data } = await authFetch('/shared/token');
      const { token, user, userRole } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, userRole },
      });
    } catch (error) {}
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    deleteUserFromLocalStorage();
  };

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

  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  const changePassword = async () => {
    dispatch({ type: SET_LOADING_BEGIN });
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
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        displayError,
        handleLogin,
        cleanError,
        handleChange,
        changePassword,
        logoutUser,
        getToken,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(stateContext);
};

export { useAuthContext };
