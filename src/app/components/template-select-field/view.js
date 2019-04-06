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
    crop: string,
    value: FormFieldValue[],
    className?: string | { [className: string]: * },
    itemClassName?: string,
    id: string,
    apiUrl: string,
    onChange?: (data: Object) => *,
    valueChange: (field: string, value: FormFieldValue[]) => *,
    clear: (field: string) => *,
};

export default class TemplateSelect extends React.Component<Props> {
    shouldComponentUpdate = (nextProps: Props) => (
        nextProps.value !== this.props.value
        || nextProps.templates !== this.props.templates
        || nextProps.format !== this.props.format
        || nextProps.crop !== this.props.crop
        || nextProps.form[nextProps.id] !== this.props.form[this.props.id]
    );

    componentWillReceiveProps(nextProps: Props): void {
        const {
            id,
            crop,
            value,
            valueChange,
        } = this.props;

        if (crop !== nextProps.crop && value.length !== 0) {
            valueChange(id, []);
        }
    }

    componentWillUnmount() {
        this.props.clear(this.props.id);
    }

    onChangeHandler = (data: string) => {
        const {
            id,
            valueChange,
            onChange,
        } = this.props;
        const value = this.props.value.slice(0);

        const added = value.findIndex(item => item === data);
        if (added !== -1) {
            value.splice(added, 1);
        } else {
            value.push(data);
        }

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
            crop,
            value,
            apiUrl,
            className,
            itemClassName,
        } = this.props;

        const filteredTemplates = templates.filter(item => (
            item.format === format
            && item.crop === crop
        ));

        return (
            <div className={className}>
                <div className="templates-selector-field-container">
                    {filteredTemplates.map((item) => {
                        const url = `${apiUrl}${item.image}`;
                        return (
                            <TemplateSelectItem
                                key={item.id}
                                id={item.id}
                                url={url}
                                selected={value.includes(item.id)}
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
