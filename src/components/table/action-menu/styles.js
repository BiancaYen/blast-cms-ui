import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('tableActions');

const ActionMenuItem = styled.li`
    display: flex;
    font-size: 11px;
    height: 40px;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    list-style-type: none;
    line-height: 40px;
    outline: none;
    padding-left: 20px;
    letter-spacing: 0.7px;
    cursor: pointer;
    
    color: ${({ isActive }) => getProperty(isActive ? 'itemColorActive' : 'itemColor')};
    border-bottom: solid 1px ${getProperty('itemBorderColor')};
    
    &:hover {
        background-color: ${getProperty('itemBackgroundHover')};
        
        ${({ withHoverColor, ...props }) => withHoverColor && css`
            color: ${getProperty('itemColorHover')(props)}; 
        `} 
        
        svg {
            display: block;
            
            path {
                fill: ${getProperty('itemColorHover')};
            }
        }
    }
`;

const ActionMenu = styled.ul`
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: 0;
    width: 157px;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(214, 213, 213, 0.5);
    z-index: 5;
    
    background-color: ${getProperty('menuBackground')};
    border: 1px solid ${getProperty('menuBorderColor')};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    
    &> ${ActionMenuItem}:last-of-type {
        border-bottom: none;
    }
`;

const ActionMenuIcon = styled.div`
    min-width: 28px;
    margin-left: -4px;
    
    svg {
        display: block;
        
        path {
            fill: ${getProperty('itemIconColor')};
        }
    }
`;

export {
    ActionMenuItem,
    ActionMenu,
    ActionMenuIcon
};
