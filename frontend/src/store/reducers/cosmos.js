import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
  Lip: [],
  User: [],
  token: null,
  error: null,
  loading: false,

};

const authStart = (state, action) => updateObject(state, {
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

const authLogout = (state, action) => updateObject(state, {
  token: null,
  error: null,
});

const reducer = (state = initialState, action) => {

  switch (action.type) {


    case actionTypes.GET_LIP: return { ...state, Lip: action.Lip };
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

    default:
      break;
  }
  return state;
};
export default reducer;