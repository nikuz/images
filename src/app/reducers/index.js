// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { BrowserHistory } from 'history/createBrowserHistory';
import languageReducer from './language';
import profileReducer from './profile';
import orderReducer from './order';
import formReducer from './form';

import type { LanguageReducerState } from './language';
import type { ProfileReducerState } from './profile';
import type { OrderReducerState } from './order';
import type { FormReducerState } from './form';

export type StoreState = {
    router: BrowserHistory,
    language: LanguageReducerState,
    profile: ProfileReducerState,
    order: OrderReducerState,
    form: FormReducerState,
};

// $FlowFixMe
export default (history: BrowserHistory) => combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    profile: profileReducer,
    order: orderReducer,
    form: formReducer,
});
