import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('textToggle');

const getItemActiveStyles = ({ isActive, isDisabled, ...props }) => isActive && css`
    height: 18px;
    cursor: default;
    
    background-color: ${getProperty(isDisabled
        ? 'backgroundActiveDisabled'
        : 'backgroundActive')(props)};
    color: ${getProperty('colorActive')(props)};

    &:last-of-type {
      margin-right: -2px;
    }

    &:first-of-type {
      margin-left: -2px;
    }
`;

const Item = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    border-radius: 19px;
    box-sizing: content-box;
    font-size: 9px;
    font-weight: 600;
    padding: 0 17px;
    letter-spacing: 0.56px;
    
    color: ${({ isDisabled }) => getProperty(isDisabled ? 'colorDisabled' : 'color')};
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    
    ${getItemActiveStyles}
`;

const TextToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: max-content;
    height: 18px;
    border-radius: 9px;
    
    background-color: ${getProperty('background')};
    margin: ${({ spacing }) => spacing || '0'};
`;

export {
    Item,
    TextToggleWrapper
};
