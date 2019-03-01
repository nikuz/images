// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { routerConstants } from '../../constants';
import { ButtonBlue } from '../../components';
import type { User } from '../../types';
import './style.css';

type Props = {
    user?: User,
    logOut: () => *,
};

export default class Home extends React.Component<Props> { // eslint-disable-line
    render() {
        const { user } = this.props;
        return (
            <div>
                { !user && (
                    <div>
                        <Link to={routerConstants.LOGIN}>
                            <FormattedMessage id="Home.Login" />
                        </Link>
                    </div>
                ) }
                { user && (
                    <div className="inline-block">
                        <ButtonBlue
                            text="Home.Logout"
                            onClick={this.props.logOut}
                        />
                    </div>
                ) }
                { user && (
                    <div>
                        <Link to={routerConstants.ORDERS}>
                            <FormattedMessage id="Home.Orders" />
                        </Link>
                    </div>
                ) }
            </div>
        );
    }
}
