// @flow

import { appConstants } from '../constants';

import type { ErrorObject } from '../types';

export const getApiUrl = () => {
    const loc = window.location;
    return `${loc.protocol}//${loc.hostname}:${appConstants.apiPort}`;
};

export const makeError = (errorType: string, errorDetails: string): ErrorObject => ({
    error: errorType,
    message: errorDetails,
});
