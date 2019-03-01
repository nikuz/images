// @flow

import { createSelector } from 'reselect';
import {
    appConstants,
    routerConstants,
} from '../constants';
import type { StoreState } from '../reducers';

const getLocationPath = createSelector(
    (state: StoreState): Object => state.router.location,
    (location: Object) => location.pathname
);

// ----------------
// public methods
// ----------------

export const getApiUrl = () => {
    const loc = window.location;
    return `${loc.protocol}//${loc.hostname}:${appConstants.apiPort}`;
};

export const isOnOrders: (StoreState) => boolean = createSelector(
    getLocationPath,
    path => path === routerConstants.ORDERS
);

export const isOnOrdersCreatePage: (StoreState) => boolean = createSelector(
    getLocationPath,
    path => path === routerConstants.ORDERS_CREATE
);
