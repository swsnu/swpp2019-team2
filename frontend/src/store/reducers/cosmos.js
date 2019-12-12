import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
  result: [],
  User: [],
  User2: [],
  token: null,
  error: null,
  loading: false,
  ML: null,
  budgetResult: [[], [], [], [], []],
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
    product: action.product,
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT: return { ...state, result: action.result };
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.SEND_PICTURE: return { ...state };
    case actionTypes.GET_ANALYSIS_RESULT: return { ...state };
    case actionTypes.RUN_ANALYSIS: return saveML(state, action);
    case actionTypes.GET_USER: return { ...state, User: action.User };
    case actionTypes.GET_LOGIN: return { ...state, User: action.User };
    case actionTypes.GET_USER2: return { ...state, User2: action.User2 };
    case actionTypes.GETMANYPRODUCTS: return { ...state, budgetResult: action.result };
    default:
      break;
  }
  return state;
};
export default reducer;
