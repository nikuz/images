// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { ButtonGreen } from '../button';
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
    nameField: FormFieldString,
    emailField: FormFieldString,
    passwordField: FormFieldString,
    overlayMode?: boolean,
    registration: (name: string, email: string, password: string) => *,
    setToken: (token: string) => *,
    onGoToLogin?: () => *,
    goToLogin: () => *,
};

export default class Registration extends React.Component<Props> {
    static defaultProps = {
        overlayMode: false,
    };

    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.setToken(nextProps.token);
        }
    }

    handleRegistration = () => {
        const {
            nameField,
            emailField,
            passwordField,
        } = this.props;

        this.props.registration(
            nameField.value,
            emailField.value,
            passwordField.value
        );
    };

    handleGoToLogin = (e: MouseEvent) => {
        e.preventDefault();

        const {
            overlayMode,
            onGoToLogin,
        } = this.props;

        if (overlayMode && onGoToLogin instanceof Function) {
            onGoToLogin();
        } else {
            this.props.goToLogin();
        }
    };

    render() {
        const {
            loading,
            error,
            nameField,
            emailField,
            passwordField,
            overlayMode,
        } = this.props;
        const fieldClassName = classNames(overlayMode && 'with-border');

        return (
            <div className="registration-container">
                <div>
                    <TextField
                        id={nameField.id}
                        value={nameField.value}
                        label="Registration.Name"
                        required
                        fieldClassName={fieldClassName}
                    />
                </div>
                <div>
                    <TextField
                        type="email"
                        id={emailField.id}
                        value={emailField.value}
                        label="Registration.Email"
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
                        label="Registration.Password"
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
                    <ButtonGreen
                        text="Registration.Submit"
                        onClick={this.handleRegistration}
                    />
                </div>
                &nbsp;
                or
                &nbsp;
                <a href="#" onClick={this.handleGoToLogin}>
                    <FormattedMessage id="Registration.Login" />
                </a>
            </div>
        );
    }
}
