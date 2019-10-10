import styled, { keyframes } from 'react-emotion';

// Constants
import types from '../constants/statuses';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('notifications');

/* eslint-disable no-prototype-builtins */

const notificationColorStyle = ({ type = types.info }) => {
    if (type === types.success) {
        return getProperty('successColor');
    }

    if (type === types.error) {
        return getProperty('warningColor');
    }

    return getProperty('errorColor');
};

const FadeIn = keyframes`
  0% {
    opacity: 0;
    left: 300px;
  }
  100% {
    opacity: 1;
    left: 0;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
    left: 0;
  }
  100% {
    opacity: 0;
    left: 300px;
  }
`;

const NotificationWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 60px;
    transition: all 0.6s; //For sliding up
    width: 400px;
    
    top: ${({ index, margin }) => index * margin}px;
    z-index: ${({ index }) => 40 - index};
    animation: ${({ isActive }) => (isActive ? FadeIn : FadeOut)} 0.5s ease-in 0s;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    background-color: ${getProperty('background')};
    border-left: 2px solid ${notificationColorStyle};
    
    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
   
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    
    svg {
        width: 20px;
        height: 20px;
        
        path {
            fill: ${notificationColorStyle};
        }
    }
`;

const Content = styled.div`
    text-align: left;
    flex-grow: 1;
    font-size: 11px;
    line-height: 1.55;
    letter-spacing: 0.7px;
    padding: 13px 0;
    
    color: ${getProperty('color')};
    
    a {
        color: ${getProperty('linkColor')};
    }
`;

const CloseButton = styled.div`
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    svg path {
        fill: ${getProperty('iconColor')};
    }
    
    &:hover {
        svg path {
            fill: ${getProperty('iconColorHover')};
        }
    }
`;

const NotificationsWrapper = styled.div`
    position: fixed;
    top: 90px;
    width: 400px;
    right: 40px;
    z-index: 10;
    
    height: ${({ height }) => height}px;
`;

export {
    Icon,
    CloseButton,
    Content,
    NotificationWrapper,
    NotificationsWrapper
};
