import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export const logoutSaga = function* (action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucced());
};

export const checkAuthTimeoutSaga = function* (action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
};

const API_KEY = "AIzaSyCAlwo1IL1iEcabwwr1qM0KdMTLjmGFpJc";
const REST_API = "https://identitytoolkit.googleapis.com/v1/accounts:";
const SIGN_UP = `${REST_API}signUp?key=${API_KEY}`;
const SIGN_IN = `${REST_API}signInWithPassword?key=${API_KEY}`;

export const authSaga = function* (action) {
  yield put(actions.authStart());
  const { email, password, isSignup } = action;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let URL;
  isSignup ? (URL = SIGN_UP) : (URL = SIGN_IN);
  try {
    const res = yield axios.post(URL, authData);
    const { idToken, localId, expiresIn } = yield res.data;
    const expirationDate = yield new Date(
      new Date().getTime() + expiresIn * 1000
    );
    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", localId);
    yield put(actions.authSuccess(idToken, localId));
    yield put(actions.checkAuthTimeout(expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
};

export const authCheckStateSaga = function* (action) {
  const token = yield localStorage.getItem("token");
  const userId = yield localStorage.getItem("userId");
  const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
  const expirationDateInMiliseconds =
    (expirationDate.getTime() - new Date().getTime()) / 1000;

  if (!token) {
    yield put(actions.logout());
  } else {
    if (expirationDate > new Date()) {
      yield put(actions.authStart());
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(expirationDateInMiliseconds));
      yield put(actions.orders(token));
    } else {
      yield put(actions.logout());
    }
  }
};
