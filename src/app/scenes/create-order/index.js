// @flow

// import { bindActionCreators } from 'redux';
// import { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import type { StoreState } from '../../reducers';
import {
    formActions,
    orderActions,
} from '../../actions';
import {
    orderSelectors,
    formSelectors,
} from '../../selectors';
// import { history } from '../../../store';
// import { routerConstants } from '../../../constants';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
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
});

const mapDispatchToProps = ({
    getGenres: orderActions.getGenres,
    getTemplates: orderActions.getTemplates,
    getPackSizes: orderActions.getPackSizes,
    formFieldClear: formActions.fieldClear,
    getExample: orderActions.getExample,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
