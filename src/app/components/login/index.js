// @flow

import { bindActionCreators } from 'redux';
import type { DispatchAPI } from 'redux';
import { connect } from 'react-redux';
import { profileActions } from '../../actions';
import {
    formSelectors,
    profileSelectors,
} from '../../selectors';
import type { StoreState } from '../../reducers';
import { history } from '../../store';
import { routerConstants } from '../../constants';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    loading: state.profile.loginLoading,
    error: state.profile.loginError,
    token: profileSelectors.getToken(state),
    emailField: formSelectors.getFieldString(state, 'email'),
    passwordField: formSelectors.getFieldString(state, 'password'),
});

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
    login: bindActionCreators(profileActions.login, dispatch),
    setToken: bindActionCreators(profileActions.setToken, dispatch),
    goToRegistration: () => {
        history.push(routerConstants.REGISTRATION);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
