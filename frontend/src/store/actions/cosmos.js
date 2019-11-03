import * as actionTypes from './actionTypes'; 
import axios from 'axios';
import { push, replace } from 'connected-react-router';


export const getLips_ = (Lip) => 
{  return { type: actionTypes.GET_LIP, Lip: Lip 
            }; 
};
export const getLips = () => {

    return dispatch => {    
        return axios.get('/api/lip/')      
        .then(res => dispatch(getLips_(res.data)));
            
    }  
}




export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}


export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

/*export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000)
    }
}*/


export const authLogin = (username,password) => {
    return dispatch => {
    
        dispatch(authStart());
        axios.post('/api/signin/',{
            username : username,
            password : password,
        })
        .then(res => {
            const token = res;
            const expirationDate = new Date().getTime() + 3600 * 1000;
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(token));
        })
        .catch(err => {
            
            dispatch(authFail(err));
            
        })
    }
}


export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authSignup = (username, email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/api/signup/',{
            username : username,
            email : email,
            password : password,

        })
        .then(res => {
            
            const token = res;
            const expirationDate = new Date().getTime() + 3600 * 1000;
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(token));
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token == undefined) {
            
            dispatch(logout()); 
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                
            }
        }
    }
}


