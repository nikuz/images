// @flow

import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import { routerConstants } from '../../../constants';
import {
    Loading,
    RadioButtons,
    SelectField,
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
    genrePopularField: FormFieldString,
    genreOtherField: FormFieldString,
    getGenres: () => *,
    formFieldClear: (field: string) => *,
};

export default class OrdersCreate extends React.Component<Props> {
    componentWillMount(): void {
        if (!this.props.genres.length) {
            this.props.getGenres();
        }
    }

    handlePopularGenreSelect = () => {
        this.props.formFieldClear(this.props.genreOtherField.id);
    };

    handleOtherGenreSelect = () => {
        this.props.formFieldClear(this.props.genrePopularField.id);
    };

    render() {
        const {
            genres,
            genresLoading,
            genresError,
            genrePopularField,
            genreOtherField,
        } = this.props;

        const popularGenres = genres.slice(0, 3);
        const otherGenres = genres.slice(3);

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
                    <div className="order-genres-container">
                        <RadioButtons
                            id={genrePopularField.id}
                            value={genrePopularField.value}
                            items={popularGenres.map(item => ({
                                id: item.id,
                                value: item.name,
                            }))}
                            label="Orders.Popular-Themes"
                            onChange={this.handlePopularGenreSelect}
                        />
                        <SelectField
                            id={genreOtherField.id}
                            value={genreOtherField.value}
                            className="order-genres-others-selector"
                            items={otherGenres.map(item => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            label="Orders.Other-Themes"
                            onChange={this.handleOtherGenreSelect}
                        />
                    </div>
                ) }
            </div>
        );
    }
}
