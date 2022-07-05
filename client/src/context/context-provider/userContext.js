// @ts-nocheck
import React, { createContext, useContext, useReducer } from 'react';

import {
  SET_EDIT_USER,
  GET_ALL_USERS,
  CANCEL_MODIFICATION_USER,
  CLEAN_ERROR,
  DISPLAY_ERROR,
  HANDLE_CHANGE,
  SET_LOADING_SUCCESS,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
} from '../action/userAction';

import axios from 'axios';
import { userInitialState } from '../initialStates/userInitialState';
import { userReducer } from '../reducer/index';
import { useAuthContext } from './authContext';

export const stateContext = createContext();

export const UserProvider = ({ children }) => {
  const { token, logoutUser } = useAuthContext();
  const [state, dispatch] = useReducer(userReducer, userInitialState);

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

  const getAllUsers = async () => {
    try {
      dispatch({ type: SET_LOADING_BEGIN });
      const { data } = await authFetch('/admin/users');

      const { users } = data;
      dispatch({ type: GET_ALL_USERS, payload: { users } });
    } catch (error) {
      logoutUser();
    }
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
    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { data } = await authFetch.post('/admin/add-user', {
        ...userObj,
      });
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  const setEditForm = id => {
    dispatch({ type: SET_EDIT_USER, payload: id });
  };

  const deleteFromDb = async id => {
    await authFetch.delete(`/admin/delete-user/${id}`);
    return getAllUsers();
  };

  const cancelModification = () => {
    return dispatch({ type: CANCEL_MODIFICATION_USER });
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        cancelModification,
        displayError,
        cleanError,
        handleChange,
        getAllUsers,
        createUser,
        setEditForm,
        deleteFromDb,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(stateContext);
};

export default useUserContext;
