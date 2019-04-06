// @flow

import { connect } from 'react-redux';
import { profileSelectors } from '../../selectors';
import type { StoreState } from '../../reducers';
import { history } from '../../store';
import { routerConstants } from '../../constants';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    token: profileSelectors.getToken(state),
});

const mapDispatchToProps = () => ({
    goToHomePage: () => {
        history.push(routerConstants.HOME);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
