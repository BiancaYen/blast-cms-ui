import React from 'react';
import PropTypes from 'prop-types';

// Components
import Label from '../../components/label/Label';

// Styles
import ToggleWrapper from './styles';

// Default Props
const defaultProps = {
    isDisabled: false,
    label: '',
    labelNote: '',
    spacing: ''
};

// Prop Types
const propTypes = {
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    label: PropTypes.string,
    labelNote: PropTypes.node,
    spacing: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

const Toggle = ({
    id,
    isDisabled,
    label,
    labelNote,
    spacing,
    value,
    onChange
}) => {
    const handleChange = ({ target }) => {
        onChange({
            id,
            value: target.checked
        });
    };

    return (
        <ToggleWrapper
            htmlFor={id}
            isDisabled={isDisabled}
            spacing={spacing}
        >
            <input
                id={id}
                checked={value}
                disabled={isDisabled}
                tabIndex="0"
                type="checkbox"
                value={value}
                onChange={handleChange}
            />
            <span />
            { label &&
                <Label
                    isDisabled={isDisabled}
                    id={id}
                    labelNote={labelNote}
                    spacing="0 0 0 11px"
                >
                    {label}
                </Label>
            }
        </ToggleWrapper>
    );
};

Toggle.defaultProps = defaultProps;
Toggle.propTypes = propTypes;

export default Toggle;
