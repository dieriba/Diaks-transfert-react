import axios from 'axios';

const reducer = (state, action) => {
  const { type } = action;

  if (type === 'LOGIN') {
    action.e.preventDefault();
    const { loginForm } = state;
    const { pseudo, password } = loginForm;
    let pseudoError;
    let passwordError;
    let stateError;

    if (!pseudo) {
      pseudoError = true;
    } else {
      pseudoError = false;
    }

    if (!password) {
      passwordError = true;
    } else {
      passwordError = false;
    }

    if (!password || !pseudo) {
      stateError = true;
    } else {
      stateError = false;
    }

    return {
      ...state,
      loginForm: {
        ...loginForm,
        isErrors: {
          isTrue: stateError,
          pseudo: pseudoError,
          password: passwordError,
        },
      },
    };
  }

  if (type === 'LOGIN_FORM_INPUT') {
    const e = action.e;
    const { loginForm } = state;

    const newObject = {
      ...loginForm,
      [e.target.name]: e.target.value,
    };

    return {
      ...state,
      loginForm: { ...newObject },
    };
  }

  if (type === 'SEND_SIGNUP_DATA') {
    const e = action.e;
    e.preventDefault();
    const { signUpForm } = state;
    const { pseudo, password, confirmPassword, email, condition } = signUpForm;
    let pseudoError;
    let passwordError;
    let confirmPasswordError;
    let emailError;
    let conditionError;
    let stateError;

   const createUser =  async () => {
      try {
       const response = await  axios({
          method: 'post',
          url: 'http://localhost:4000/api/register',
          data: {
            pseudo,
            password,
            email,
            condition,
            confirmPassword
          },
        });
    console.log(response);

      } catch (error) {
        console.error(error);
      }
    };
    createUser();
    !pseudo ? (pseudoError = true) : (pseudoError = false);
    !password ? (passwordError = true) : (passwordError = false);
    !confirmPassword
      ? (confirmPasswordError = true)
      : (confirmPasswordError = false);
    !email ? (emailError = true) : (emailError = false);
    !condition ? (conditionError = true) : (conditionError = false);

    if (!password || !pseudo || !confirmPassword || !email || !condition) {
      stateError = true;
    } else {
      stateError = false;
    }

    return {
      ...state,
      signUpForm: {
        ...signUpForm,
        isErrors: {
          stateError,
          pseudo: pseudoError,
          password: passwordError,
          confirmPasswordError,
          email: emailError,
          condition: conditionError,
        },
      },
    };
  }

  if (type === 'SIGNUP_FORM_INPUT') {
    const e = action.e;
    const { signUpForm } = state;

    const newObject = {
      ...signUpForm,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    return {
      ...state,
      signUpForm: { ...newObject },
    };
  }
};

export default reducer;
