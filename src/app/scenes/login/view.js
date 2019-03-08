// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import {
    BackButton,
    ButtonBlue,
    Loading,
    TextField,
} from '../../components';
import { routerConstants } from '../../constants';
import type {
    ErrorObject,
    FormFieldString,
} from '../../types';
import './style.css';

type Props = {
    loading: boolean,
    error?: ErrorObject,
    token?: string,
    emailField: FormFieldString,
    passwordField: FormFieldString,
    login: (email: string, password: string) => *,
    setToken: (token: string) => *,
    goToHomePage: () => *,
};

export default class Login extends React.Component<Props> {
    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.setToken(nextProps.token);
            this.props.goToHomePage();
        }
    }

    handleLogin = () => {
        const {
            emailField,
            passwordField,
        } = this.props;

        this.props.login(emailField.value, passwordField.value);
    };

    render() {
        const {
            loading,
            error,
            emailField,
            passwordField,
        } = this.props;

        return (
            <div className="login-container">
                <BackButton
                    text="Login.Back"
                />
                <div>
                    <TextField
                        type="email"
                        id={emailField.id}
                        value={emailField.value}
                        label="Login.Email"
                        required
                        className=""
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        passwordVisible={passwordField.passwordVisible}
                        id={passwordField.id}
                        value={passwordField.value}
                        label="Login.Password"
                        required
                        autoFocus
                        className=""
                    />
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
