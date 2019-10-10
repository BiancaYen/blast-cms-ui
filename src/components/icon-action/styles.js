import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('iconAction');

const IconActionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.69px;
    width: max-content;
    height: max-content;
    min-width: 20px;
    min-height: 20px;
    text-transform: uppercase;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
    color: ${getProperty('color')};
    
    &> span svg path {
        fill: ${({ isDisabled }) => getProperty(isDisabled ? 'iconColorDisabled' : 'iconColor')};
    }
    
    & > span:nth-child(2) { // Title
        display: none;
    }
    
    ${({ isDisabled }) => !isDisabled && css`
        &:hover > span:nth-child(1) { // Icon
            display: none;
        }
        
        &:hover > span:nth-child(2) { // Title
            display: block;
        }
    `}
`;

export default IconActionWrapper;
