// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import {
    BackButton,
    ButtonBlue,
    Loading,
} from '../../components';
import { routerConstants } from '../../constants';
import type { ErrorObject } from '../../types';
import './style.css';

type Props = {
    loading: boolean,
    error?: ErrorObject,
    token?: string,
    login: (email: string, password: string) => *,
    setToken: (token: string) => *,
    goToHomePage: () => *,
};

type State = {
    email: string,
    password: string,
};

export default class Login extends React.Component<Props, State> {
    state = {
        email: '',
        password: '',
    };

    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.setToken(nextProps.token);
            this.props.goToHomePage();
        }
    }

    handleEmailChange = ({ target }: { target: HTMLInputElement }) => {
        this.setState({
            email: target.value,
        });
    };

    handlePasswordChange = ({ target }: { target: HTMLInputElement }) => {
        this.setState({
            password: target.value,
        });
    };

    handleLogin = () => {
        const {
            email,
            password,
        } = this.state;

        this.props.login(email, password);
    };

    render() {
        const {
            loading,
            error,
        } = this.props;

        return (
            <div className="login-container">
                <BackButton
                    text="Login.Back"
                />
                <div>
                    <label htmlFor="email">
                        <FormattedMessage id="Login.Email" />
                        <input
                            type="text"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        <FormattedMessage id="Login.Password" />
                        <input
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </label>
                </div>
                { loading && (
                    <div>
                        <Loading size="small" />
                    </div>
                ) }
                { error && (
                    <div>
                        { error.message }
                    </div>
                ) }
                <div className="inline-block">
                    <ButtonBlue
                        text="Login.Submit"
                        onClick={this.handleLogin}
                    />
                </div>
                &nbsp;
                or
                &nbsp;
                <Link to={routerConstants.REGISTRATION}>
                    <FormattedMessage id="Login.Register" />
                </Link>
            </div>
        );
    }
}
