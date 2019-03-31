// @flow

// import { bindActionCreators } from 'redux';
// import { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import type { StoreState } from '../../../reducers';
import {
    formActions,
    orderActions,
} from '../../../actions';
import {
    orderSelectors,
    formSelectors,
} from '../../../selectors';
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
    genrePopularField: formSelectors.getFieldString(state, 'genre-popular'),
    genreOtherField: formSelectors.getFieldString(state, 'genre-others'),
    formatField: formSelectors.getFieldString(state, 'format', 'jpeg'),
    sizeField: formSelectors.getFieldString(state, 'size'),
    logoPositionField: formSelectors.getFieldString(state, 'logo-position', 'left'),
    copyrightPositionField: formSelectors.getFieldString(state, 'copyright-position', 'left'),
    copyrightField: formSelectors.getFieldString(state, 'copyright'),
    templateField: formSelectors.getFieldString(state, 'template'),
    example: state.order.example,
    exampleLoading: state.order.exampleLoading,
    exampleError: state.order.exampleError,
});

const mapDispatchToProps = ({
    getGenres: orderActions.getGenres,
    getTemplates: orderActions.getTemplates,
    formFieldClear: formActions.fieldClear,
    getExample: orderActions.getExample,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
