// @flow

import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import { routerConstants } from './constants';

import Launcher from './scenes/launcher';
import Home from './scenes/home';
import Login from './scenes/login';
import Registration from './scenes/registration';
import Orders from './scenes/orders';
import OrdersCreate from './scenes/orders/create';

export default () => (
    <ConnectedRouter history={history}>
        <Launcher>
            <Switch>
                <Route
                    exact
                    path={routerConstants.HOME}
                    component={Home}
                />
                <Route
                    exact
                    path={routerConstants.LOGIN}
                    component={Login}
                />
                <Route
                    exact
                    path={routerConstants.REGISTRATION}
                    component={Registration}
                />
                <Orders path={routerConstants.ORDERS}>
                    <Route
                        exact
                        path={routerConstants.ORDERS_CREATE}
                        component={OrdersCreate}
                    />
                </Orders>
            </Switch>
        </Launcher>
    </ConnectedRouter>
);