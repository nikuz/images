// @flow

import { connect } from 'react-redux';
import type { StoreState } from '../../reducers';
import { profileActions } from '../../actions';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    user: state.profile.user,
});

const mapDispatchToProps = ({
    logOut: profileActions.clearToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
