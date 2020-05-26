import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export const ordersSaga = function* (action) {
  try {
    const res = yield axios.get(`/orders.json?auth=${action.token}`);
    yield put(actions.fetchDataOrder(res));
  } catch (err) {
    yield put(actions.fetchDataOrder(err));
  }
};
