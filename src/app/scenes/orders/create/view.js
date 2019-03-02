// @flow

import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import { routerConstants } from '../../../constants';
import {
    Loading,
    RadioButtons,
    // ButtonBlue,
} from '../../../components';
import type {
    ErrorObject,
    Genre,
    FormFieldString,
} from '../../../types';
import './style.css';

type Props = {
    genres: Genre[],
    genresLoading: boolean,
    genresError: ErrorObject,
    genreField: FormFieldString,
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
            genres,
            genresLoading,
            genresError,
            genreField,
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
                { !!genres.length && (
                    <RadioButtons
                        id={genreField.id}
                        value={genreField.value || genres[0].id}
                        items={genres.map(item => ({
                            id: item.id,
                            value: item.name,
                        }))}
                        label="Orders.Theme"
                    />
                ) }
            </div>
        );
    }
}