// @flow

import * as React from 'react';
import classNames from 'classnames';
import './style.css';

const PREVIEW_WIDTH = 200;

type Props = {
    id: string,
    format: string,
    url: string,
    selected: ?boolean,
    className?: string | { [className: string]: * },
    onChange: (value: string) => *,
};

export default class TemplateSelectItem extends React.PureComponent<Props, void> {
    onChangeHandler = () => {
        this.props.onChange(this.props.id);
    };

    render() {
        const {
            format,
            url,
            selected,
        } = this.props;
        let { className } = this.props;

        className = classNames(
            'tsfc-item',
            className,
            selected && 'tsfc-item-selected'
        );

        return (
            <div className={className}>
                {format === 'mp4' && (
                    <video
                        width={`${PREVIEW_WIDTH}px`}
                        autoPlay
                        controls
                    >
                        <source type="video/mp4" src={url} />
                    </video>
                )}
                {format !== 'mp4' && (
                    <img
                        src={url}
                        width={`${PREVIEW_WIDTH}px`}
                        alt=""
                    />
                )}
                <div
                    className="blocker"
                    onClick={this.onChangeHandler}
                />
            </div>
        );
    }
}
