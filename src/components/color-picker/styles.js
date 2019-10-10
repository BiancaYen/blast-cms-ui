import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('colorPicker');

const getColorButtonBorderStyles = ({ isActive }) => {
    return isActive ? getProperty('buttonBorderColorActive') : getProperty('buttonBorderColor');
};

const ColorPickerWrapper = styled.div`
    margin-right: 11px;
    
    > div[class*="ReactColorWrapper"] {
        position: absolute;
        top: 47px;
        right: 0;
        z-index: 5;
    }
`;

const ColorButtonWrapper = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    transition: border-color, background-color .2s ease;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
    background-color: ${({ color }) => color || 'none'};
    border: solid 2px ${getColorButtonBorderStyles};
    
    > img { // Placeholder image
        display: none;
    }
    
    ${({ color }) => !color && css`
        > img {
            display: block;
            width: 28px;
            margin: -4px 0 0px -4px;
            height: 28px;
        }
    `}
`;

export {
    ColorButtonWrapper,
    ColorPickerWrapper
};
