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

export const putUser_ = (td) => {
    return {
        type : actionTypes.PUT_USER,
        id : td.id,
        email : td.email,
        password : td.password,
        name : td.name,
        logged_in : td.logged_in,
        targetID : td.id
    };
};

export const putUser = (td) => {
    return (dispatch) => {
        return axios.patch(`/api/user/1`, {logged_in: td.logged_in})
                    .then(res => {
                        dispatch(putUser_(res.data));
                    })
    };
};