import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('checkbox');

const getPropertyWithDisabled = property => ({ isDisabled }) => {
    return getProperty(isDisabled ? `${property}Disabled` : property);
};

const getBackgroundStyles = ({ isDisabled, checked }) => {
    return isDisabled && !checked
        ? getProperty('backgroundDisabled')
        : getProperty('background');
};

const InputWrapper = styled.div`
    position: relative;
    display: inline-block;
    border-radius: 3px;
    height: 19px;
    width: 19px;
    background: ${getBackgroundStyles};
    border: 2px solid ${getPropertyWithDisabled('border')};
    
    span {
        display: none;
        position: absolute;
        top: -2px;
        left: -2px;
        
        svg {
            height: 19px;
            width: 19px;
            
            path {
                fill: ${getPropertyWithDisabled('backgroundChecked')};
            }
        }
    }

    input[type="checkbox"] {
        display: none;

        &:checked {
            ~span {
                display: block;
            }
        }
    }
`;

const CheckboxWrapper = styled.label`
    align-items: center;
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    display: flex;
    margin: ${({ spacing }) => spacing || '0'};
    width: max-content;
    
    [class*="LabelMain"] {
        padding-bottom: 0;
    }
`;

export {
    InputWrapper,
    CheckboxWrapper
};
