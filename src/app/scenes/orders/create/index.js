// @flow

// import { bindActionCreators } from 'redux';
// import { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import type { StoreState } from '../../../reducers';
import { orderActions } from '../../../actions';
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
    genreField: formSelectors.getFieldString(state, 'genre'),
});

const mapDispatchToProps = ({
    getGenres: orderActions.getGenres,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
