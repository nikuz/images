// @flow

import * as React from 'react';
import classNames from 'classnames';
import Button, { ButtonOrange } from '../button';
import type { FormFieldValue } from '../../types';
import './style.css';

type Props = {
    id: string,
    value: FormFieldValue,
    selected: ?boolean,
    className?: string | { [className: string]: * },
    onChange: (value: FormFieldValue) => *,
};

export default class RadioButtonItem extends React.PureComponent<Props, void> {
    onChangeHandler = () => {
        this.props.onChange(this.props.id);
    };

    render() {
        const {
            selected,
            value,
        } = this.props;
        let { className } = this.props;
        let ButtonComponent = Button;
        if (selected) {
            ButtonComponent = ButtonOrange;
        }

        className = classNames(
            'radio-button',
            className,
            selected && 'radio-button-selected'
        );

        return (
            <ButtonComponent
                className={className}
                onClick={this.onChangeHandler}
            >
                { value }
            </ButtonComponent>
        );
    }
}
