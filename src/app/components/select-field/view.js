// @flow

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import type {
    FormSelectorFieldItem,
    FormFieldValue,
} from '../../types';
import type { FormReducerState } from '../../reducers/form';
import './style.css';

type Props = {
    form: FormReducerState,
    intl: Object,
    value?: FormFieldValue,
    items: FormSelectorFieldItem[],
    className?: string | { [className: string]: * },
    itemClassName?: string,
    id: string,
    label?: string,
    required?: boolean,
    onChange?: (data: Object) => *,
    valueChange: (field: string, value: FormFieldValue) => *,
    clear: (field: string) => *,
};

type State = {
    items: FormSelectorFieldItem[],
};

export default class SelectField extends React.Component<Props, State> {
    state = {
        items: [],
    };

    shouldComponentUpdate = (nextProps: Props) => (
        nextProps.value !== this.props.value
        || nextProps.items !== this.props.items
        || nextProps.form[nextProps.id] !== this.props.form[this.props.id]
    );

    componentWillMount(): void {
        this.setState({
            items: this.props.items.map(item => ({
                value: item.value,
                label: this.props.intl.formatMessage({ id: item.label }),
            })),
        });
    }

    componentWillUnmount() {
        this.props.clear(this.props.id);
    }

    onChangeHandler = (data: Object) => {
        const {
            id,
            valueChange,
            onChange,
        } = this.props;

        valueChange(id, data.value);
        if (onChange && onChange instanceof Function) {
            onChange({
                id,
                value: data.value,
            });
        }
    };

    render() {
        const {
            value,
            className,
            itemClassName,
            label,
            required,
        } = this.props;
        const { items } = this.state;

        const selectedItem = items.find(item => item.value === value);

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
                <div className="select-field-container">
                    <Select
                        value={selectedItem || null}
                        onChange={this.onChangeHandler}
                        options={items}
                        classNamePrefix={itemClassName}
                    />
                </div>
            </div>
        );
    }
}
