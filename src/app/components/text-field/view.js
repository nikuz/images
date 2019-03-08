// @flow

import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ButtonTransparent } from '../button';
import type { FormReducerState } from '../../reducers/form';
import './style.css';

type Props = {
    form: FormReducerState,
    type?: string,
    value?: string | number,
    min: number,
    max: number,
    className?: string | { [className: string]: * },
    label?: string,
    placeholder?: string,
    fieldClassName?: string,
    id: string,
    disabled?: boolean,
    required?: boolean,
    maxLength?: number,
    passwordVisible?: boolean,
    intl: Object,
    autoFocus?: boolean,
    onChange?: (e: Event) => *,
    onFocus?: (e: Event) => *,
    onBlur?: (e: Event) => *,
    focus: (id: string, value?: string | number) => *,
    blur: (field: string) => *,
    passwordVisibilityToggle: (field: string, value?: string | number) => *,
    valueChange: (field: string, value: string) => *,
    clear: (field: string) => *,
};

class TextField extends React.Component<Props> {
    static defaultProps = {
        type: 'text',
        passwordVisible: false,
        autoFocus: false,
    };

    shouldComponentUpdate = (nextProps: Props) => (
        nextProps.value !== this.props.value
        || nextProps.form[nextProps.id] !== this.props.form[this.props.id]
    );

    componentWillUnmount() {
        this.props.clear(this.props.id);
    }

    passwordVisibilityToggle = () => {
        this.props.passwordVisibilityToggle(this.props.id, this.props.value);
        this.props.focus(this.props.id, this.props.value);
    };

    onFocusHandler = (e: Event) => {
        const {
            id,
            value,
            onFocus,
        } = this.props;

        this.props.focus(id, value);

        if (onFocus && onFocus instanceof Function) {
            onFocus(e);
        }
    };

    onBlurHandler = (e: Event) => {
        const {
            id,
            onBlur,
            type,
            min,
            max,
        } = this.props;
        let { value } = this.props;

        if (type === 'number' && (min || max)) {
            if (min && Number(value) < min) {
                value = min;
            } else if (max && Number(value) > max) {
                value = max;
            }
            this.onChangeHandler({
                target: { value },
            });
        }

        this.props.blur(id);
        if (onBlur && onBlur instanceof Function) {
            onBlur(e);
        }
    };

    onChangeHandler = (e: Object) => {
        const {
            onChange,
            id,
            type,
            valueChange,
        } = this.props;
        let value = e.target.value;
        if (type === 'text' && typeof value === 'string') {
            value = value
                .split(' ')
                .map(item => (
                    item.substr(0, 1).toUpperCase() + item.substr(1, item.length - 1)
                ))
                .join(' ');
        }

        valueChange(id, value);
        if (onChange && onChange instanceof Function) {
            onChange({ id, value });
        }
    };

    render() {
        const {
            id,
            value,
            label,
            disabled,
            required,
            autoFocus,
            type,
            maxLength,
            passwordVisible,
            intl,
        } = this.props;
        let {
            placeholder,
            fieldClassName,
        } = this.props;
        fieldClassName = classNames(
            'text-field',
            type === 'password' && 'tf-password',
            fieldClassName
        );
        const fieldWrapperClassName = classNames(
            'tf-wrapper',
            type === 'password' && 'relative'
        );
        if (placeholder) {
            placeholder = intl.formatMessage({ id: placeholder });
        }

        const passwordVisibilityBtn = type === 'password' && (
            <ButtonTransparent
                leftIcon={passwordVisible ? 'password-eye' : 'password-eye-closed'}
                className="tf-password-visibility-switcher"
                leftIconClassName="tfpvs-icon"
                onClick={this.passwordVisibilityToggle}
            />
        );

        return (
            <div className={this.props.className}>
                <div className={fieldWrapperClassName}>
                    { label && (
                        <div className="text-field-label">
                            <FormattedMessage id={label} />
                            { required && (
                                <span className="field-required-marker"> *</span>
                            ) }
                        </div>
                    ) }
                    <input
                        type={passwordVisible ? 'text' : (type || 'text')}
                        id={id}
                        value={value}
                        className={fieldClassName}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        autoComplete="new-password"
                        placeholder={placeholder}
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        onChange={this.onChangeHandler}
                    />
                    { passwordVisibilityBtn }
                </div>
            </div>
        );
    }
}

export default TextField;
