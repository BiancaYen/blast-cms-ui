import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('select');

const getBorderProperty = ({ isDisabled, isActive, validation }) => {
    if (!isActive && !isDisabled && validation.status) {
        if (validation.status === 'valid') {
            return getTheme('successColor');
        }

        return getTheme('errorColor');
    }
    return getProperty(isActive ? 'borderActive' : 'border');
};

const getBorderStyles = ({ isReadOnly }) => {
    return getProperty(isReadOnly ? 'backgroundReadOnly' : 'background');
};

const getCursorStyles = ({ isDisabled, isReadOnly }) => {
    return isDisabled || isReadOnly ? 'initial' : 'pointer';
};

const getAbsolutePosition = ({ isShouldScroll, positionLeft }) => isShouldScroll && css`
    position: relative;
    left: ${positionLeft || '0'}px;
`;

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
    
    margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
`;

const DropdownContentWrapper = styled.div`
    position: absolute;
    z-index: 5;
    width: 100%;
    left: 0;
    overflow: hidden;
    border-radius: 5px;
    
    bottom: ${({ isOpenToTop }) => (isOpenToTop ? '47px' : 'unset')};
    top: ${({ isOpenToTop }) => (isOpenToTop ? 'unset' : '47px')};
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    box-shadow: 0 2px 5px 0 rgba(214, 213, 213, 0.5);
    background-color: ${getProperty('dropdownBackground')};
`;

const DropdownContent = styled.div`
    max-height: calc(8 * 40px);
    overflow-y: auto;
    outline: none;
`;

const Dropdown = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    height: 45px;
    outline: none;
    border-radius: 5px;
    transition: border .2s ease;
    font-size: 11px;
    letter-spacing: 0.69px;
    
    cursor: ${getCursorStyles};
    border: solid 2px ${getBorderProperty};
    background-color: ${getBorderStyles};
    color: ${({ isDisabled }) => getProperty(isDisabled ? 'colorDisabled' : 'color')};
    
    
    &> span {
        margin-left: auto;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    overflow: hidden;
    flex-grow: 1;
    
    &> div {
        display: flex;
        align-items: center;
        transition: left .4s ease;
        
        ${getAbsolutePosition}
    }
`;

const Placeholder = styled.span`
    pointer-events: none;
    
    color: ${getProperty('placeholder')};
`;

const CounterBadge = styled.div`
    border-radius: 6px;
    font-size: 10.1px;
    font-weight: 600;
    padding: 3px 8px;
    line-height: 1.89;
    letter-spacing: 0.95px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    
    color: ${getProperty('counterColor')};
    border: solid 1px ${getProperty('counterBorderColor')};
    background-color: ${getProperty('counterBackground')}; 
`;


export {
    CounterBadge,
    Placeholder,
    SelectWrapper,
    InputWrapper,
    DropdownContent,
    DropdownContentWrapper,
    Dropdown
};
