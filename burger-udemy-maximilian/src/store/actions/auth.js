import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
})

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error,
})

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
} 

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    }
}
    
export const auth = (email, password, isSignUp) => 
    dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9IK3V1QCIC24gRsUhAzZDBqBuSMgnLCE";
        if(!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9IK3V1QCIC24gRsUhAzZDBqBuSMgnLCE";
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.idToken);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            }).catch(error => {
                //console.log(JSON.stringify(error));
                console.log(error.response);
                dispatch(authFail(error.response.data.error))
            })
    }

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
})

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}