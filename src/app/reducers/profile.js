// @flow

import { profileConstants } from '../constants';
import type {
    User,
    ErrorObject,
} from '../types';

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

export type ProfileReducerState = {
    token: ?string,
    user: ?User,
    loginLoading: boolean,
    loginError: ?ErrorObject,
    registrationLoading: boolean,
    registrationError: ?ErrorObject,
    getUserLoading: boolean,
    getUserError: ?ErrorObject,
};

const initialState = {
    token: undefined,
    user: undefined,
    loginLoading: false,
    loginError: undefined,
    registrationLoading: false,
    registrationError: undefined,
    getUserLoading: false,
    getUserError: undefined,
};

export default function userReducer(
    state: ProfileReducerState = initialState,
    action: Object
): ProfileReducerState {
    const { type, payload } = action;
    switch (type) {
        case PROFILE_LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginError: undefined,
            };

        case PROFILE_LOGIN_SUCCESS:
            return {
                ...state,
                token: payload.jwt,
                user: payload.user,
                loginLoading: false,
                loginError: undefined,
            };

        case PROFILE_LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginError: payload,
            };

        case PROFILE_REGISTRATION_REQUEST:
            return {
                ...state,
                registrationLoading: true,
                registrationError: undefined,
            };

        case PROFILE_REGISTRATION_SUCCESS:
            return {
                ...state,
                token: payload.jwt,
                user: payload.user,
                registrationLoading: false,
                registrationError: undefined,
            };

        case PROFILE_REGISTRATION_FAILURE:
            return {
                ...state,
                registrationLoading: false,
                registrationError: payload,
            };

        case PROFILE_SET_TOKEN:
            return {
                ...state,
                token: payload,
            };

        case PROFILE_CLEAR_TOKEN:
            return {
                ...state,
                token: undefined,
                user: undefined,
            };

        case PROFILE_GET_USER_REQUEST:
            return {
                ...state,
                getUserLoading: true,
            };

        case PROFILE_GET_USER_SUCCESS:
            return {
                ...state,
                getUserLoading: false,
                user: payload,
            };

        case PROFILE_GET_USER_FAILURE:
            return {
                ...state,
                getUserLoading: false,
                getUserError: payload,
            };

        default:
            return state;
    }
}
