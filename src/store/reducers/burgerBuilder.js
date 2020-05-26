import * as actionType from "../actions/actionTypes";

const initialState = {
  ingredients: false,
  totalPrice: 4,
  error: false,
};

const INGREDIENTS_PRICES = {
  Meat: 1.3,
  Cheese: 0.4,
  Salad: 0.5,
  Bacon: 0.7,
};

const changeIngredient = (state, action, value) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [action.ingredient]: state.ingredients[action.ingredient] + value,
  },
  totalPrice: state.totalPrice + value * INGREDIENTS_PRICES[action.ingredient],
});

const initIngredients = (state, action) => ({
  ...state,
  ingredients: action.ingredients,
  totalPrice: action.totalPrice,
  error: action.error,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INIT_INGREDIENT:
      return initIngredients(state, action);
    case actionType.ADD_INGREDIENT:
      return changeIngredient(state, action, 1);
    case actionType.REMOVE_INGREDIENT:
      return changeIngredient(state, action, -1);
    default:
      return state;
  }
};

export default reducer;
