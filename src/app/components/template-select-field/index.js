// @flow

import { connect } from 'react-redux';
import { formActions } from '../../actions';
import { routerSelectors } from '../../selectors';
import type { StoreState } from '../../reducers';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    form: state.form,
    apiUrl: routerSelectors.getApiUrl(),
});

const mapDispatchToProps = {
    valueChange: formActions.fieldValueChange,
    clear: formActions.fieldClear,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
