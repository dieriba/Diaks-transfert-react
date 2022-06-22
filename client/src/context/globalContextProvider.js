// @ts-nocheck
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { RiSpectrumLine } from 'react-icons/ri';
import {
  CLEAN_ERROR,
  DISPLAY_ERROR,
  GET_WINDOW_WIDTH,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  IS_ON_MOBILE,
} from './action';
import reducer from './reducer';

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    showSidebar: false,
    isOnMobile: window.innerWidth < 1000 ? true : false,
    windowWidth: window.innerWidth,
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
    editJobId : '',   
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

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

  const handleChange = ({ name, value, type, checked }) =>
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, type, checked } });

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
        displayError,
        handleLogin,
        cleanError,
        handleChange,
        toggleSidebar,
        useHandleResize,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(stateContext);
};