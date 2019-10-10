import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('dropdown');

const DropdownWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 145px;
    height: 35px;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    padding: 10px 15px 10px 10px;
    font-size: 11px;
    letter-spacing: 0.7px;
    transition: all .2s ease;
    
    border: solid 1px ${({ isActive }) => getProperty(`border${isActive ? 'Active' : ''}`)};
    background-color: ${getProperty('background')};
    color: ${({ isDisabled }) => getProperty(isDisabled ? 'colorDisabled' : 'color')};
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
    
    [class*="ActionMenuWrapper"] {
        width: 100%;
        left: 0;
        top: 40px;
    }
`;

export default DropdownWrapper;
