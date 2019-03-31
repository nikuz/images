// @flow

import { orderConstants } from '../constants';
import type {
    Genre,
    Template,
} from '../types';

const {
    ORDER_GENRES_REQUEST,
    ORDER_GENRES_SUCCESS,
    ORDER_GENRES_FAILURE,
    ORDER_TEMPLATES_REQUEST,
    ORDER_TEMPLATES_SUCCESS,
    ORDER_TEMPLATES_FAILURE,
    ORDER_EXAMPLE_REQUEST,
    ORDER_EXAMPLE_SUCCESS,
    ORDER_EXAMPLE_FAILURE,
} = orderConstants;

export type OrderReducerState = {
    genres: Genre[],
    genresLoading: boolean,
    genresError: ?Error,
    templates: Template[],
    templatesLoading: boolean,
    templatesError: ?Error,
    example?: string,
    exampleLoading: boolean,
    exampleError: ?Error,
};

const initialState = {
    genres: [],
    genresLoading: false,
    genresError: undefined,
    templates: [],
    templatesLoading: false,
    templatesError: undefined,
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
