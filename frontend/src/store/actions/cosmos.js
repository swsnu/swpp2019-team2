import axios from 'axios';
import * as actionTypes from './actionTypes';


export const getProducts_ = (result) => ({ type: actionTypes.GET_PRODUCT, result });
export const getProducts = (searchQuery) => (dispatch) => axios.get(`/api/${searchQuery}`)
  .then((res) => dispatch(getProducts_(res.data)));

export const getUser_ = (User) => ({ type: actionTypes.GET_USER, User });
export const getUser = () => (dispatch) => axios.get('/api/signup/')
  .then((res) => dispatch(getUser_(res.data)));


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

export const authSignup = (username, email, password) => (dispatch) => {
  dispatch(authStart());
  axios.post('/api/signup/', {
    username,
    email,
    password,

  })
    .then((res) => {
      const token = res;
      const expirationDate = new Date().getTime() + 3600 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(token));
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
