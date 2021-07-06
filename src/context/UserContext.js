import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import { mockUser } from "./mock";

import Cookies from 'js-cookie';

//config
import config from "../../src/config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload
      };
    case "REGISTER_REQUEST":
    case "RESET_REQUEST":
    case "PASSWORD_RESET_EMAIL_REQUEST":
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state };
    case "AUTH_INIT_ERROR":
      return Object.assign({}, state, {
          currentUser: null,
          loadingInit: false,
      });
    case "REGISTER_SUCCESS":
    case "RESET_SUCCESS":
    case "PASSWORD_RESET_EMAIL_SUCCESS":
      return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
      });
    case 'AUTH_FAILURE':
      return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.payload,
      });
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: () => {
      const token = localStorage.getItem("token")
      if (config.isBackend && token) {
        const date = new Date().getTime() / 1000;
        const data = jwt.decode(token);
        if (!data) return false;
        return date < data.exp;
      } else if (token) {
        return true
      }
      return false;
    },
    isFetching: false,
    errorMessage: '',
    currentUser: null,
    loadingInit: true,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, responseGoogle, loginAsDefaultUser, signOut };

// ###########################################################

function loginUser(
  dispatch,
  login,
  password,
  history,
  setIsLoading,
  setError,
  social = ""
) {
  setError(false);
  setIsLoading(true);
    if (login.length > 0 && password.length > 0) {
      axios
        .post("/token/", { "username": login, "password" : password })
        .then(res => {
          const token = res.data;
          setTimeout(() => {
            setError(null);
            setIsLoading(false);
            receiveToken(token, dispatch);
            doInit()(dispatch);
            //history.goBack();
          }, 2000);
        })
        .catch(() => {
          setError(true);
          setIsLoading(false);
        });
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
    }
}


function responseGoogle(
  response,
  dispatch,
  setIsLoading,
  setError
) {
  axios.post("/login/social/jwt-pair-user/", {
    "provider": "google-oauth2",
    "code": response.code,
    "redirect_uri": `${config.hostApi}${config.portApi ? `:${config.portApi}` : ``}`
  }).then(res => {
    console.log(res.data)
    const token = res.data;
    setTimeout(() => {
      setError(null);
      setIsLoading(false);
      receiveToken(token, dispatch, true);
      doInit()(dispatch);
    }, 2000);
  })
}


function loginAsDefaultUser(
    dispatch,
    history,
    setIsLoading,
    setError,
    social = ""
) {
    setError(false);
    setIsLoading(true);
    axios
        .post("/token/", { "username": "den", "password": "123" })
        .then(res => {
            const token = res.data;
            setTimeout(() => {
                setError(null);
                setIsLoading(false);
                receiveToken(token, dispatch);
                doInit()(dispatch);
            }, 2000);
        })
        .catch(() => {
            setError(true);
            setIsLoading(false);
        });
}

