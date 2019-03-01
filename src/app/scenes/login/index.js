// @flow

import { bindActionCreators } from 'redux';
import type { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import { profileActions } from '../../actions';
import type { StoreState } from '../../reducers';
import { history } from '../../store';
import { routerConstants } from '../../constants';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    loading: state.profile.loginLoading,
    error: state.profile.loginError,
    token: state.profile.token,
});

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
    login: bindActionCreators(profileActions.login, dispatch),
    setToken: bindActionCreators(profileActions.setToken, dispatch),
    goToHomePage: () => {
        history.push(routerConstants.HOME);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
