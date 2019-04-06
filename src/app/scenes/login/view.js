// @flow

import * as React from 'react';
import {
    BackButton,
    Login,
} from '../../components';
import './style.css';

type Props = {
    token?: string,
    goToHomePage: () => *,
};

export default class LoginPage extends React.Component<Props> {
    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.goToHomePage();
        }
    }

    render() {
        return (
            <div className="login-page-container">
                <BackButton
                    text="Login.Back"
                />
                <Login />
            </div>
        );
    }
}
