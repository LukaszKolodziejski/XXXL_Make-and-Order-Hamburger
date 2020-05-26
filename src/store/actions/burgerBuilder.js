import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredients = (ingredient) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient,
});

export const removeIngredients = (ingredient) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient,
});

export const fetchData = (res) => ({
  type: actionTypes.INIT_INGREDIENT,
  ingredients: res.data,
  totalPrice: 4,
});

export const failFetchData = (err) => ({
  type: actionTypes.INIT_INGREDIENT,
  error: true,
});

/* >>> Redux-Thunk <<< */
// export const initIngredients = () => (dispatch) => {
//   axios
//     .get("/ingredients.json")
//     .then((res) => dispatch(fetchData(res)))
//     .catch((err) => dispatch(failFetchData(err)));
// };

/* Redux-Saga */
export const initIngredients = () => ({
  type: actionTypes.FIRST_INIT_INGREDIENT,
});
