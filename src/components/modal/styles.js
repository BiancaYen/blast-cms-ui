import styled, { keyframes } from 'react-emotion';

// Constants
import types from './constants';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('modal');

const modalActive = ({ animationEnd }) => (animationEnd ? 'hidden' : 'visible');

const getColor = ({ type }) => {
    switch (type) {
        case types.error:
            return getProperty('errorColor');
        case types.success:
            return getProperty('successColor');
        default:
            return getProperty('defaultColor');
    }
};

const easeInModal = keyframes`
    0% {
        top: 300px;
        opacity: 0;
    }
    100% {
        top: 0;
        opacity: 1;
    }
`;

const easeOutModal = keyframes`
    0% {
        top: 0;
        opacity: 1;
    }
    100% {
        top: 300px;
        opacity: 0;
    }
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 600px;
    min-height: 200px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    
    border: solid 1px ${getProperty('border')};
    background-color: ${getProperty('background')};
`;

const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .5s;
    background-color: rgba(227, 229, 232, 0.7);
    z-index: 100;
    
    visibility: ${modalActive};
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};

    ${InnerWrapper}{
        animation: ${({ isActive }) => (isActive ? easeInModal : easeOutModal)} .5s ease; 
    }
`;

const CloseButtonWrapper = styled.div`
    position: absolute;
    right: 11px;
    top: 11px;
    display: flex;
    
    span {
        font-size: 9px;
    }
`;

const Icon = styled.div`
    padding: 40px 26px 0 0;
    
    svg {
        width: 27px;
        height: 27px;
        
        path {
            fill: ${getColor};
        }
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    padding: 0 40px;
    flex-direction: row;
    flex-grow: 1;
`;

const Content = styled.div`
    display: flex;
    padding: 45px 10px 40px 0;
    flex-direction: column;
    flex-grow: 1;
    
    > span {
        margin: 17px 0 0 0;
        font-size: 11px;
        line-height: 1.82;
        letter-spacing: 1px;
        
        color: ${getProperty('contentColor')};
    }
    
    a {
        color: ${getProperty('linkColor')};
    }
`;

const Header = styled.div`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    
    color: ${getColor};
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 19px 40px;
    
    border-top: solid 1px ${getProperty('actionDivider')};
    
    &> button:last-of-type {
      margin-left: auto !important;
    }
`;

export {
    Icon,
    Header,
    Content,
    ContentWrapper,
    InnerWrapper,
    ModalWrapper,
    CloseButtonWrapper,
    Actions
};
