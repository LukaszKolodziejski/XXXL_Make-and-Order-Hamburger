import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export const initIngredientsSaga = function* (action) {
  try {
    const res = yield axios.get("/ingredients.json");
    yield put(actions.fetchData(res));
  } catch (err) {
    yield put(actions.failFetchData(err));
  }
};
