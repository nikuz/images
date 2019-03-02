// @flow

import { connect } from 'react-redux';
import { formActions } from '../../actions';
import type { StoreState } from '../../reducers';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    form: state.form,
});

const mapDispatchToProps = {
    valueChange: formActions.fieldValueChange,
    clear: formActions.fieldClear,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
