// @flow

import { createSelector } from 'reselect';
import type { StoreState } from '../reducers';
import type { ProfileReducerState } from '../reducers/profile';
import type { User } from '../types';

const profileSelector = (state: StoreState): ProfileReducerState => state.profile;

// ----------------
// public methods
// ----------------

export const getToken: (StoreState) => ?string = createSelector(
    profileSelector,
    profile => profile.token
);

export const getUser: (StoreState) => ?User = createSelector(
    profileSelector,
    profile => profile.user
);
