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
    loading: state.profile.registrationLoading,
    error: state.profile.registrationError,
    token: profileSelectors.getToken(state),
    nameField: formSelectors.getFieldString(state, 'name'),
    emailField: formSelectors.getFieldString(state, 'email'),
    passwordField: formSelectors.getFieldString(state, 'password'),
});

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
    registration: bindActionCreators(profileActions.registration, dispatch),
    setToken: bindActionCreators(profileActions.setToken, dispatch),
    goToHomePage: () => {
        history.push(routerConstants.HOME);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
