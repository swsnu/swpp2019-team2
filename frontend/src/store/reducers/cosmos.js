import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
  result: [],
  User: [],
  token: null,
  error: null,
  loading: false,
};

const authStart = (state) => updateObject(state, {
  error: null,
  loading: true,
});

const authSuccess = (state, action) => updateObject(state, {
  token: action.token,
  error: null,
  loading: false,
});

const authFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const authLogout = (state) => updateObject(state, {
  token: null,
  error: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT: return { ...state, result: action.result };
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.GET_USER: return { ...state, User: action.User };

    default:
      break;
  }
  return state;
};
export default reducer;