export function sendPasswordResetEmail(email) {
  return (dispatch) => {
    if (!config.isBackend) {
      return
    } else {
      dispatch({
        type: 'PASSWORD_RESET_EMAIL_REQUEST',
      });
      axios.post("/auth/send-password-reset-email", {email}).then(res => {
        dispatch({
          type: 'PASSWORD_RESET_EMAIL_SUCCESS',
        });
        toast.success("Email with resetting instructions has been sent");
      }).catch(err => {
        dispatch(authError(err.response.data));
      })
    }
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem('user_id');
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  axios.defaults.headers.common["Authorization"] = "";
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export function receiveToken(token, dispatch, social = false) {
  let user;
  // We check if app runs with backend mode
  //if (config.isBackend) {
  //  user = jwt.decode(token).user;
  //  delete user.id;
  //} else {
  //  user = {
  //    email: config.auth.email
  //  };
  //}

  if (social) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.token;
    localStorage.setItem("token", token.token);
  } else {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.access;
    localStorage.setItem("token", token.access);
  }

  axios.get("/profiles/my_profile").then(res => {
    localStorage.setItem("user", JSON.stringify(res.data.id));
    localStorage.setItem("nickname", res.data.nickname);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("phone", res.data.phone_num);
    console.log(res.data.email)
  }).catch(err => console.error(err));

  
  //console.log("ref ", token.refresh); 
  //console.log("acc ", token.access); 

  localStorage.setItem("token_ref", token.refresh);
  localStorage.setItem("user", JSON.stringify("Waiting"));
  localStorage.setItem("theme", "default");
  //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  dispatch({ type: "LOGIN_SUCCESS" });
}

async function findMe() {
  if (config.isBackend) {
    const response = await axios.get('/auth/me');
    return response.data;    
  } else {
    return mockUser;
  }
}

export function authError(payload) {
  return {
    type: 'AUTH_FAILURE',
    payload,
  };
}

export function doInit() {
  return async (dispatch) => {
    let currentUser = null;
    if (!config.isBackend) {
      currentUser = mockUser;
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          currentUser,
        },
      });
    } else {
      try {
        let token = localStorage.getItem('token');
        if (token) {
          currentUser = await findMe();
        }
        sessionStorage.setItem('user_id', currentUser.id);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            currentUser,
          },
        });
      } catch (error) {
        console.log(error);

        dispatch({
          type: 'AUTH_INIT_ERROR',
          payload: error,
        });
      }
    }
  }
}

export function registerUser(
  dispatch,
  email,
  password,
  history,
  setIsLoading,
  setError
) {
    return () => {
      dispatch({
        type: 'REGISTER_REQUEST',
      });
      if (email.length > 0) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        //localStorage.setItem("name", name);
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.post("/register/email/", { email: email }).then(res => {
          localStorage.setItem("verification_key", res.data.key);
          dispatch({
            type: 'REGISTER_SUCCESS'
          });
          history.push('/confirm');
        }).catch(err => {
          dispatch(authError(err.response.data));
        })
  
      } else {
        dispatch(authError('Something was wrong. Try again'));
      }
  };
}

export function confirmUser(
  dispatch,
  key,
  history,
  setIsLoading,
  setError,
  setHelperText,
  social = ""
) {
  return () => {
    var email = localStorage.getItem("email")
    var password = localStorage.getItem("password")
    //var name = localStorage.getItem("name")
    console.log("in func");
    if (email.length > 0 && password.length > 0 && key.length > 0) {
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.post("/register/", { username: email, email: email, password: password, hash: localStorage.getItem("verification_key"), key: key }).then(res => {
        dispatch({
          type: 'REGISTER_SUCCESS'
        });
        //          toast.success("You've been registered successfully. Please check your email for verification link");
        history.push('/login');
      }).catch(err => {
        if (err.response.status == 400) {
          setHelperText("Неверный ключ")
        }
        //dispatch(authError(err.response.data));
      })
    } else {
      dispatch(authError('Something was wrong. Try again'));
    }
  };
} 

export function verifyEmail(token, history) {
  return(dispatch) => {
    if (!config.isBackend) {
      history.push('/login');
    } else {
      axios.put("/auth/verify-email", {token}).then(verified => {
        if (verified) {
          toast.success("Your email was verified");
        }
      }).catch(err => {
        toast.error(err.response.data);
      }).finally(() => {
        history.push('/login');
      })
    }
  }
}

export function resetPassword(token, password, history) {
  return (dispatch) => {
    if (!config.isBackend) {
      history.push('/login');
    } else {
      dispatch({
        type: 'RESET_REQUEST',
      });
      axios.put("/auth/password-reset", {token, password}).then(res => {
          dispatch({
            type: 'RESET_SUCCESS',
          });
          toast.success("Password has been updated");
        history.push('/login');
      }).catch(err => {
        dispatch(authError(err.response.data));
      })
    }
  }
}
