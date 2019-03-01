// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { ButtonTransparent } from '../button';
import { history } from '../../store';
import './style.css';

type Props = {
    text?: string,
    targetLocation?: string,
    position?: string,
    className?: string | { [className: string]: * },
    variables?: Object,
};

class BackButton extends React.Component<Props, void> {
    shouldComponentUpdate = () => false;

    clickHandler = () => {
        const { targetLocation } = this.props;

        if (targetLocation) {
            history.push(targetLocation);
        } else {
            history.goBack();
        }
    };

    render() {
        const {
            text,
            position,
        } = this.props;
        let {
            className,
            variables,
        } = this.props;
        className = classNames(
            className,
            position
        );
        variables = variables || {};

        return (
            <div id="navigator-back-container" className={className}>
                <ButtonTransparent
                    leftIcon="back"
                    className="navigator-back-button"
                    onClick={this.clickHandler}
                />
                { text && (
                    <h1 id="navigator-back-title">
                        <FormattedMessage id={text} values={variables} />
                    </h1>
                ) }
            </div>
        );
    }
}

export default BackButton;
