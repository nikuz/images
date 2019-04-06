// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import {
    BackButton,
    Loading,
    RadioButtons,
    SelectField,
    ButtonBlue,
    ButtonGreen,
    ButtonTransparent,
    Icon,
    TextField,
    TemplatesSelectField,
    Overlay,
    OverlayLoading,
    Login,
    Registration,
} from '../../components';
import { commonUtils } from '../../utils';
import type {
    User,
    ErrorObject,
    Genre,
    Template,
    FormFieldString,
    FormFieldNumber,
    FormFieldChangeData,
    PackSize,
    Order,
} from '../../types';
import PaymentOverlay from './payment';
import './style.css';

type Props = {
    user: User,
    genres: Genre[],
    genresLoading: boolean,
    genresError?: ErrorObject,
    templates: Template[],
    templatesLoading: boolean,
    templatesError?: ErrorObject,
    packSizes: PackSize[],
    packSizesLoading: boolean,
    packSizesError?: ErrorObject,
    genrePopularField: FormFieldString,
    genreOtherField: FormFieldString,
    formatField: FormFieldString,
    sizeField: FormFieldString,
    logoPositionField: FormFieldString,
    copyrightPositionField: FormFieldString,
    copyrightField: FormFieldString,
    templatesField: FormFieldString,
    packSizeField: FormFieldNumber,
    example: string,
    exampleLoading: boolean,
    exampleError?: ErrorObject,
    registrationOverlayShown: boolean,
    loginOverlayShown: boolean,
    createLoading: boolean,
    createError?: ErrorObject,
    order?: Order,
    paymentOverlayShown: boolean,
    getGenres: () => *,
    getTemplates: (genre: string) => *,
    getPackSizes: () => *,
    formFieldClear: (field: string) => *,
    getExample: (data: Object) => *,
    showRegistrationOverlay: () => *,
    showLoginOverlay: () => *,
    hideLoginOverlays: () => *,
    clearOrderState: () => *,
    createOrder: (data: Object) => *,
    showPaymentOverlay: () => *,
};

type State = {
    isDragging: boolean,
    logo?: File,
};

export default class OrderCreate extends React.Component<Props, State> {
    state = {
        isDragging: false,
        logo: undefined,
    };

    componentWillMount(): void {
        if (this.props.genres.length === 0) {
            this.props.getGenres();
        }
        if (this.props.packSizes.length === 0) {
            this.props.getPackSizes();
        }
    }

    componentDidUpdate(prevProps: Props): void {
        if (!prevProps.user && this.props.user) {
            this.props.hideLoginOverlays();
            this.submitHandler();
        }
        if (!prevProps.order && this.props.order) {
            this.props.showPaymentOverlay();
        }
    }

    componentWillUnmount(): void {
        this.props.clearOrderState();
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
            genres,
            genrePopularField,
            genreOtherField,
            logoPositionField,
            copyrightField,
            copyrightPositionField,
            templatesField,
        } = this.props;
        const selectedGenre = genres.find(item => (
            item.id === genrePopularField.value
            || item.id === genreOtherField.value
        ));

        this.props.getExample({
            logo: this.state.logo,
            logoAlign: logoPositionField.value,
            copyright: copyrightField.value,
            copyrightAlign: copyrightPositionField.value,
            templates: templatesField.value,
            genre: selectedGenre && selectedGenre.id,
        });
    };

    submitHandler = () => {
        const { user } = this.props;
        if (!user) {
            this.props.showRegistrationOverlay();
            return;
        }

        const {
            genres,
            genrePopularField,
            genreOtherField,
            formatField,
            sizeField,
            logoPositionField,
            copyrightField,
            copyrightPositionField,
            templatesField,
            packSizeField,
        } = this.props;

        const selectedGenre = genres.find(item => (
            item.id === genrePopularField.value
            || item.id === genreOtherField.value
        ));

        this.props.createOrder({
            templates: templatesField.value,
            genre: selectedGenre && selectedGenre.id,
            format: formatField.value,
            crop: commonUtils.getCropSize(sizeField.value),
            logoAlign: logoPositionField.value,
            copyright: copyrightField.value,
            copyrightAlign: copyrightPositionField.value,
            packsize: packSizeField.value,
        });
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
            packSizes,
            genresLoading,
            genresError,
            genrePopularField,
            genreOtherField,
            formatField,
            sizeField,
            logoPositionField,
            copyrightPositionField,
            copyrightField,
            packSizeField,
            packSizesLoading,
            packSizesError,
            templatesLoading,
            templatesError,
            templatesField,
            example,
            exampleLoading,
            exampleError,
            registrationOverlayShown,
            loginOverlayShown,
            createLoading,
            createError,
            paymentOverlayShown,
        } = this.props;
        const {
            logo,
            isDragging,
        } = this.state;

        const popularGenres = genres.slice(0, 3);
        const otherGenres = genres.slice(3);
        const exampleVideo = example && example.indexOf('video/mp4') !== -1;
        const genreSelected = genrePopularField.value || genreOtherField.value;

        if (genresLoading || packSizesLoading) {
            return <Loading size="small" />;
        }

        if (genresError || packSizesError) {
            return (
                <div>
                    {
                        (genresError && genresError.message)
                        || (packSizesError && packSizesError.message)
                    }
                </div>
            );
        }

        return (
            <div>
                <BackButton
                    text="Orders.Back"
                />
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
                { genreSelected && !templatesLoading && !templatesError && (
                    <TemplatesSelectField
                        id={templatesField.id}
                        templates={templates}
                        format={formatField.value}
                        crop={commonUtils.getCropSize(sizeField.value)}
                        value={templatesField.value}
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
                    text="Orders.Example-Get"
                    disabled={
                        !genreSelected
                        || !templates.length
                        || !templatesField.value.length
                    }
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
                <RadioButtons
                    id={packSizeField.id}
                    value={packSizeField.value}
                    items={packSizes.map(item => ({
                        id: item.id,
                        value: (
                            <span>
                                $
                                {item.price}
                            </span>
                        ),
                        description: (
                            <span>
                                {item.discount}
                                %
                                &nbsp;
                                <FormattedMessage id="Orders.Discount" />
                            </span>
                        ),
                    }))}
                    label="Orders.Pack-Size"
                />
                <ButtonGreen
                    text="Orders.Submit"
                    disabled={
                        !genreSelected
                        || !templates.length
                        || !templatesField.value.length
                        || !sizeField.value
                        || !packSizeField.value
                    }
                    onClick={this.submitHandler}
                />
                { loginOverlayShown && (
                    <Overlay onClick={this.props.hideLoginOverlays}>
                        <Login
                            overlayMode
                            onGoToRegistration={this.props.showRegistrationOverlay}
                        />
                    </Overlay>
                ) }
                { registrationOverlayShown && (
                    <Overlay onClick={this.props.hideLoginOverlays}>
                        <Registration
                            overlayMode
                            onGoToLogin={this.props.showLoginOverlay}
                        />
                    </Overlay>
                ) }
                { createLoading && (
                    <OverlayLoading />
                ) }
                { createError && (
                    <div>
                        { createError.message }
                    </div>
                ) }
                { paymentOverlayShown && (
                    <PaymentOverlay />
                ) }
            </div>
        );
    }
}
