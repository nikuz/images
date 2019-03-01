// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    BackButton,
    ButtonGreen,
    Loading,
} from '../../components';
import type { ErrorObject } from '../../types';
import './style.css';

type Props = {
    loading: boolean,
    error?: ErrorObject,
    token?: string,
    registration: (name: string, email: string, password: string) => *,
    setToken: (token: string) => *,
    goToHomePage: () => *,
};

type State = {
    name: string,
    email: string,
    password: string,
};

export default class Registration extends React.Component<Props, State> {
    state = {
        name: '',
        email: '',
        password: '',
    };

    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.setToken(nextProps.token);
            this.props.goToHomePage();
        }
    }

    handleNameChange = ({ target }: { target: HTMLInputElement }) => {
        this.setState({
            name: target.value,
        });
    };

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

    handleRegistration = () => {
        const {
            name,
            email,
            password,
        } = this.state;

        this.props.registration(name, email, password);
    };

    render() {
        const {
            loading,
            error,
        } = this.props;

        return (
            <div className="login-container">
                <BackButton
                    text="Registration.Back"
                />
                <div>
                    <label htmlFor="name">
                        <FormattedMessage id="Registration.Name" />
                        <input
                            type="text"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="email">
                        <FormattedMessage id="Registration.Email" />
                        <input
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        <FormattedMessage id="Registration.Password" />
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
                    <ButtonGreen
                        text="Registration.Submit"
                        onClick={this.handleRegistration}
                    />
                </div>
            </div>
        );
    }
}
