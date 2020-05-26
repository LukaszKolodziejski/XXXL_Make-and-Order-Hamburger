import * as actionTypes from "../actions/actionTypes";

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => ({
  ...state,
  loading: action,
  error: null,
});

const authSuccess = (state, action) => ({
  ...state,
  idToken: action.idToken,
  userId: action.userId,
  error: null,
  loading: false,
});
const authFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});
const authLogout = (state, action) => ({
  ...state,
  idToken: null,
  userId: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
