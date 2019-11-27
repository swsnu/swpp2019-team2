import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
  Lip: [],
  User: [],
  token: null,
  error: null,
  loading: false,
  ML_results: [],
  ML: null,
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

const saveML = (state, action) => updateObject(state, {
  ML: {
    id: action.id,
    user_id: action.user_id,
    result_r: action.r,
    result_g: action.g,
    result_b: action.b,
    base: action.base,
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIP: return { ...state, Lip: action.Lip };
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SEND_PICTURE: return { ...state };
    case actionTypes.GET_ANALYSIS_RESULT: return { ...state, ML_results: action.total_results };
    case actionTypes.RUN_ANALYSIS: return saveML(state, action);
    default:
      break;
  }
  return state;
};
export default reducer;
