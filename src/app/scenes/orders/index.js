// @flow

// import { bindActionCreators } from 'redux';
// import type { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import type { StoreState } from '../../reducers';
import { history } from '../../store';
import {
    profileSelectors,
    routerSelectors,
} from '../../selectors';
import { routerConstants } from '../../constants';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    user: profileSelectors.getUser(state),
    isOnOrders: routerSelectors.isOnOrders(state),
});

// const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
const mapDispatchToProps = () => ({
    goToHomePage: () => {
        history.push(routerConstants.HOME);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
