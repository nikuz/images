// @flow

import type { DispatchAPI } from 'redux';
import {
    commonUtils,
    actionCreator,
    request,
} from '../utils';
import { profileConstants } from '../constants';

const {
    PROFILE_LOGIN_REQUEST,
    PROFILE_LOGIN_SUCCESS,
    PROFILE_LOGIN_FAILURE,
    PROFILE_REGISTRATION_REQUEST,
    PROFILE_REGISTRATION_SUCCESS,
    PROFILE_REGISTRATION_FAILURE,
    PROFILE_SET_TOKEN,
    PROFILE_CLEAR_TOKEN,
    PROFILE_GET_USER_REQUEST,
    PROFILE_GET_USER_SUCCESS,
    PROFILE_GET_USER_FAILURE,
} = profileConstants;

export function login(identifier: string, password: string) {
    const apiUrl = commonUtils.getApiUrl();
    return (dispatch: DispatchAPI<*>) => actionCreator({
        dispatch,
        requestAction: PROFILE_LOGIN_REQUEST,
        successAction: PROFILE_LOGIN_SUCCESS,
        failureAction: PROFILE_LOGIN_FAILURE,
        action: () => request.post({
            url: `${apiUrl}/auth/local`,
            args: {
                identifier,
                password,
            },
            contentType: 'json',
        }),
    });
}

export function registration(username: string, email: string, password: string) {
    const apiUrl = commonUtils.getApiUrl();
    return (dispatch: DispatchAPI<*>) => actionCreator({
        dispatch,
        requestAction: PROFILE_REGISTRATION_REQUEST,
        successAction: PROFILE_REGISTRATION_SUCCESS,
        failureAction: PROFILE_REGISTRATION_FAILURE,
        action: () => request.post({
            url: `${apiUrl}/auth/local/register`,
            args: {
                username,
                email,
                password,
            },
            contentType: 'json',
        }),
    });
}

export function getUser(token: string) {
    const apiUrl = commonUtils.getApiUrl();
    return (dispatch: DispatchAPI<*>) => actionCreator({
        dispatch,
        requestAction: PROFILE_GET_USER_REQUEST,
        successAction: PROFILE_GET_USER_SUCCESS,
        failureAction: PROFILE_GET_USER_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/users/me`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    });
}

export const setToken = (token: string) => (dispatch: DispatchAPI<*>) => {
    dispatch({
        type: PROFILE_SET_TOKEN,
        payload: token,
    });
    window.localStorage.setItem('token', token);
};

export const getToken = () => (dispatch: DispatchAPI<*>) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        dispatch(setToken(token));
    }
};

export const clearToken = () => (dispatch: DispatchAPI<*>) => {
    dispatch({
        type: PROFILE_CLEAR_TOKEN,
    });
    window.localStorage.removeItem('token');
};
