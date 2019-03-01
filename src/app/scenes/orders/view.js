// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { routerConstants } from '../../constants';
import {
    BackButton,
    ButtonBlue,
} from '../../components';
import type { User } from '../../types';
import './style.css';

type Props = {
    user?: User,
    isOnOrders: boolean,
    children: React.Node,
    goToHomePage: () => *,
};

export default class Orders extends React.Component<Props> {
    componentWillMount(): void {
        if (!this.props.user) {
            this.props.goToHomePage();
        }
    }

    render() {
        const { isOnOrders } = this.props;

        return (
            <div>
                <BackButton
                    text="Orders.Back"
                />
                { isOnOrders && (
                    <div className="inline-block">
                        <ButtonBlue>
                            <Link to={routerConstants.ORDERS_CREATE}>
                                <FormattedMessage id="Orders.Create" />
                            </Link>
                        </ButtonBlue>
                    </div>
                ) }
                { this.props.children }
            </div>
        );
    }
}
