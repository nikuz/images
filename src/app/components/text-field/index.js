// @flow

import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { formActions } from '../../actions';
import type { StoreState } from '../../reducers';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    form: state.form,
});

const mapDispatchToProps = {
    focus: formActions.fieldFocus,
    blur: formActions.fieldBlur,
    passwordVisibilityToggle: formActions.passwordVisibilityToggle,
    valueChange: formActions.fieldValueChange,
    clear: formActions.fieldClear,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    injectIntl
)(View);
