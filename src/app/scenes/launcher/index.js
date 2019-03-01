// @flow

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    languageActions,
    profileActions,
} from '../../actions';
import type { StoreState } from '../../reducers';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    languageDictionaries: state.language.dictionaries,
    curLanguage: state.language.current,
    profileToken: state.profile.token,
    user: state.profile.user,
    profileGetUserLoading: state.profile.getUserLoading,
    profileGetUserError: state.profile.getUserError,
});

const mapDispatchToProps = ({
    getTranslations: languageActions.getTranslations,
    getProfileToken: profileActions.getToken,
    getUser: profileActions.getUser,
    clearToken: profileActions.clearToken,
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(View));
