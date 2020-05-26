/* ***************************************************************************** */
/* ***************************************************************************** */
/* I don't remove comments, because I want compare (Redux-Thunk vs Redux-Saga)   */
/* This is only my project and this will be very helpful for me in the future :) */
/* ***************************************************************************** */
/* ***************************************************************************** */
import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import axios from "../../axios-orders";

/* Without Redux-Saga */
/* ****************** */
// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("expirationDate");
//   localStorage.removeItem("userId");
//   return { type: actionTypes.AUTH_LOGOUT };
// };

/* >>> Redux-Saga <<< */
export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucced = () => ({ type: actionTypes.AUTH_LOGOUT });

/* >>> Redux-Thunk <<< */
/* ******************* */
// export const checkAuthTimeout = (expirationTime) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(logout());
//   }, expirationTime * 1000);
// };

/* Redux-Saga */
export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime,
});

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });
export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

const API_KEY = "AIzaSyCAlwo1IL1iEcabwwr1qM0KdMTLjmGFpJc";
const REST_API = "https://identitytoolkit.googleapis.com/v1/accounts:";
const SIGN_UP = `${REST_API}signUp?key=${API_KEY}`;
const SIGN_IN = `${REST_API}signInWithPassword?key=${API_KEY}`;

/* Redux-Saga */
/* ********** */
// export const auth = (email, password, isSignup) => ({
//   type: actionTypes.AUTH_USER,
//   email,
//   password,
//   isSignup,
// });

/* >>> Redux-Thunk <<< */
export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let URL;
  isSignup ? (URL = SIGN_UP) : (URL = SIGN_IN);

  axios
    .post(URL, authData)
    .then((res) => {
      const { idToken, localId, expiresIn } = res.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem("token", idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", localId);
      dispatch(authSuccess(idToken, localId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((err) => dispatch(authFail(err.response.data.error)));
};

/* Redux-Saga */
/* ********** */
// export const authCheckState = () => ({
//   type: actionTypes.AUTH_USER_CHECK_STATE,
// });

/* >>> Redux-Thunk <<< */
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const expirationDateInMiliseconds =
    (expirationDate.getTime() - new Date().getTime()) / 1000;

  if (!token) {
    dispatch(logout());
  } else {
    if (expirationDate > new Date()) {
      dispatch(authStart());
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(expirationDateInMiliseconds));
      dispatch(actions.orders(token));
    } else {
      dispatch(logout());
    }
  }
};
