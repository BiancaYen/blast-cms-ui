import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('input');

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
    return isDisabled ? getProperty('placeholderDisabled') : getProperty('placeholder');
};

const InputWrapper = styled.div`
    position: relative;
    margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
`;

const InputInnerWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 5px;
    height: 45px;
    transition: border .2s ease;
    
    background-color: ${getBackgroundProperty};
    border: 2px solid ${getBorderProperty};
    
    input {
        display: block;
        font-family: inherit;
        font-size: 11px;
        letter-spacing: 0.7px;
        outline: none;
        padding: 0 0 0 19px;
        resize: none;
        height: 100%;
        border-radius: 5px;
        flex-grow: 1;
        border: none;
        
        background-color: ${getBackgroundProperty};
        caret-color: ${getProperty('caretColor')};
        color: ${({ isDisabled }) => (isDisabled ? getProperty('colorDisabled') : getProperty('color'))};
        
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
    }
    
    &:focus-within {
        border: 2px solid ${getProperty('borderFocused')};
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
`;

const InputCharacterCount = styled.div`
    color: ${getProperty('characterCountColor')};
    font-size: 9px;
    letter-spacing: 0.3px;
    line-height: 1;
    padding: 4px 0;
    position: absolute;
    right: 0;
    text-transform: uppercase;
`;

export {
    InputInnerWrapper,
    InputWrapper,
    IconWrapper,
    InputCharacterCount
};
