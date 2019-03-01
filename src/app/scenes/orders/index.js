// @flow

// import { bindActionCreators } from 'redux';
// import type { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import type { StoreState } from '../../reducers';
import { history } from '../../store';
import { routerSelectors } from '../../selectors';
import { routerConstants } from '../../constants';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    user: state.profile.user,
    isOnOrders: routerSelectors.isOnOrders(state),
});

// const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
const mapDispatchToProps = () => ({
    goToHomePage: () => {
        history.push(routerConstants.HOME);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
