import React, { createContext, useContext, useReducer } from 'react';

import {
  GET_AGENTS_QUERY,
  CHANGE_PAGE_AGENT,
  SET_EDIT_AGENT,
  GET_ALL_AGENTS,
  CANCEL_MODIFICATION_AGENT,
  CLEAN_ERROR,
  DISPLAY_ERROR,
  HANDLE_CHANGE,
  SET_LOADING_SUCCESS,
  SET_LOADING_BEGIN,
  SET_LOADING_ERROR,
} from '../action/agentAction';

import axios from 'axios';
import { agentInitialState } from '../initialStates/agentInitialState';
import { agentReducer } from '../reducer/index';
import { useAuthContext } from './authContext';

const stateContext = createContext();

export const AgentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agentReducer, agentInitialState);

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

  const getAllAgents = async () => {
    const { userRole } = state;
    if (userRole === 'agent') return;

    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { currentAgentPage } = state;

      let url = `/admin/agents?page=${currentAgentPage}`;

      const { data } = await authFetch(url);
      dispatch({ type: GET_ALL_AGENTS, payload: { ...data } });
    } catch (error) {
      logoutUser();
    }
  };

  //ONLY TO FETCH AGENTS IN QUERY FORM AND ADD FORM
  const getAgents = async () => {
    try {
      const { data } = await authFetch('/shared/agents');
      dispatch({ type: GET_AGENTS_QUERY, payload: data });
    } catch (error) {}
  };

  const changePage = page => {
    dispatch({ type: CHANGE_PAGE_AGENT, payload: page });
  };

  const createAgent = async () => {
    const { senderNameUser, phoneNumberAgent, senderCode } = state;

    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { data } = await authFetch.post('/admin/add-agent', {
        senderName: senderNameUser,
        phoneNumber: phoneNumberAgent,
        senderCode,
      });
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };

  const setEditForm = id => {
    dispatch({ type: SET_EDIT_AGENT, payload: id });
  };

  const editAgent = async () => {
    const { senderNameUser, phoneNumberAgent, editAgentId, senderCode } = state;

    dispatch({ type: SET_LOADING_BEGIN });
    try {
      const { data } = await authFetch.patch(
        `/admin/edit-agent/${editAgentId}`,
        {
          senderName: senderNameUser,
          phoneNumber: phoneNumberAgent,
          senderCode,
        }
      );
      dispatch({ type: SET_LOADING_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error.response.data.msg });
    }
  };
  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

  const deleteFromDb = async id => {
    await authFetch.delete(`/admin/delete-agent/${id}`);
    return getAllAgents();
  };

  const cancelModification = () => {
    dispatch({ type: CANCEL_MODIFICATION_AGENT });
  };

  return (
    <stateContext.Provider
      value={{
        ...state,
        getAllAgents,
        changePage,
        createAgent,
        setEditForm,
        editAgent,
        getAgents,
        displayError,
        cleanError,
        handleChange,
        cancelModification,
        deleteFromDb,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useAgentContext = () => {
  return useContext(stateContext);
};
