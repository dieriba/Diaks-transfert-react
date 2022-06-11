// @ts-nocheck
import React, { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/reducer';

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const signUpForm = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '',
    condition: false,
    isErrors: {
      stateError : false,
      pseudo: false,
      password: false,
      confirmPassword: false,
      condition: false,
      email: false,
    },
  };

  const loginForm = {
    pseudo: '',
    password: '',
    isErrors: {
      isTrue: false,
      pseudo: false,
      password: false,
    },
  };

  const initialState = {
    signUpForm,
    loginForm,
    signIn: true,
    signUp: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //HANDLE LOGIN
  const handleLogin = e => dispatch({ type: 'LOGIN', e });
  const handleLoginForm = e => dispatch({ type: 'LOGIN_FORM_INPUT', e });

  //HANDLE SIGNUP
  const handleSignUp = e => dispatch({ type: 'SEND_SIGNUP_DATA', e });
  const handleSignUpForm = e => dispatch({ type: 'SIGNUP_FORM_INPUT', e });

  return (
    <stateContext.Provider
      value={{
        ...state,
        handleLogin,
        handleLoginForm,
        handleSignUp,
        handleSignUpForm,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(stateContext);
};
