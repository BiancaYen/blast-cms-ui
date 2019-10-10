import React from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    Selected,
    Toggle,
    XAxis
} from './styles';

// Default props
const defaultProps = {
    isDisabled: false,
    isReadOnly: false,
    max: 100,
    min: 0,
    step: 10,
    xAxisStep: 10,
    onChange: undefined
};

// Prop types
const propTypes = {
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    xAxisStep: PropTypes.number,
    onChange: PropTypes.func
};

const Range = ({
    isDisabled,
    isReadOnly,
    max,
    min,
    step,
    value,
    xAxisStep,
    onChange
}) => {
    const points = new Array(Math.floor(((max - min) / xAxisStep) + 1))
        .fill(null)
        .map((point, index) => min + (index * xAxisStep));
    const offset = ((value - min) * 100) / (max - min);

    const handleChange = ({ target }) => {
        onChange({ value: target.value });
    };

    return (
        <Toggle
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            value={offset}
        >
            <Selected width={offset} />
            <input
                disabled={isDisabled || isReadOnly}
                type="range"
                max={max}
                min={min}
                step={step}
                value={value}
                onChange={handleChange}
            />
            <XAxis>
                {points.map(mark => <div key={mark}>{mark}</div>)}
            </XAxis>
        </Toggle>
    );
};

Range.defaultProps = defaultProps;
Range.propTypes = propTypes;

export default Range;
