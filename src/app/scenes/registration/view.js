// @flow

import * as React from 'react';
import {
    BackButton,
    ButtonGreen,
    Loading,
    TextField,
} from '../../components';
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
    registration: (name: string, email: string, password: string) => *,
    setToken: (token: string) => *,
    goToHomePage: () => *,
};

export default class Registration extends React.Component<Props> {
    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.setToken(nextProps.token);
            this.props.goToHomePage();
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

    render() {
        const {
            loading,
            error,
            nameField,
            emailField,
            passwordField,
        } = this.props;

        return (
            <div className="login-container">
                <BackButton
                    text="Registration.Back"
                />
                <div>
                    <TextField
                        id={nameField.id}
                        value={nameField.value}
                        label="Registration.Name"
                        required
                        className=""
                    />
                </div>
                <div>
                    <TextField
                        type="email"
                        id={emailField.id}
                        value={emailField.value}
                        label="Registration.Email"
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
                        label="Registration.Password"
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
                    <ButtonGreen
                        text="Registration.Submit"
                        onClick={this.handleRegistration}
                    />
                </div>
            </div>
        );
    }
}
