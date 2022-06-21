// @ts-nocheck
import React, { createContext, useContext, useReducer } from 'react';
import {
  CLEAN_ERROR,
  DISPLAY_ERROR,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
} from './action';
import reducer from './reducer';

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    //TRANSFERT FROM VALUE
    amountOfMoneyInEuro: '',
    cityOptions: ['Conakry', 'Kindia', 'Boke', 'Collab'],
    moneyTypesOptions: ['Liquide', 'Orange Money'],
    hasPaid: false,
    city: '',
    moneyTypes: 'Liquide',
    clientName: '',
    phoneNumber: '',
    senderName: '',
    hasTakeMoney: '',
    date: '',
    updatedDate: '',
    fees: '',
    hasBeenModified: '',
    code: '',
    hasReceiveMoney: '',
    contactNumber: '',
    payoutDay: '',
    isEditing: false,
    phoneNumberState: false,
    //USER
    username: '',
    password: '',
    admin: '',
    isHighAdmin: '',
    isMediumAdmin: '',
    isAgent: '',
    isMoneyGiver: '',
    senderNameUser: '',
    transfertCounts: '',
    senderCode: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  //HANDLE LOGIN
  const handleLogin = async () => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      dispatch({ type: SETUP_USER_SUCCESS });
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR });
    }
  };

  const displayError = alertText =>
    dispatch({ type: DISPLAY_ERROR, payload: { alertText } });

  const cleanError = () => dispatch({ type: CLEAN_ERROR });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });
  return (
    <stateContext.Provider
      value={{
        ...state,
        displayError,
        handleLogin,
        cleanError,
        handleChange,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(stateContext);
};
