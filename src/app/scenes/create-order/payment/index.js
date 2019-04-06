// @flow

import { connect } from 'react-redux';
import type { StoreState } from '../../../reducers';
import { orderActions } from '../../../actions';
import { profileSelectors } from '../../../selectors';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    user: profileSelectors.getUser(state),
    order: state.order.order,
});

const mapDispatchToProps = ({
    close: orderActions.hidePaymentOverlay,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
