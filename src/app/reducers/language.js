// @flow

import { languageConstants } from '../constants';
import type { Translation } from '../types';

const {
    GET_TRANSLATIONS_FAILURE,
    GET_TRANSLATIONS_REQUEST,
    GET_TRANSLATIONS_SUCCESS,
} = languageConstants;

export type LanguageReducerState = {
    dictionaries: Translation[],
    current: string,
    error: ?Error,
};

const initialState = {
    dictionaries: [],
    current: 'en',
    error: undefined,
};

export default function languageReducer(
    state: LanguageReducerState = initialState,
    action: Object
): LanguageReducerState {
    const { type, payload } = action;
    switch (type) {
        case GET_TRANSLATIONS_REQUEST:
            return {
                ...state,
                error: undefined,
            };

        case GET_TRANSLATIONS_SUCCESS:
            return {
                ...state,
                dictionaries: payload,
                error: undefined,
            };

        case GET_TRANSLATIONS_FAILURE:
            return {
                ...state,
                error: payload,
            };

        default:
            return state;
    }
}
