// @flow

import type { ErrorObject } from '../types';

export const makeError = (errorType: string, errorDetails: string): ErrorObject => ({
    error: errorType,
    message: errorDetails,
});

export const getCropSize = (socialNetworkName: string): number => {
    switch (socialNetworkName) {
        case 'instagram':
        case 'facebook':
        case 'pinterest':
            return 1080;
        case 'twitter':
            return 1024;
        default:
            return 1080;
    }
};
