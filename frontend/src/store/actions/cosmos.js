import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const getUsers_ = (Users) => {
    return { 
        type : actionTypes.GET_USERS, 
        Users : Users,
    };
};

export const getUsers = () => {
    return dispatch => {
        return axios.get('/api/user')
                    .then(res => dispatch(getUsers_(res.data)));
    };
};

export const getUser_ = (User) => {
    return {
        type : actionTypes.GET_USER,
        target : User,
    };
};

export const getUser = () => {
    return (dispatch) => {
        return axios.get('/api/user/1')
                    .then(res => {
                        dispatch(getUser_(res.data));
                    })
    };
};

export const putUser_ = (user) => {
    return {
        type : actionTypes.PUT_USER,
        id : user.id,
        email : user.email,
        password : user.password,
        name : user.name,
        logged_in : user.logged_in,
        targetID : user.id
    };
};

export const putUser = (user) => {
    return (dispatch) => {
        return axios.patch(`/api/user/1`, {logged_in: user.logged_in})
                    .then(res => {
                        dispatch(putUser_(res.data));
                    })
    };
};