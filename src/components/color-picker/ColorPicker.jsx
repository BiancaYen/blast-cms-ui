import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import { ColorPickerWrapper } from './styles';
import {
    InputInnerWrapper,
    InputWrapper
} from '../input/styles';

// Components
import HiddenContent from '../../components/hidden-content/HiddenContent';
import Label from '../../components/label/Label';
import ReactColor from './react-color/ReactColor';
import ColorButton from './ColorButton';
import ValidationError from '../validation-error/ValidationError';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';
import Hint from '../hint/Hint';

// Default props
const defaultProps = {
    hint: '',
    isDisabled: false,
    isLoading: false,
    label: '',
    labelAction: null,
    labelAdditional: '',
    labelNote: '',
    placeholder: 'Select or Type Hex Value',
    spacing: '',
    validation: {
        status: '',
        errors: ''
    },
    value: ''
};

// Prop types
const propTypes = {
    hint: PropTypes.node,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    labelAction: PropTypes.node,
    labelAdditional: PropTypes.any,
    labelNote: PropTypes.node,
    placeholder: PropTypes.string,
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        error: PropTypes.string
    }),
    value: PropTypes.oneOfType([
        PropTypes.string
    ]).isRequired,
    onChange: PropTypes.func.isRequired
};

const ColorPicker = ({
    hint,
    id,
    isDisabled,
    isLoading,
    label,
    labelAction,
    labelAdditional,
    labelNote,
    placeholder,
    spacing,
    validation,
    value,
    onChange,
    ...props
}) => {
    const inputWrapperRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const clickOutsideHandler = ({ target }) => {
        if (!inputWrapperRef.current.contains(target)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', clickOutsideHandler, false);

        return () => document.removeEventListener('click', clickOutsideHandler, false);
    }, []);


    const validateValue = (inputValue) => {
        return !inputValue || /^#[A-Fa-f0-9]{0,6}$/.test(inputValue);
    };

    const handleInputChange = ({ target: { value: inputValue } }) => {
        const isValid = validateValue(inputValue);

        if (isValid) {
            onChange({ id, value: inputValue.toUpperCase() });
        }
    };

    const handleColorChange = ({ hex = '' }) => {
        onChange({ id, value: hex.toUpperCase() });
    };

    return (
        <InputWrapper spacing={spacing}>
            {/* Label */}
            <HiddenContent isHidden={!label}>
                <Label
                    isDisabled={isDisabled || isLoading}
                    labelNote={labelNote}
                    labelAdditional={labelAdditional}
                    action={labelAction}
                >
                    {label}
                </Label>
            </HiddenContent>

            {/* Input */}
            <InputInnerWrapper
                innerRef={inputWrapperRef}
                isDisabled={isDisabled || isLoading}
                validation={validation}
            >
                <input
                    {...props}
                    disabled={isDisabled || isLoading}
                    id={id}
                    placeholder={placeholder}
                    tabIndex="0"
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                />

                {/* Hint */}
                {!!hint && <Hint>{hint}</Hint>}

                {/* Loader */}
                {isLoading && <SpinnerLoader size={18} spacing=" 0 14px" />}

                {/* Color Picker */}
                <ColorPickerWrapper>
                    <ColorButton
                        isActive={isActive}
                        isDisabled={isDisabled || isLoading}
                        onClick={() => setIsActive(!isActive)}
                        color={value}
                    />
                    {isActive && <ReactColor color={value} onChange={handleColorChange} />}
                </ColorPickerWrapper>
            </InputInnerWrapper>

            {/* Validation */}
            <ValidationError>
                { validation ? validation.errors : ''}
            </ValidationError>
        </InputWrapper>
    );
};

ColorPicker.defaultProps = defaultProps;
ColorPicker.propTypes = propTypes;

export default ColorPicker;
