import styled from 'react-emotion';

// Constants
import sizes from './constants';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('arrowToggle');

const selectFillColor = ({ isActive, isDisabled }) => {
    if (isDisabled) {
        return getProperty(['colorDisabled']);
    }

    return getProperty(isActive ? 'colorActive' : 'color');
};

const Wrapper = styled.span`
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')}; 
    width: ${({ size }) => (size === sizes.small ? '8px' : 'max-content')}; 
    
    &> svg {
        width: 100%;
        path{
            fill: ${selectFillColor};
        }
    }
`;

export default Wrapper;
