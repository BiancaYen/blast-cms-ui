import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ValidationError from '../validation-error/ValidationError';
import DisplayButton from './display-button/DisplayButton';
import Label from '../label/Label';
import ResetButton from '../buttons/reset/ResetButton';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';

// Styles
import {
    IconWrapper,
    InputCharacterCount,
    InputInnerWrapper,
    InputWrapper
} from './styles';

// Components
import Hint from '../hint/Hint';

// Default props
const defaultProps = {
    canReset: false,
    hint: '',
    isDisabled: false,
    isDisabledReset: false,
    isLoading: false,
    isReadOnly: false,
    label: '',
    labelAction: null,
    labelAdditional: '',
    labelNote: '',
    maxCount: 0,
    placeholder: '',
    spacing: '',
    type: 'text',
    value: '',
    validation: {
        status: '',
        errors: ''
    },
    onReset: () => {}
};

// Prop types
const propTypes = {
    canReset: PropTypes.bool,
    hint: PropTypes.node,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isDisabledReset: PropTypes.bool,
    isLoading: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    label: PropTypes.string,
    labelAction: PropTypes.node,
    labelAdditional: PropTypes.any,
    labelNote: PropTypes.node,
    maxCount: PropTypes.number,
    placeholder: PropTypes.string,
    spacing: PropTypes.string,
    type: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        errors: PropTypes.string
    }),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func
};

const Input = ({
    canReset,
    hint,
    isDisabled,
    isDisabledReset,
    isLoading,
    id,
    label,
    labelAdditional,
    labelNote,
    labelAction,
    maxCount,
    placeholder,
    isReadOnly,
    spacing,
    type,
    validation,
    value,
    onChange,
    onReset,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event) => {
        const { target: { value: inputValue } } = event;

        if (type === 'number' && !!maxCount && inputValue > maxCount) {
            onChange({ id, value: maxCount, event });

            return;
        }

        if (!maxCount || inputValue.length <= maxCount || !value) {
            onChange({
                id,
                value: inputValue,
                event
            });
        }
    };

    const handleReset = () => {
        onChange({ id, value: type === 'number' ? 0 : '' });
        onReset();
    };

    const handlePasswordDisplayToggle = () => {
        setShowPassword(!showPassword);
    };

    const getType = () => {
        if (type === 'password' && showPassword) {
            return 'text';
        }

        return type;
    };

    return (
        <InputWrapper isReadOnly={isReadOnly} spacing={spacing}>
            {
                label &&
                <Label
                    isDisabled={isDisabled || isLoading}
                    labelNote={labelNote}
                    labelAdditional={labelAdditional}
                    action={labelAction}
                >
                    {label}
                </Label>
            }
            <InputInnerWrapper
                validation={validation}
                isDisabled={isDisabled || isLoading}
                isReadOnly={isReadOnly}
            >
                <input
                    {...props}
                    disabled={isDisabled || isReadOnly || isLoading}
                    id={id}
                    placeholder={placeholder}
                    tabIndex="0"
                    type={getType()}
                    value={value}
                    onChange={handleInputChange}
                />
                {!!hint && <Hint>{hint}</Hint>}
                {isLoading && <SpinnerLoader size={18} spacing=" 0 14px 0 0" />}
                {
                    type === 'password' &&
                    <IconWrapper onClick={!isDisabled && !!value ? handlePasswordDisplayToggle : undefined}>
                        <DisplayButton isDisabled={isDisabled || !value || isLoading} isVisible={showPassword} />
                    </IconWrapper>
                }
                {
                    canReset &&
                    <IconWrapper>
                        <ResetButton isDisabled={isDisabledReset || !value.length || isLoading} onClick={handleReset} />
                    </IconWrapper>
                }
            </InputInnerWrapper>
            <ValidationError>
                { validation ? validation.errors : ''}
            </ValidationError>
            {
                !!maxCount && type !== 'number' && <InputCharacterCount>{`${value.length} / ${maxCount} characters`}</InputCharacterCount>
            }
        </InputWrapper>
    );
};

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
