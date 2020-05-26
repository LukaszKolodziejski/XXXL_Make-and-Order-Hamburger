import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { ordersSaga } from "./order";

export const watchAuth = function* () {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.AUTH_USER_CHECK_STATE, authCheckStateSaga);
};
export const watchBurger = function* () {
  yield takeEvery(actionTypes.FIRST_INIT_INGREDIENT, initIngredientsSaga);
};
export const watchOrder = function* () {
  yield takeEvery(actionTypes.INIT_ORDERS, ordersSaga);
};
