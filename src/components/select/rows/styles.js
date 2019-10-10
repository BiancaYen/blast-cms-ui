import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('selectRow');

const getColorStyles = ({ isActive, isDisabled }) => {
    if (isDisabled) {
        return getProperty('colorDisabled');
    }

    return getProperty(isActive ? 'colorActive' : 'color');
};

const RowWrapper = styled.div`
    font-size: 11px;
    letter-spacing: 0.69px;
    height: 40px;
    display: flex;
    align-items: center;

    color: ${getColorStyles};
    font-weight: ${({ isHighlighted }) => (isHighlighted ? 'bold' : 'normal')};
    padding: ${({ spacingContent }) => spacingContent || '0 11px 0 20px'};
    cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
    border-bottom: solid 1px ${getProperty('border')};
    background-color: ${({ isFocused }) => (isFocused ? getProperty('backgroundFocused') : 'none')};
    
    &:hover {
      background-color: ${getProperty('backgroundHover')};
    }
    
    &:last-of-type {
        border: none;
    }
`;

const CheckBoxWrapper = styled.div`
    pointer-events: none;
    margin-left: auto;
`;

export {
    RowWrapper,
    CheckBoxWrapper
};
