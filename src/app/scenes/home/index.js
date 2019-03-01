// @flow

import { connect } from 'react-redux';
import type { StoreState } from '../../reducers';
import { profileActions } from '../../actions';
import { profileSelectors } from '../../selectors';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    user: profileSelectors.getUser(state),
});

const mapDispatchToProps = ({
    logOut: profileActions.clearToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
