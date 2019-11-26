import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';


export const getLips_ = (Lip) => ({ type: actionTypes.GET_LIP, Lip });
export const getLips = (searchResult) => (dispatch) => axios.get(`/api/lip/${searchResult}`)
  .then((res) => dispatch(getLips_(res.data)));


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

export const runAnalysis_ = (data) => ({
  type: actionTypes.RUN_ANALYSIS,
  user_id: data.user_id,
  result: data.result,
  id: data.id,
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
