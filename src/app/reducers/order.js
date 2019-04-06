// @flow

import { orderConstants } from '../constants';
import type {
    Genre,
    Template,
    PackSize,
    Order,
} from '../types';

const {
    ORDER_GENRES_REQUEST,
    ORDER_GENRES_SUCCESS,
    ORDER_GENRES_FAILURE,
    ORDER_TEMPLATES_REQUEST,
    ORDER_TEMPLATES_SUCCESS,
    ORDER_TEMPLATES_FAILURE,
    ORDER_PACK_SIZES_REQUEST,
    ORDER_PACK_SIZES_SUCCESS,
    ORDER_PACK_SIZES_FAILURE,
    ORDER_EXAMPLE_REQUEST,
    ORDER_EXAMPLE_SUCCESS,
    ORDER_EXAMPLE_FAILURE,
    ORDER_SHOW_REGISTRATION_OVERLAY,
    ORDER_SHOW_LOGIN_OVERLAY,
    ORDER_HIDE_LOGIN_OVERLAYS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_SHOW_PAYMENT_OVERLAY,
    ORDER_HIDE_PAYMENT_OVERLAY,
    ORDER_CLEAR_STATE,
} = orderConstants;

export type OrderReducerState = {
    genres: Genre[],
    genresLoading: boolean,
    genresError?: Error,
    templates: Template[],
    templatesLoading: boolean,
    templatesError?: Error,
    packSizes: PackSize[],
    packSizesLoading: boolean,
    packSizesError?: Error,
    example?: string,
    exampleLoading: boolean,
    exampleError?: Error,
    registrationOverlayShown: boolean,
    loginOverlayShown: boolean,
    order?: Order,
    createLoading: boolean,
    createError?: Error,
    paymentOverlayShown: boolean,
};

const initialState = {
    genres: [],
    genresLoading: false,
    genresError: undefined,
    templates: [],
    templatesLoading: false,
    templatesError: undefined,
    packSizes: [],
    packSizesLoading: false,
    packSizesError: undefined,
    example: undefined,
    exampleLoading: false,
    exampleError: undefined,
    registrationOverlayShown: false,
    loginOverlayShown: false,
    order: undefined,
    createLoading: false,
    createError: undefined,
    paymentOverlayShown: false,
};

export default function languageReducer(
    state: OrderReducerState = initialState,
    action: Object
): OrderReducerState {
    const { type, payload } = action;
    switch (type) {
        case ORDER_GENRES_REQUEST:
            return {
                ...state,
                genresLoading: true,
                genresError: undefined,
            };

        case ORDER_GENRES_SUCCESS:
            return {
                ...state,
                genres: payload,
                genresLoading: false,
            };

        case ORDER_GENRES_FAILURE:
            return {
                ...state,
                genresLoading: false,
                genresError: payload,
            };

        case ORDER_TEMPLATES_REQUEST:
            return {
                ...state,
                templatesLoading: true,
                templatesError: undefined,
            };

        case ORDER_TEMPLATES_SUCCESS:
            return {
                ...state,
                templates: payload,
                templatesLoading: false,
            };

        case ORDER_TEMPLATES_FAILURE:
            return {
                ...state,
                templatesLoading: false,
                templatesError: payload,
            };

        case ORDER_PACK_SIZES_REQUEST:
            return {
                ...state,
                packSizesLoading: true,
                packSizesError: undefined,
            };

        case ORDER_PACK_SIZES_SUCCESS:
            return {
                ...state,
                packSizes: payload,
                packSizesLoading: false,
            };

        case ORDER_PACK_SIZES_FAILURE:
            return {
                ...state,
                packSizesLoading: false,
                packSizesError: payload,
            };

        case ORDER_EXAMPLE_REQUEST:
            return {
                ...state,
                exampleLoading: true,
                exampleError: undefined,
            };

        case ORDER_EXAMPLE_SUCCESS:
            return {
                ...state,
                exampleLoading: false,
                exampleError: undefined,
                example: payload && payload.example,
            };

        case ORDER_EXAMPLE_FAILURE:
            return {
                ...state,
                exampleLoading: false,
                exampleError: payload,
            };

        case ORDER_SHOW_REGISTRATION_OVERLAY:
            return {
                ...state,
                registrationOverlayShown: true,
                loginOverlayShown: false,
            };

        case ORDER_SHOW_LOGIN_OVERLAY:
            return {
                ...state,
                loginOverlayShown: true,
                registrationOverlayShown: false,
            };

        case ORDER_HIDE_LOGIN_OVERLAYS:
            return {
                ...state,
                registrationOverlayShown: false,
                loginOverlayShown: false,
            };

        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                order: undefined,
                createLoading: true,
                createError: undefined,
            };

        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                createLoading: false,
                order: payload,
            };

        case ORDER_CREATE_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: payload,
            };

        case ORDER_SHOW_PAYMENT_OVERLAY:
            return {
                ...state,
                paymentOverlayShown: true,
            };

        case ORDER_HIDE_PAYMENT_OVERLAY:
            return {
                ...state,
                paymentOverlayShown: false,
            };

        case ORDER_CLEAR_STATE:
            return {
                ...state,
                genresError: undefined,
                packSizesError: undefined,
                templatesError: undefined,
                example: undefined,
                exampleError: undefined,
            };

        default:
            return state;
    }
}
