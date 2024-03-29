// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import RadioButtonItem from './view-item';
import type {
    FormRadioFieldItem,
    FormFieldValue,
} from '../../types';
import type { FormReducerState } from '../../reducers/form';
import './style.css';

type Props = {
    form: FormReducerState,
    value?: FormFieldValue,
    items: FormRadioFieldItem[],
    className?: string | { [className: string]: * },
    itemClassName?: string | { [className: string]: * },
    id: string,
    label?: string,
    required?: boolean,
    translate?: boolean,
    onChange?: (data: Object) => *,
    valueChange: (field: string, value: FormFieldValue) => *,
    clear: (field: string) => *,
};

export default class RadioButtons extends React.Component<Props, void> {
    shouldComponentUpdate = (nextProps: Props) => (
        nextProps.value !== this.props.value
        || nextProps.items !== this.props.items
        || nextProps.form[nextProps.id] !== this.props.form[this.props.id]
    );

    componentWillUnmount() {
        this.props.clear(this.props.id);
    }

    onChangeHandler = (value: FormFieldValue) => {
        const {
            id,
            valueChange,
            onChange,
        } = this.props;

        valueChange(id, value);
        if (onChange && onChange instanceof Function) {
            onChange({
                id,
                value,
            });
        }
    };

    render() {
        const {
            id,
            items,
            value,
            className,
            itemClassName,
            label,
            required,
            translate,
        } = this.props;

        return (
            <div className={className}>
                { label && (
                    <div className="text-field-label">
                        <FormattedMessage id={label} />
                        { required && (
                            <span className="field-required-marker"> *</span>
                        ) }
                    </div>
                ) }
                <div className="radio-buttons">
                    {items.map(item => (
                        <RadioButtonItem
                            key={item.id}
                            group={id}
                            id={item.id}
                            value={item.value}
                            description={item.description}
                            translate={translate}
                            selected={item.id === value}
                            className={itemClassName}
                            onChange={this.onChangeHandler}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
