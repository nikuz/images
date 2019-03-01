// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Loading from '../loading';
import {
    ButtonGray,
    ButtonOrange,
    ButtonBlue,
    ButtonTransparent,
} from '../button';
import './style.css';

type Props = {
    className?: string | { [className: string]: * },
    contentClassName?: string | { [className: string]: * },
    blockerClassName?: string | { [className: string]: * },
    message?: string,
    children: React.Node,
    autoHideTime?: number,
    withCloseButton?: boolean,
    autoHideCallback?: () => *,
    onClick?: () => *,
    onClose?: () => *,
    onCancelClick?: () => *,
};

export default class Overlay extends React.PureComponent<Props> {
    static defaultProps = {
        withCloseButton: false,
    };

    timer: TimeoutID;

    componentDidMount() {
        const {
            autoHideTime,
            autoHideCallback,
        } = this.props;

        if (autoHideTime && autoHideCallback) {
            this.timer = setTimeout(autoHideCallback, autoHideTime);
        }
    }

    containerClickHandler = () => {
        const {
            onClick,
            onCancelClick,
            autoHideCallback,
        } = this.props;
        const clickHandler = onClick || autoHideCallback || onCancelClick;

        if (clickHandler instanceof Function) {
            clickHandler();
        }
    };

    componentWillUnmount() {
        const { onClose } = this.props;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (onClose instanceof Function) {
            onClose();
        }
    }

    render() {
        const body = document.body;
        if (!body) {
            return null;
        }
        const { children } = this.props;
        const { withCloseButton } = this.props;
        let {
            className,
            contentClassName,
            blockerClassName,
            message,
        } = this.props;

        className = classNames(
            'overlay',
            className
        );
        contentClassName = classNames(
            'overlay-content',
            withCloseButton && 'relative',
            contentClassName
        );
        blockerClassName = classNames(
            'blocker',
            blockerClassName
        );
        if (children) {
            message = children;
        }

        return ReactDOM.createPortal(
            (
                <div className="overlay-container">
                    <div className={className}>
                        <div onClick={this.containerClickHandler}>
                            <div className={blockerClassName} />
                        </div>
                        <div className={contentClassName}>
                            { withCloseButton && (
                                <ButtonTransparent
                                    className="overlay-close-button"
                                    leftIcon="close"
                                    onClick={this.containerClickHandler}
                                />
                            ) }
                            { message }
                        </div>
                    </div>
                </div>
            ),
            body
        );
    }
}

export const OverlayMessage = (props: Object) => (
    <Overlay className="overlay-message" contentClassName="overlay-message-content" {...props} />
);

export const OverlayError = (props: Object) => {
    const { children } = props;
    let { message } = props;
    if (children) {
        message = children;
    }
    return (
        <Overlay className="overlay-error" contentClassName="overlay-error-content" {...props}>
            <div>
                <Icon src="error" className="overlay-error-icon" />
                <p className="overlay-error-text">
                    { message }
                </p>
                <ButtonOrange
                    text="Overlay.Button.Ok"
                    className="overlay-error-btn"
                    onClick={props.onClick || props.autoHideCallback}
                />
            </div>
        </Overlay>
    );
};

export const OverlayLoading = (props: Object) => (
    <Overlay className="overlay-loading" contentClassName="overlay-loading-content" {...props}>
        <Loading size="big" />
    </Overlay>
);

export const OverlayConfirm = (props: Object) => {
    let OkButton = ButtonGray;
    let CancelButton = ButtonBlue;
    if (props.yesAccent) {
        OkButton = ButtonOrange;
        CancelButton = ButtonGray;
    }
    return (
        <Overlay className="overlay-confirm" contentClassName="overlay-confirm-content" {...props}>
            <p className="overlay-confirm-text">
                {props.message}
            </p>
            <div className="overlay-confirm-buttons">
                <CancelButton
                    text={props.cancelText}
                    className="overlay-confirm-btn"
                    onClick={props.onCancelClick}
                />
                <OkButton
                    text={props.acceptText}
                    className="overlay-confirm-btn"
                    onClick={props.onAcceptClick}
                />
            </div>
        </Overlay>
    );
};
