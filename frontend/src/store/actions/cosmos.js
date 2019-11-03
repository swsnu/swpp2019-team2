import axios from 'axios';

import * as actionTypes from './actionTypes';

export const getUsers_ = (Users) => ({
  type: actionTypes.GET_USERS,
  Users,
});

export const getUsers = () => (dispatch) => axios.get('/api/user')
  .then((res) => dispatch(getUsers_(res.data)));

export const getUser_ = (User) => ({
  type: actionTypes.GET_USER,
  target: User,
});

export const getUser = () => (dispatch) => axios.get('/api/user/1')
  .then((res) => {
    dispatch(getUser_(res.data));
  });

export const putUser_ = (user) => ({
  type: actionTypes.PUT_USER,
  id: user.id,
  email: user.email,
  password: user.password,
  name: user.name,
  logged_in: user.logged_in,
  targetID: user.id,
});

export const putUser = (user) => (dispatch) => axios.patch('/api/user/1', { logged_in: user.logged_in })
  .then((res) => {
    dispatch(putUser_(res.data));
  });
