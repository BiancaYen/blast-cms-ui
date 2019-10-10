import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { CheckboxWrapper, InputWrapper } from './styles';

// Components
import Label from '../label/Label';

// Icon Components
import CheckedIcon from '../icons/CheckedIcon';

// Default Props
const defaultProps = {
    isDisabled: false,
    label: '',
    labelNote: '',
    spacing: ''
};

// Prop Types
const propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    isDisabled: PropTypes.bool,
    label: PropTypes.string,
    labelNote: PropTypes.node,
    spacing: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

const Checkbox = ({
    isDisabled,
    id,
    label,
    labelNote,
    spacing,
    value,
    onChange
}) => {
    const handleOnChange = ({ target }) => {
        if (!isDisabled) {
            onChange({ id, value: target.checked });
        }
    };

    return (
        <CheckboxWrapper
            htmlFor={id}
            isDisabled={isDisabled}
            spacing={spacing}
        >
            <InputWrapper isDisabled={isDisabled} checked={value}>
                <input
                    id={id}
                    checked={value}
                    disabled={isDisabled}
                    tabIndex="0"
                    type="checkbox"
                    value={value}
                    onChange={handleOnChange}
                />
                <span><CheckedIcon /></span>
            </InputWrapper>
            { label
                && (
                    <Label
                        isDisabled={isDisabled}
                        id={id}
                        labelNote={labelNote}
                        spacing="0 0 0 9px"
                    >
                        {label}
                    </Label>
                )
            }
        </CheckboxWrapper>
    );
};

Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;

export default Checkbox;
