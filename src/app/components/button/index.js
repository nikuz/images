// @flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style.css';

type Props = {
    text?: string,
    onClick?: (any) => *,
    className?: string | { [className: string]: * },
    selected?: boolean,
    disabled?: boolean,
    children?: React.Node,
    type?: string,
    leftIcon?: string,
    leftIconClassName?: string | { [className: string]: * },
    rightIcon?: string,
    rightIconClassName?: string | { [className: string]: * },
    size?: string,
};

export default class Button extends React.PureComponent<Props> {
    buttonElement: ?HTMLElement;

    static defaultProps = {
        selected: false,
        disabled: false,
    };

    clickHandler = (e: Event) => {
        const el = this.buttonElement;
        if (el && !el.hasAttribute('disabled') && this.props.onClick instanceof Function) {
            this.props.onClick(e);
        }
    };

    render() {
        let {
            text,
            leftIconClassName,
            rightIconClassName,
            className,
        } = this.props;
        const {
            children,
            type,
            size,
            selected,
            disabled,
            leftIcon,
            rightIcon,
            onClick,
        } = this.props;

        if (children !== undefined) {
            text = children;
        }

        className = classNames(
            'button',
            type,
            size,
            selected && 'selected',
            disabled && 'disabled',
            leftIcon && !rightIcon && 'round',
            className
        );
        leftIconClassName = classNames(
            'button-icon-left',
            leftIconClassName,
            (text === '' && !rightIcon) && 'no-margin'
        );
        rightIconClassName = classNames(
            'button-icon-right',
            rightIconClassName
        );

        const cont = [
            leftIcon && (
                <Icon key="left-icon" src={leftIcon} className={leftIconClassName} />
            ),
            text,
            rightIcon && (
                <Icon key="right-icon" src={rightIcon} className={rightIconClassName} />
            ),
        ];

        const key = typeof text === 'string' ? text : '';

        if (!disabled && onClick) {
            return (
                <div
                    ref={el => this.buttonElement = el}
                    onClick={this.clickHandler}
                    className={className}
                >
                    { cont }
                </div>
            );
        }

        return (
            <div key={key} className={className}>
                { cont }
            </div>
        );
    }
}

export const ButtonRed = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'red',
    };

    return <Button {...extendedProps} />;
};

export const ButtonBlue = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'blue',
    };

    return <Button {...extendedProps} />;
};

export const ButtonBlueWhiteBorder = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'blue-with-white-border',
    };

    return <Button {...extendedProps} />;
};

export const ButtonGreen = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'green',
    };

    return <Button {...extendedProps} />;
};

export const ButtonOrange = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'orange',
    };

    return <Button {...extendedProps} />;
};

export const ButtonGray = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'gray',
    };

    return <Button {...extendedProps} />;
};

export const ButtonTransparent = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'transparent',
    };

    return <Button {...extendedProps} />;
};
