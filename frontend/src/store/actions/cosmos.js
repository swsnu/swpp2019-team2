import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';


export const getProducts_ = (result) => ({ type: actionTypes.GET_PRODUCT, result });
export const getProducts = (searchQuery) => (dispatch) => axios.get(`/api/${searchQuery}`)
  .then((res) => dispatch(getProducts_(res.data)));

export const getUser_ = (User) => ({ type: actionTypes.GET_USER, User });
export const getUser = () => (dispatch) => axios.get('/api/signup/')
  .then((res) => dispatch(getUser_(res.data)));

export const getUser2_ = (User2) => ({ type: actionTypes.GET_USER2, User2 });
export const getUser2 = () => (dispatch) => axios.get('/api/signin/')
  .then((res) => dispatch(getUser2_(res.data)));

export const putUser2_ = (User) => ({ type: actionTypes.PUT_USER2, User });
export const putUser2 = (nickName, preferColor, preferBase, preferBrand) => (dispatch) => {
  axios.put('/api/signin/', {
    nickName,
    preferColor,
    preferBase,
    preferBrand,
  })
    .then((res) => {
      dispatch(putUser2_(res.data));
      dispatch(push('../login/loading'));
    });
};

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
});


export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});


export const authLogin = (username, password) => (dispatch) => {
  dispatch(authStart());
  axios.post('/api/signin/', {
    username,
    password,
  })
    .then((res) => {
      const token = res;
      const expirationDate = new Date().getTime() + 3600 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      dispatch(authSuccess(token));
      dispatch(push('../login/loading'));
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};


export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authSignup = (username, email, nickname, password) => (dispatch) => {
  dispatch(authStart());
  axios.post('/api/signup/', {
    username,
    email,
    nickname,
    password,

  })
    .then((res) => {
      const token = res;
      const expirationDate = new Date().getTime() + 3600 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(token));
      dispatch(push('../login/loading'));
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token === undefined) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  }
};

export const runAnalysis_ = (data) => ({
  type: actionTypes.RUN_ANALYSIS,
  user_id: data.user_id,
  r: data.r,
  g: data.g,
  b: data.b,
  id: data.id,
  base: data.base,
  product: data.product,
});

export const runAnalysis = (userID) => (dispatch) => {
  axios.put('/api/ml/', userID)
    .then((res) => {
      dispatch(runAnalysis_(res.data));
      dispatch(push('../skintone/result'));
    });
};

export const sendImage_ = (image) => ({
  type: actionTypes.SEND_PICTURE,
  target: image,
});

export const sendImage = (image) => (dispatch) => {
  axios.post('/api/ml/', image, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
    .then((res) => {
      dispatch(sendImage_(res.data));
      dispatch(push('../skintone/loading'));
    });
};

export const getAnalysisResult_ = (results) => ({
  type: actionTypes.GET_ANALYSIS_RESULT,
  total_results: results,
});

export const getAnalysisResult = () => (dispatch) => {
  axios.get('/api/ml/')
    .then((res) => {
      dispatch(getAnalysisResult_(res.data));
    });
};

export const getLogin_ = (User) => ({ type: actionTypes.GET_LOGIN, User });
export const getLogin = () => (dispatch) => axios.get('/api/signup/')
  .then((res) => {
    dispatch(getLogin_(res.data));
    dispatch(push('../search'));
  });
