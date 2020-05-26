import * as actionType from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: true,
};

const orders = (state, action) => ({
  ...state,
  orders: action.orders,
  loading: action.loading,
});

const reducer = (state = initialState, action) =>
  action.type === actionType.ORDERS ? orders(state, action) : state;

export default reducer;
