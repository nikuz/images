// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { BrowserHistory } from 'history/createBrowserHistory';
import languageReducer from './language';
import profileReducer from './profile';

import type { LanguageReducerState } from './language';
import type { ProfileReducerState } from './profile';

export type StoreState = {
    router: BrowserHistory,
    language: LanguageReducerState,
    profile: ProfileReducerState,
};

// $FlowFixMe
export default (history: BrowserHistory) => combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    profile: profileReducer,
});
