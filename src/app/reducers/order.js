// @flow

import { orderConstants } from '../constants';
import type { Genre } from '../types';

const {
    ORDER_GENRES_REQUEST,
    ORDER_GENRES_SUCCESS,
    ORDER_GENRES_FAILURE,
} = orderConstants;

export type OrderReducerState = {
    genres: Genre[],
    genresLoading: boolean,
    genresError: ?Error,
};

const initialState = {
    genres: [],
    genresLoading: false,
    genresError: undefined,
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

        default:
            return state;
    }
}
