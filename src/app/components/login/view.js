// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { ButtonBlue } from '../button';
import Loading from '../loading';
import TextField from '../text-field';
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
    overlayMode?: boolean,
    login: (email: string, password: string) => *,
    setToken: (token: string) => *,
    onGoToRegistration?: () => *,
    goToRegistration: () => *,
};

export default class Login extends React.Component<Props> {
    static defaultProps = {
        overlayMode: false,
    };

    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.setToken(nextProps.token);
        }
    }

    handleLogin = () => {
        const {
            emailField,
            passwordField,
        } = this.props;

        this.props.login(emailField.value, passwordField.value);
    };

    handleGoToRegistration = (e: MouseEvent) => {
        e.preventDefault();

        const {
            overlayMode,
            onGoToRegistration,
        } = this.props;

        if (overlayMode && onGoToRegistration instanceof Function) {
            onGoToRegistration();
        } else {
            this.props.goToRegistration();
        }
    };

    render() {
        const {
            loading,
            error,
            emailField,
            passwordField,
            overlayMode,
        } = this.props;
        const fieldClassName = classNames(overlayMode && 'with-border');

        return (
            <div className="login-container">
                <div>
                    <TextField
                        type="email"
                        id={emailField.id}
                        value={emailField.value}
                        label="Login.Email"
                        required
                        fieldClassName={fieldClassName}
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
                        fieldClassName={fieldClassName}
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
                <a href="#" onClick={this.handleGoToRegistration}>
                    <FormattedMessage id="Login.Register" />
                </a>
            </div>
        );
    }
}
