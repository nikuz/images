// @flow

import { orderConstants } from '../constants';
import type { Genre } from '../types';

const {
    ORDER_GENRES_REQUEST,
    ORDER_GENRES_SUCCESS,
    ORDER_GENRES_FAILURE,
    ORDER_EXAMPLE_REQUEST,
    ORDER_EXAMPLE_SUCCESS,
    ORDER_EXAMPLE_FAILURE,
} = orderConstants;

export type OrderReducerState = {
    genres: Genre[],
    genresLoading: boolean,
    genresError: ?Error,
    example?: string,
    exampleLoading: boolean,
    exampleError: ?Error,
};

const initialState = {
    genres: [],
    genresLoading: false,
    genresError: undefined,
    example: undefined,
    exampleLoading: false,
    exampleError: undefined,
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
                example: payload,
            };

        case ORDER_EXAMPLE_FAILURE:
            return {
                ...state,
                exampleLoading: false,
                exampleError: payload,
            };

        default:
            return state;
    }
}
