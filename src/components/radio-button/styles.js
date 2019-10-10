import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('radioButton');

const getColorStyles = ({ isDisabled, isActive }) => {
    if (isDisabled) {
        return getProperty(isActive ? 'colorActiveDisabled' : 'colorDisabled');
    }

    return getProperty('color');
};

const RadioButtonWrapper = styled.label`
    display: flex;
    align-items: center;
    width: max-content;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
    margin: ${({ spacing }) => spacing || '0'};
    
    // Label
    & > div span {
        text-transform: capitalize;
    }
    
    // Background
    & > span {
        position: relative;
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        transition: all .3s linear;
        
        border: 2px solid ${getColorStyles};
        background-color: ${getProperty('background')};
        
        // Dot
        &:after {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            content: "";
            border-radius: 50%;
            transition: all .3s linear;
            
            transform: translate(-50%, -50%);
            background-color: ${getColorStyles};
        }
    }

    input[type="checkbox"] {
        display: none;
        
        &:checked ~ span {
            background-color: ${getProperty('backgroundActive')};
            
            &:after {
                width: 9px;
                height: 9px;
            }
        }
    }
    
    [class*="LabelMain"] {
        padding-bottom: 0;
    }
`;

export default RadioButtonWrapper;
