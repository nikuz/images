// @flow

import type { DispatchAPI } from 'redux';
import {
    commonUtils,
    actionCreator,
    request,
} from '../utils';
import { languageConstants } from '../constants';

const {
    GET_TRANSLATIONS_REQUEST,
    GET_TRANSLATIONS_SUCCESS,
    GET_TRANSLATIONS_FAILURE,
} = languageConstants;

export function getTranslations() {
    const apiUrl = commonUtils.getApiUrl();
    return (dispatch: DispatchAPI<*>) => actionCreator({
        dispatch,
        requestAction: GET_TRANSLATIONS_REQUEST,
        successAction: GET_TRANSLATIONS_SUCCESS,
        failureAction: GET_TRANSLATIONS_FAILURE,
        action: () => request.get({ url: `${apiUrl}/languages` }),
    });
}
