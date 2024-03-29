// @flow

import { createSelector } from 'reselect';
import type { StoreState } from '../reducers';
import type { OrderReducerState } from '../reducers/order';
import type {
    Genre,
    Template,
    PackSize,
} from '../types';

const orderSelector = (state: StoreState): OrderReducerState => state.order;

// ----------------
// public methods
// ----------------

export const getGenres: (StoreState) => Genre[] = createSelector(
    orderSelector,
    order => order.genres
);

export const getTemplates: (StoreState) => Template[] = createSelector(
    orderSelector,
    order => order.templates
);

export const getPackSizes: (StoreState) => PackSize[] = createSelector(
    orderSelector,
    order => order.packSizes
);
