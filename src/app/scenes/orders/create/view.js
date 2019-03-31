// @flow

import * as React from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
// import { routerConstants } from '../../../constants';
import {
    Loading,
    RadioButtons,
    SelectField,
    ButtonBlue,
    ButtonTransparent,
    Icon,
    TextField,
    TemplatesSelectField,
} from '../../../components';
import type {
    ErrorObject,
    Genre,
    Template,
    FormFieldString,
    FormFieldChangeData,
} from '../../../types';
import './style.css';

type Props = {
    genres: Genre[],
    genresLoading: boolean,
    genresError?: ErrorObject,
    templates: Template[],
    templatesLoading: boolean,
    templatesError?: ErrorObject,
    genrePopularField: FormFieldString,
    genreOtherField: FormFieldString,
    formatField: FormFieldString,
    sizeField: FormFieldString,
    logoPositionField: FormFieldString,
    copyrightPositionField: FormFieldString,
    copyrightField: FormFieldString,
    templateField: FormFieldString,
    example: string,
    exampleLoading: boolean,
    exampleError?: ErrorObject,
    getGenres: () => *,
    getTemplates: (genre: string) => *,
    formFieldClear: (field: string) => *,
    getExample: (logo?: File, logoAlign: string, copyright?: string, copyrightAlign: string) => *,
};

type State = {
    isDragging: boolean,
    logo?: File,
};

export default class OrdersCreate extends React.Component<Props, State> {
    state = {
        isDragging: false,
        logo: undefined,
    };

    componentWillMount(): void {
        if (this.props.genres.length === 0) {
            this.props.getGenres();
        }
    }

    handlePopularGenreSelect = (data: FormFieldChangeData) => {
        this.props.getTemplates(String(data.value));
        this.props.formFieldClear(this.props.genreOtherField.id);
    };

    handleOtherGenreSelect = (data: FormFieldChangeData) => {
        this.props.getTemplates(String(data.value));
        this.props.formFieldClear(this.props.genrePopularField.id);
    };

    logoAdd = (files: FileList) => {
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
        ];
        const allowedFiles = [];
        for (let i = 0, l = files.length; i < l; i++) {
            const file = files[i];
            if (allowedTypes.includes(file.type)) {
                allowedFiles.push(file);
            }
        }

        this.setState({
            isDragging: false,
            logo: allowedFiles[0],
        });
    };

    logoRemove = () => {
        this.setState({
            logo: undefined,
        });
    };

    logoHandleDragEnter = () => this.setState({ isDragging: true });

    logoHandleDragLeave = () => this.setState({ isDragging: false });

    logoHandleDrop = (evt: SyntheticDragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        this.logoAdd(evt.dataTransfer.files);
    };

    logoHandleFileFieldChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
        this.logoAdd(evt.target.files);
    };

    getExample = () => {
        const {
            logoPositionField,
            copyrightField,
            copyrightPositionField,
        } = this.props;

        this.props.getExample(
            this.state.logo,
            logoPositionField.value,
            copyrightField.value,
            copyrightPositionField.value
        );
    };

    formats = [{
        id: 'jpeg',
        value: 'Orders.Format.jpeg',
        description: 'Orders.Format.jpeg-description',
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

    alignItems = [{
        id: 'left',
        value: 'left',
    }, {
        id: 'center',
        value: 'center',
    }, {
        id: 'right',
        value: 'right',
    }];

    render() {
        const {
            genres,
            templates,
            genresLoading,
            genresError,
            genrePopularField,
            genreOtherField,
            formatField,
            sizeField,
            logoPositionField,
            copyrightPositionField,
            copyrightField,
            templatesLoading,
            templatesError,
            templateField,
            example,
            exampleLoading,
            exampleError,
        } = this.props;
        const {
            logo,
            isDragging,
        } = this.state;

        const popularGenres = genres.slice(0, 3);
        const otherGenres = genres.slice(3);
        const exampleVideo = example && example.indexOf('video/mp4') !== -1;

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
                </h3>
                <p>
                    <FormattedMessage id="Orders.Size.Description" />
                </p>
                <RadioButtons
                    id={sizeField.id}
                    value={sizeField.value}
                    items={this.sizes}
                    translate={false}
                />
                <h3>
                    <FormattedMessage id="Orders.Templates.Title" />
                </h3>
                { templatesLoading && (
                    <Loading size="small" />
                ) }
                { templatesError && (
                    <div>
                        { templatesError.message }
                    </div>
                ) }
                { !templatesLoading && !templatesError && (
                    <TemplatesSelectField
                        id={templateField.id}
                        templates={templates}
                        format={formatField.value}
                        value={templateField.value}
                    />
                ) }
                <RadioButtons
                    id={logoPositionField.id}
                    value={logoPositionField.value}
                    items={this.alignItems}
                    label="Orders.Logo"
                />
                <ButtonTransparent
                    leftIcon="close"
                    onClick={this.logoRemove}
                />
                <label
                    className={classNames('order-logo-wrapper', isDragging && 'hover')}
                    onDragEnter={this.logoHandleDragEnter}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDrop={this.logoHandleDrop}
                    htmlFor="logo-field"
                >
                    <div>
                        <div className="">
                            <Icon
                                src="image"
                                className="order-logo-icon"
                            />
                        </div>
                        <p className="">
                            { logo
                                ? logo.name
                                : <FormattedMessage id="Orders.Logo.Text" />
                            }
                        </p>
                        <div
                            onDragLeave={this.logoHandleDragLeave}
                            className={classNames(isDragging && 'blocker')}
                        />
                        <input
                            name="logo-field"
                            id="logo-field"
                            onChange={this.logoHandleFileFieldChange}
                            type="file"
                            accept=".jpg,.jpeg,.png"
                        />
                    </div>
                </label>
                <RadioButtons
                    id={copyrightPositionField.id}
                    value={copyrightPositionField.value}
                    items={this.alignItems}
                    label="Orders.Copyright.Alignment"
                />
                <TextField
                    id={copyrightField.id}
                    value={copyrightField.value}
                    label="Orders.Copyright"
                    className=""
                />
                <ButtonBlue
                    text="Orders.Get.Example"
                    onClick={this.getExample}
                />
                <div>
                    { exampleLoading && <Loading size="small" /> }
                    { exampleError && (
                        <div>
                            { exampleError.message }
                        </div>
                    ) }
                    { !exampleError && example && !exampleVideo && (
                        <img src={example} alt="" />
                    ) }
                    { !exampleError && example && exampleVideo && (
                        <video autoPlay>
                            <source type="video/mp4" src={example} />
                        </video>
                    ) }
                </div>
            </div>
        );
    }
}
