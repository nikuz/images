// @flow

import * as React from 'react';
import {
    BackButton,
    Registration,
} from '../../components';
import './style.css';

type Props = {
    token?: string,
    goToHomePage: () => *,
};

export default class RegistrationPage extends React.Component<Props> {
    componentWillReceiveProps(nextProps: Props): void {
        if (nextProps.token && !this.props.token) {
            this.props.goToHomePage();
        }
    }

    render() {
        return (
            <div className="registration-page-container">
                <BackButton
                    text="Registration.Back"
                />
                <Registration />
            </div>
        );
    }
}
