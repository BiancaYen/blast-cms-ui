import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('textArea');

const getBorderProperty = ({ isDisabled, validation }) => {
    if (!isDisabled && validation.status) {
        if (validation.status === 'valid') {
            return getTheme('successColor');
        }

        return getTheme('errorColor');
    }
    return getProperty('border');
};

const getBackgroundProperty = ({ isReadOnly }) => {
    return getProperty(isReadOnly ? 'backgroundReadOnly' : 'background');
};

const getPlaceholderColor = ({ isDisabled }) => {
    return getProperty(isDisabled ? 'placeholderDisabled' : 'placeholder');
};

const getCharacterCountColor = ({ validation }) => {
    if (validation.status && validation.status === 'invalid') {
        return getTheme('errorColor');
    }
    return getProperty('characterCountColor');
};

const TextAreaWrapper = styled.div`
    position: relative;
    
    margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
`;

const TextAreaInnerWrapper = styled.div`
    position: relative;
    width: 100%;
    border-radius: 10px;
    transition: border .2s ease;
    
    border: 2px solid ${getBorderProperty};
    background-color: ${getBackgroundProperty};
    
    &:focus-within {
        border: 2px solid ${getProperty('borderFocused')};
    }
`;

const TextAreaInput = styled.textarea`
        border-radius: 10px;
        display: block;
        font-family: inherit;
        font-size: 11px;
        letter-spacing: 0.7px;
        outline: none;
        padding: 12px 18px;
        resize: none;
        width: 100%;
        height: 100%;
        border: none;
        transition: border .2s ease;
        
        color: ${getProperty('color')};
        caret-color: ${getProperty('caretColor')};
        background-color: ${getBackgroundProperty};
        
        // Reset
        -webkit-appearance: none;
        
        // Auto-fill
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-text-fill-color: ${getProperty('color')};
        }
        
        // Placeholder
        &::-webkit-input-placeholder {
            color: ${getPlaceholderColor};
        }
        &::-moz-placeholder {
            color: ${getPlaceholderColor};
        }
        &:-moz-placeholder {
            color: ${getPlaceholderColor};
        }
        &:-ms-input-placeholder {
            color: ${getPlaceholderColor};
        }
        
        &:disabled {
            color: ${getProperty('placeholderDisabled')};
            cursor: default;
        }
`;

const Actions = styled.div`
    display: flex;
    height: 35px;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 11px;
    bottom: 0;
    
    &> [class*="HintWrapper"] {
        width: max-content;
        
        [class*="HintContent"] {
            right: -12px;
        }
    }
    
    &> *:not(:last-of-type) {
        margin-right: 11px;
    }
`;

const InputCharacterCount = styled.div`
    font-size: 9px;
    letter-spacing: 0.3px;
    line-height: 1;
    padding: 4px 0;
    position: absolute;
    right: 0;
    text-transform: uppercase;
    
    color: ${getCharacterCountColor};
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export {
    TextAreaInput,
    IconWrapper,
    TextAreaInnerWrapper,
    TextAreaWrapper,
    Actions,
    InputCharacterCount
};
