// @flow

import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import type { FormFieldValue } from '../../types';
import './style.css';

type Props = {
    group: string,
    id: string,
    value: FormFieldValue,
    description?: string,
    selected: ?boolean,
    translate?: boolean,
    className?: string | { [className: string]: * },
    onChange: (value: FormFieldValue) => *,
};

export default class RadioButtonItem extends React.PureComponent<Props, void> {
    static defaultProps = {
        translate: true,
    };

    onChangeHandler = () => {
        this.props.onChange(this.props.id);
    };

    render() {
        const {
            group,
            id,
            selected,
            value,
            description,
            translate,
        } = this.props;
        let { className } = this.props;

        className = classNames(
            'radio-button',
            className,
            selected && 'radio-button-selected'
        );

        return (
            <label
                className={className}
                htmlFor={`${group}-${id}`}
            >
                <input
                    type="radio"
                    name={group}
                    id={`${group}-${id}`}
                    value={id}
                    onChange={this.onChangeHandler}
                />
                { translate && typeof value === 'string'
                    ? <FormattedMessage id={value} />
                    : value
                }
                { description && (
                    <span className="radio-button-description">
                        { translate && typeof description === 'string'
                            ? <FormattedMessage id={description} />
                            : description
                        }
                    </span>
                ) }
            </label>
        );
    }
}
