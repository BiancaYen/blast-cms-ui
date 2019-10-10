import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import ValidationError from '../validation-error/ValidationError';
import Label from '../label/Label';
import ResetButton from '../buttons/reset/ResetButton';
import Hint from '../hint/Hint';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';

// Styles
import {
    Actions,
    IconWrapper,
    InputCharacterCount,
    TextAreaInput,
    TextAreaInnerWrapper,
    TextAreaWrapper
} from './styles';

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
    resetButtonText: 'Undo',
    rows: 7,
    spacing: '',
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
    labelAdditional: PropTypes.node,
    labelNote: PropTypes.string,
    maxCount: PropTypes.number,
    placeholder: PropTypes.string,
    resetButtonText: PropTypes.string,
    rows: PropTypes.number,
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        valid: PropTypes.bool,
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

const TextArea = ({
    canReset,
    hint,
    id,
    isDisabled,
    isDisabledReset,
    isReadOnly,
    isLoading,
    label,
    labelAdditional,
    labelNote,
    labelAction,
    maxCount,
    placeholder,
    rows,
    resetButtonText,
    spacing,
    validation,
    value,
    onChange,
    onReset,
    ...props
}) => {
    useEffect(() => {
        if (maxCount && value.length > maxCount) {
            onChange(value.substring(0, maxCount));
        }
    });

    const handleInputChange = (event) => {
        const { target: { value: inputValue } } = event;

        if (!maxCount || inputValue.length <= maxCount || !value) {
            onChange({
                id,
                value: inputValue,
                event
            });
        }
    };

    const handleReset = () => {
        onChange({ id, value: '' });
        onReset();
    };

    return (
        <TextAreaWrapper isReadOnly={isReadOnly} spacing={spacing}>
            {
                label
                && (
                    <Label
                        action={labelAction}
                        isDisabled={isDisabled || isLoading}
                        labelAdditional={labelAdditional}
                        labelNote={labelNote}
                    >
                        {label}
                    </Label>
                )
            }
            <TextAreaInnerWrapper
                isDisabled={isDisabled || isLoading}
                isReadOnly={isReadOnly}
                validation={validation}
            >
                <TextAreaInput
                    {...props}
                    disabled={isDisabled || isReadOnly || isLoading}
                    isDisabled={isDisabled || isLoading}
                    isReadOnly={isReadOnly}
                    id={id}
                    placeholder={placeholder}
                    rows={rows}
                    tabIndex="0"
                    value={value || ''}
                    onChange={handleInputChange}
                />
                <Actions>
                    {!!hint && <Hint spacing="0">{hint}</Hint>}
                    {isLoading && <SpinnerLoader size={18} spacing="0" />}
                    {
                        canReset &&
                        <IconWrapper>
                            <ResetButton
                                isDisabled={isDisabledReset || !value.length || isLoading}
                                label={resetButtonText}
                                onClick={handleReset}
                            />
                        </IconWrapper>
                    }
                </Actions>
            </TextAreaInnerWrapper>
            <ValidationError>
                { validation ? validation.errors : ''}
            </ValidationError>
            {
                !!maxCount &&
                    <InputCharacterCount isDisabled={isDisabled} validation={validation}>
                        {`${value.length} / ${maxCount} characters`}
                    </InputCharacterCount>
            }
        </TextAreaWrapper>
    );
};

TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTypes;

export default TextArea;
