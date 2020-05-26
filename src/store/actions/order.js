import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const fetchDataOrder = (res) => {
  const orders = [];
  for (let key in res.data) {
    orders.push({ ...res.data[key], id: key });
  }
  return {
    type: actionTypes.ORDERS,
    orders,
    loading: false,
  };
};

/* Redux-Saga */
export const orders = (token) => ({ type: actionTypes.INIT_ORDERS, token });

/* Redux-Thunk */
export const purchaseBurger = (orderData, token) => (dispatch) => {
  axios
    .post(`/orders.json`, orderData)
    .then((res) => dispatch(fetchDataOrder(res)))
    .catch((err) => dispatch(fetchDataOrder(err)));
};
