import React from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    RangeToggleWrapper,
    ReadOnlyValue,
    ToggleWrapper
} from './styles';

// Components
import Label from '../label/Label';
import Input from '../input/Input';
import Range from './Range';

// Default Props
const defaultProps = {
    isDisabled: false,
    isPercentageValue: false,
    isReadOnly: false,
    label: '',
    labelAdditional: '',
    labelNote: '',
    max: 100,
    min: 0,
    spacing: '',
    step: 10,
    validation: {
        status: '',
        errors: ''
    },
    xAxisStep: 10,
    onBlur: () => {}
};

// Prop Types
const propTypes = {
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isPercentageValue: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    label: PropTypes.string,
    labelAdditional: PropTypes.node,
    labelNote: PropTypes.node,
    max: PropTypes.number,
    min: PropTypes.number,
    spacing: PropTypes.string,
    step: PropTypes.number,
    validation: PropTypes.shape({
        status: PropTypes.string,
        error: PropTypes.string
    }),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    xAxisStep: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired
};

const RangeToggle = ({
    isDisabled,
    isPercentageValue,
    isReadOnly,
    id,
    label,
    labelAdditional,
    labelNote,
    value,
    max,
    min,
    spacing,
    step,
    validation,
    xAxisStep,
    onBlur,
    onChange
}) => {
    const handleChange = ({ value: nextValue }) => {
        const formattedValue = isPercentageValue ? nextValue.replace('%', '') : nextValue;

        if (
            // Test if value is integer or float n.nn format
            new RegExp('^\\d*(?:(\\.)\\d{0,2})?$').test(formattedValue)
            && (formattedValue === '' || parseFloat(formattedValue) <= max)
        ) {
            onChange({ id, value: formattedValue });
        }
    };

    return (
        <RangeToggleWrapper spacing={spacing}>
            {
                label &&
                    <Label
                        id={id}
                        isDisabled={isDisabled}
                        labelAdditional={labelAdditional}
                        labelNote={labelNote}
                    >
                        {label}
                    </Label>
            }
            <ToggleWrapper>
                <Range
                    isDisabled={isDisabled}
                    max={max}
                    min={min}
                    isReadOnly={isReadOnly}
                    step={step}
                    value={value}
                    xAxisStep={xAxisStep}
                    onChange={handleChange}
                />
                {
                    isReadOnly
                        ? <ReadOnlyValue>{`${value}${isPercentageValue ? '%' : ''}`}</ReadOnlyValue>
                        : <Input
                            id={id}
                            isDisabled={isDisabled}
                            spacing=" 6px 0 0 0"
                            type="text"
                            validation={validation}
                            value={`${value}${isPercentageValue ? '%' : ''}`}
                            onBlur={onBlur}
                            onChange={handleChange}
                        />
                }
            </ToggleWrapper>
        </RangeToggleWrapper>
    );
};

RangeToggle.defaultProps = defaultProps;
RangeToggle.propTypes = propTypes;

export default RangeToggle;
