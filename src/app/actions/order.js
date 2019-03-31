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
    ORDER_TEMPLATES_REQUEST,
    ORDER_TEMPLATES_SUCCESS,
    ORDER_TEMPLATES_FAILURE,
    ORDER_EXAMPLE_REQUEST,
    ORDER_EXAMPLE_SUCCESS,
    ORDER_EXAMPLE_FAILURE,
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

export const getTemplates = (genre: string) => (
    dispatch: DispatchAPI<*>,
    getState: () => Object
) => {
    const token = profileSelectors.getToken(getState()) || '';
    const apiUrl = routerSelectors.getApiUrl();
    return actionCreator({
        dispatch,
        requestAction: ORDER_TEMPLATES_REQUEST,
        successAction: ORDER_TEMPLATES_SUCCESS,
        failureAction: ORDER_TEMPLATES_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/templates?genre=${genre}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    });
};

export const getExample = (
    logo?: File,
    logoAlign: string,
    copyright?: string,
    copyrightAlign: string
) => (
    dispatch: DispatchAPI<*>
    // getState: () => Object
) => (
    // const token = profileSelectors.getToken(getState()) || '';
    // const apiUrl = routerSelectors.getApiUrl();
    actionCreator({
        dispatch,
        requestAction: ORDER_EXAMPLE_REQUEST,
        successAction: ORDER_EXAMPLE_SUCCESS,
        failureAction: ORDER_EXAMPLE_FAILURE,
        action: () => request.post({
            url: 'http://localhost:5679',
            args: {
                imageURL: 'http://localhost:1337/uploads/b20d4e68d36041a595e4962fdc856a6f.jpg',
                width: 400,
                height: 400,
                text: 'To create a user in our API, invoke a PUT request providing JSON data in the request body. djkgkdfg bg dfkgb dfkg dfg',
                textFontFamily: 'NickAinley',
                textEffect: 'fade-lines',
                textAlign: 'right',
                textVerticalAlign: 'top',
                author: 'William Longgood',
                authorFontFamily: 'Lobster',
                authorEffect: 'fade',
                authorAlign: 'left',
                authorVerticalAlign: 'bottom',
                animate: true,
                format: 'gif',
                frameQuality: 0.93,
                overlay: '',
                color: '#FF0',
                filter: '',
                watermark: true,
                logo,
                logoAlign,
                copyright,
                copyrightAlign,
            },
        }),
    })
);

