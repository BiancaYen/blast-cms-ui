import styled, { keyframes, css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

// Constants
import sizes from './constants';

const { small } = sizes;

const loadingFadeAnimation = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.8;
    }
    100% {
        opacity: 0
    }
`;

const getOutlinedStyles = property => ({ isOutlined, ...props }) => {
    return getTheme(`button${isOutlined ? 'Outlined' : ''}`)(property)(props);
};

const hover = ({ isLoading, isDisabled, ...props }) => !isDisabled && !isLoading && css`
    &:hover {
        background-color: ${getOutlinedStyles('backgroundHover')(props)};
    }
`;

const getBackground = ({ isDisabled }) => {
    return !isDisabled
        ? getOutlinedStyles('background')
        : getOutlinedStyles('backgroundDisabled');
};

const getBorder = ({ isOutlined, isDisabled, ...props }) => {
    if (!isOutlined) {
        return 'none';
    }
    if (!isDisabled) {
        return `2px solid ${getOutlinedStyles('border')({ isOutlined, ...props })}`;
    }
    return `2px solid ${getOutlinedStyles('borderDisabled')({ isOutlined, ...props })}`;
};

const getColor = ({ isDisabled }) => {
    return !isDisabled
        ? getOutlinedStyles('color')
        : getOutlinedStyles('colorDisabled');
};

const ButtonWrapper = styled.button`
    width: ${({ size }) => (size === small ? '160px' : '280px')};
    height: 45px;
    margin: ${({ spacing }) => spacing || '0'};
    border: ${getBorder};
    border-radius: 22.5px;
    text-transform: uppercase;
    cursor: ${({ isDisabled, isLoading }) => (isDisabled || isLoading ? 'normal' : 'pointer')};
    background-color: ${getBackground};
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.7px;
    text-align: center;
    outline: none;
    padding: 0;
    transition: all .1s linear;
    color: ${getColor};
   
    ${hover}
    
    &:focus {
      outline: none;
    }
`;

const LoaderWrapper = styled.div` 
    span {
        animation: ${loadingFadeAnimation} 1s infinite;
        background-color: ${getOutlinedStyles('loaderColor')};
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px; 
        height: 5px;
        width: 5px;

        &:nth-of-type(1) {
                animation-delay: 0s;
        }
    
        &:nth-of-type(2) {
                animation-delay: 0.1s;
        }
    
        &:nth-of-type(3) {
                animation-delay: 0.2s;
        }
    }    
`;

export {
    ButtonWrapper,
    LoaderWrapper
};
