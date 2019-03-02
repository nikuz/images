// @flow

import * as React from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
    formatField: FormFieldString,
    sizeField: FormFieldString,
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

    formats = [{
        id: 'jpg',
        value: 'Orders.Format.jpg',
        description: 'Orders.Format.jpg-description',
    }, {
        id: 'gif',
        value: 'Orders.Format.gif',
        description: 'Orders.Format.gif-description',
    }, {
        id: 'mp4',
        value: 'Orders.Format.mp4',
        description: 'Orders.Format.mp4-description',
    }];

    sizes = [{
        id: 'instagram',
        value: 'instagram',
        description: '1080x1080',
    }, {
        id: 'facebook',
        value: 'facebook',
        description: '1080x1080',
    }, {
        id: 'pinterest',
        value: 'pinterest',
        description: '735x735',
    }, {
        id: 'twitter',
        value: 'twitter',
        description: '1024x512',
    }];

    render() {
        const {
            genres,
            genresLoading,
            genresError,
            genrePopularField,
            genreOtherField,
            formatField,
            sizeField,
        } = this.props;

        const popularGenres = genres.slice(0, 3);
        const otherGenres = genres.slice(3);

        if (genresLoading) {
            return <Loading size="small" />;
        }

        if (genresError) {
            return (
                <div>
                    { genresError.message }
                </div>
            );
        }

        return (
            <div>
                <div className="order-genres-container">
                    <RadioButtons
                        id={genrePopularField.id}
                        value={genrePopularField.value}
                        items={popularGenres.map(item => ({
                            id: item.id,
                            value: `Orders.Genre.${item.name}`,
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
                            label: `Orders.Genre.${item.name}`,
                        }))}
                        label="Orders.Other-Themes"
                        onChange={this.handleOtherGenreSelect}
                    />
                </div>
                <RadioButtons
                    id={formatField.id}
                    value={formatField.value}
                    items={this.formats}
                    label="Orders.Formats"
                />
                <h3>
                    <FormattedMessage id="Orders.Size.Title" />
                    <p>
                        <FormattedMessage id="Orders.Size.Description" />
                    </p>
                </h3>
                <RadioButtons
                    id={sizeField.id}
                    value={sizeField.value}
                    items={this.sizes}
                    translate={false}
                />
            </div>
        );
    }
}
