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
    genrePopularField: formSelectors.getFieldString(state, 'genre-popular'),
    genreOtherField: formSelectors.getFieldString(state, 'genre-others'),
    formatField: formSelectors.getFieldString(state, 'format'),
    sizeField: formSelectors.getFieldString(state, 'size'),
});

const mapDispatchToProps = ({
    getGenres: orderActions.getGenres,
    formFieldClear: formActions.fieldClear,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
