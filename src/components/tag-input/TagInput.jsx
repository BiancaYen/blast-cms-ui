import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Hint from '../hint/Hint';
import ValidationError from '../validation-error/ValidationError';
import Label from '../label/Label';
import ResetButton from '../buttons/reset/ResetButton';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';
import Tag from '../tag/Tag';

// Styles
import {
    IconWrapper,
    InputInnerWrapper,
    InputWrapper
} from '../input/styles';
import TagsWrapper from './styles';

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
    placeholder: '',
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
    labelAdditional: PropTypes.any,
    labelNote: PropTypes.node,
    placeholder: PropTypes.string,
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        errors: PropTypes.string
    }),
    value: PropTypes.instanceOf(Array).isRequired,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func
};

const TagInput = ({
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
    placeholder,
    isReadOnly,
    spacing,
    validation,
    value,
    onChange,
    onReset,
    ...props
}) => {
    // State
    const [currentValue, setCurrentValue] = useState('');

    // Event Handlers
    const handleInputChange = (event) => {
        const { target: { value: inputValue } } = event;
        setCurrentValue(inputValue);
    };

    const handleKeyDown = (event) => {
        const { target: { value: inputValue } } = event;
        // Adding a tag on enter keyCode
        if (event.keyCode === 13) {
            event.preventDefault();
            if (!value.includes(inputValue)) {
                onChange({
                    id,
                    value: [...value, inputValue]
                });
                setCurrentValue('');
            }
        }
        // Deleting a tag on backspace keyCode
        if (event.keyCode === 8 && !currentValue) {
            event.preventDefault();
            onChange({
                id,
                value: value.filter((item, index) => index !== value.length - 1)
            });
            setCurrentValue('');
        }
    };

    const handleReset = () => {
        onChange({ id, value: [] });
        onReset();
    };

    const handleTagDelete = (itemToDelete) => {
        onChange({
            id,
            value: value.filter(item => item !== itemToDelete)
        });
    };

    return (
        <InputWrapper isReadOnly={isReadOnly} spacing={spacing}>
            {
                label && (
                    <Label
                        isDisabled={isDisabled || isLoading}
                        labelNote={labelNote}
                        labelAdditional={labelAdditional}
                        action={labelAction}
                    >
                        {label}
                    </Label>
                )
            }
            <InputInnerWrapper
                validation={validation}
                isDisabled={isDisabled || isLoading}
                isReadOnly={isReadOnly}
                spacingContent={value.length && '0 19px 0 5px'}
            >
                {
                    !!value.length && (
                        <TagsWrapper>
                            {
                                value.map(item => (
                                    <Tag key={item} onDelete={() => handleTagDelete(item)}>
                                        {item}
                                    </Tag>
                                ))
                            }
                        </TagsWrapper>
                    )
                }
                <input
                    {...props}
                    disabled={isDisabled || isReadOnly || isLoading}
                    id={id}
                    placeholder={placeholder}
                    tabIndex="0"
                    type="text"
                    value={currentValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {!!hint && <Hint>{hint}</Hint>}
                {isLoading && <SpinnerLoader size={18} spacing=" 0 14px 0 0" />}
                {
                    canReset && (
                        <IconWrapper>
                            <ResetButton isDisabled={isDisabledReset || !value.length || isLoading} onClick={handleReset} />
                        </IconWrapper>
                    )
                }
            </InputInnerWrapper>
            <ValidationError>
                { validation ? validation.errors : ''}
            </ValidationError>
        </InputWrapper>
    );
};

TagInput.defaultProps = defaultProps;
TagInput.propTypes = propTypes;

export default TagInput;
