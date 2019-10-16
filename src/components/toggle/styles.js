import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('toggle');

const getBackgroundStyles = ({ isDisabled }) => {
    return getProperty(isDisabled ? 'backgroundDisabled' : 'background');
};

const getBackgroundActiveStyles = ({ isDisabled }) => {
    return getProperty(isDisabled ? 'backgroundActiveDisabled' : 'backgroundActive');
};

const ToggleWrapper = styled.label`
    display: flex;
    align-items: center;
    width: max-content;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
    margin: ${({ spacing }) => spacing || '0'};
    
    [class*="LabelMain"] {
        padding-bottom: 0;
    }
    
    // Background
    & > span {
        position: relative;
        display: block;
        width: 30px;
        height: 18px;
        border-radius: 9px;
        transition: all .3s linear;
        
        background-color: ${getBackgroundStyles};
        
        // Handle
        &:after {
            position: absolute;
            top: 50%;
            left: 4px;
            width: 11px;
            height: 11px;
            content: "";
            border-radius: 50%;
            transform: translateY(-50%);
            transition: all .3s linear;
            
            background-color: ${getProperty('handleColor')};
        }
    }

    input[type="checkbox"] {
        display: none;
        
        &:checked ~ span {
            background-color: ${getBackgroundActiveStyles};
            
            &:after {
                left: 16px;
            }
        }
    }
`;

export default ToggleWrapper;
