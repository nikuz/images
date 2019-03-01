// @flow

import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import { routerConstants } from '../../../constants';
import {
    Loading,
    // ButtonBlue,
} from '../../../components';
import type {
    ErrorObject,
    Genre,
} from '../../../types';
import './style.css';

type Props = {
    genres: Genre[],
    genresLoading: boolean,
    genresError: ErrorObject,
    getGenres: () => *,
};

export default class OrdersCreate extends React.Component<Props> {
    componentWillMount(): void {
        if (!this.props.genres.length) {
            this.props.getGenres();
        }
    }

    render() {
        const {
            genresLoading,
            genresError,
        } = this.props;

        return (
            <div>
                Create new order
                { genresLoading && <Loading size="small" /> }
                { genresError && (
                    <div>
                        { genresError.message }
                    </div>
                ) }
            </div>
        );
    }
}
