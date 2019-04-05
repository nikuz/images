// @flow

import type { DispatchAPI } from 'redux';
import {
    actionCreator,
    request,
} from '../utils';
import { routerSelectors } from '../selectors';
import { orderConstants } from '../constants';

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
} = orderConstants;

export const getGenres = () => (dispatch: DispatchAPI<*>) => {
    const apiUrl = routerSelectors.getApiUrl();
    return actionCreator({
        dispatch,
        requestAction: ORDER_GENRES_REQUEST,
        successAction: ORDER_GENRES_SUCCESS,
        failureAction: ORDER_GENRES_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/genres`,
        }),
    });
};

export const getTemplates = (genre: string) => (dispatch: DispatchAPI<*>) => {
    const apiUrl = routerSelectors.getApiUrl();
    return actionCreator({
        dispatch,
        requestAction: ORDER_TEMPLATES_REQUEST,
        successAction: ORDER_TEMPLATES_SUCCESS,
        failureAction: ORDER_TEMPLATES_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/templates?genre=${genre}`,
        }),
    });
};

export const getPackSizes = () => (dispatch: DispatchAPI<*>) => {
    const apiUrl = routerSelectors.getApiUrl();
    return actionCreator({
        dispatch,
        requestAction: ORDER_PACK_SIZES_REQUEST,
        successAction: ORDER_PACK_SIZES_SUCCESS,
        failureAction: ORDER_PACK_SIZES_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/packsizes`,
        }),
    });
};

export const getExample = (data: Object) => (dispatch: DispatchAPI<*>) => {
    const apiUrl = routerSelectors.getApiUrl();
    actionCreator({
        dispatch,
        requestAction: ORDER_EXAMPLE_REQUEST,
        successAction: ORDER_EXAMPLE_SUCCESS,
        failureAction: ORDER_EXAMPLE_FAILURE,
        action: () => request.post({
            url: `${apiUrl}/examples/get`,
            args: data,
        }),
    });
};

