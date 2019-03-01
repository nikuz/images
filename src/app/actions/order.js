// @flow

import type { DispatchAPI } from 'redux';
import {
    actionCreator,
    request,
} from '../utils';
import {
    profileSelectors,
    routerSelectors,
} from '../selectors';
import { orderConstants } from '../constants';

const {
    ORDER_GENRES_REQUEST,
    ORDER_GENRES_SUCCESS,
    ORDER_GENRES_FAILURE,
} = orderConstants;

export const getGenres = () => (
    dispatch: DispatchAPI<*>,
    getState: () => Object
) => {
    const token = profileSelectors.getToken(getState()) || '';
    const apiUrl = routerSelectors.getApiUrl();
    return actionCreator({
        dispatch,
        requestAction: ORDER_GENRES_REQUEST,
        successAction: ORDER_GENRES_SUCCESS,
        failureAction: ORDER_GENRES_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/genres`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    });
};

