import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('panel');

const ActionIcon = styled.div`
    outline: none;
    
    svg {
        path {
            fill: ${getProperty('actionIconColor')};
        }
    }
`;

const ActionTitle = styled.span`
    display: none;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.69px;
    
    color: ${getProperty('actionColor')};
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 1.25px;
    padding-right: 15px;
    transition: color .3s ease;
    
    color: ${getProperty('color')};
`;

const PanelWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 30px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    cursor: pointer;
    transition: border-color .3s ease;
    
    margin: ${({ spacing }) => spacing || '40px 40px'};
    border: solid 1px ${getProperty('border')};
    background: ${getProperty('background')};
    
    &:hover {
        border: solid 1px ${getProperty('borderHover')};
    }
    
    &:hover ${ActionIcon} {
        display: none;
    }
    &:hover ${ActionTitle} {
        display: block;
    }
    &:hover ${Title} {
        color: ${getProperty('colorHover')};
    }
`;

export {
    ActionIcon,
    ActionTitle,
    PanelWrapper,
    Title
};
