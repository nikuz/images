// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    Overlay,
} from '../../../components';
// import type {
//     User,
//     Order,
// } from '../../../types';

type Props = {
    // user: User,
    // order?: Order,
    close: () => *,
}

export default class OrderPayment extends React.Component<Props> { // eslint-disable-line
    render() {
        return (
            <Overlay onClick={this.props.close}>
                <FormattedMessage id="Payment.Text" />
            </Overlay>
        );
    }
}
