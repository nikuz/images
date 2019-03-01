// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { BrowserHistory } from 'history/createBrowserHistory';
import languageReducer from './language';
import profileReducer from './profile';
import orderReducer from './order';

import type { LanguageReducerState } from './language';
import type { ProfileReducerState } from './profile';
import type { OrderReducerState } from './order';

export type StoreState = {
    router: BrowserHistory,
    language: LanguageReducerState,
    profile: ProfileReducerState,
    order: OrderReducerState,
};

// $FlowFixMe
export default (history: BrowserHistory) => combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    profile: profileReducer,
    order: orderReducer,
});
