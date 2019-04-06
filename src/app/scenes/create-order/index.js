// @flow

import { connect } from 'react-redux';
import type { StoreState } from '../../reducers';
import {
    formActions,
    orderActions,
} from '../../actions';
import {
    orderSelectors,
    formSelectors,
    profileSelectors,
} from '../../selectors';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    user: profileSelectors.getUser(state),
    genres: orderSelectors.getGenres(state),
    genresLoading: state.order.genresLoading,
    genresError: state.order.genresError,
    templates: orderSelectors.getTemplates(state),
    templatesLoading: state.order.templatesLoading,
    templatesError: state.order.templatesError,
    packSizes: orderSelectors.getPackSizes(state),
    packSizesLoading: state.order.packSizesLoading,
    packSizesError: state.order.packSizesError,
    genrePopularField: formSelectors.getFieldString(state, 'genre-popular'),
    genreOtherField: formSelectors.getFieldString(state, 'genre-others'),
    formatField: formSelectors.getFieldString(state, 'format', 'jpeg'),
    sizeField: formSelectors.getFieldString(state, 'size', 'instagram'),
    logoPositionField: formSelectors.getFieldString(state, 'logo-position', 'left'),
    copyrightPositionField: formSelectors.getFieldString(state, 'copyright-position', 'left'),
    copyrightField: formSelectors.getFieldString(state, 'copyright'),
    templatesField: formSelectors.getFieldArrayString(state, 'templates'),
    packSizeField: formSelectors.getFieldNumber(state, 'pack-size'),
    example: state.order.example,
    exampleLoading: state.order.exampleLoading,
    exampleError: state.order.exampleError,
    registrationOverlayShown: state.order.registrationOverlayShown,
    loginOverlayShown: state.order.loginOverlayShown,
    createLoading: state.order.createLoading,
    createError: state.order.createError,
    order: state.order.order,
    paymentOverlayShown: state.order.paymentOverlayShown,
});

const mapDispatchToProps = ({
    getGenres: orderActions.getGenres,
    getTemplates: orderActions.getTemplates,
    getPackSizes: orderActions.getPackSizes,
    formFieldClear: formActions.fieldClear,
    getExample: orderActions.getExample,
    showRegistrationOverlay: orderActions.showRegistrationOverlay,
    showLoginOverlay: orderActions.showLoginOverlay,
    hideLoginOverlays: orderActions.hideLoginOverlays,
    clearOrderState: orderActions.clearOrderState,
    createOrder: orderActions.createOrder,
    showPaymentOverlay: orderActions.showPaymentOverlay,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
