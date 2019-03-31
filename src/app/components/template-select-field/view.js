// @flow

import * as React from 'react';
import TemplateSelectItem from './view-item';
import type {
    Template,
    FormFieldValue,
} from '../../types';
import type { FormReducerState } from '../../reducers/form';
import './style.css';

type Props = {
    form: FormReducerState,
    templates: Template[],
    format: string,
    value?: FormFieldValue,
    className?: string | { [className: string]: * },
    itemClassName?: string,
    id: string,
    apiUrl: string,
    onChange?: (data: Object) => *,
    valueChange: (field: string, value: FormFieldValue) => *,
    clear: (field: string) => *,
};

export default class TemplateSelect extends React.Component<Props> {
    shouldComponentUpdate = (nextProps: Props) => (
        nextProps.value !== this.props.value
        || nextProps.templates !== this.props.templates
        || nextProps.format !== this.props.format
        || nextProps.form[nextProps.id] !== this.props.form[this.props.id]
    );

    componentWillUnmount() {
        this.props.clear(this.props.id);
    }

    onChangeHandler = (value: string) => {
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
            templates,
            format,
            value,
            apiUrl,
            className,
            itemClassName,
        } = this.props;

        const selectedItem = templates.find(item => item.id === value);

        return (
            <div className={className}>
                <div className="templates-selector-field-container">
                    {templates.filter(item => item.format === format).map((item) => {
                        const url = `${apiUrl}${item.image}`;
                        return (
                            <TemplateSelectItem
                                key={item.id}
                                id={item.id}
                                url={url}
                                selected={selectedItem && item.id === selectedItem.id}
                                format={item.format}
                                className={itemClassName}
                                onChange={this.onChangeHandler}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
