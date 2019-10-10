import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('actionMenu');

const ActionMenuItem = styled.li`
    font-size: 11px;
    height: 40px;
    text-decoration: none;
    list-style-type: none;
    line-height: 40px;
    outline: none;
    padding: ${({ spacingContent }) => spacingContent || '0 20px 0 19px'};
    color: ${getProperty('itemColor')};
    letter-spacing: 0.7px;
    background: ${({ isActive }) => getProperty(isActive ? 'itemBackgroundActive' : 'background')};
    border-bottom: solid 1px ${getProperty('itemBorder')};
    cursor: pointer;
    
    ${({ isActive, ...props }) => !isActive && css`
        &:hover {
            background: ${getProperty('itemBackgroundHover')(props)};
        }
    `}
`;

const ActionMenuWrapper = styled.ul`
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: 0;
    width: 147px;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(214, 213, 213, 0.5);
    background-color: ${getProperty('background')};
    border: 1px solid ${getProperty('border')};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    z-index: 5;
    
    &> ${ActionMenuItem}:last-of-type {
        border-bottom: none;
    }
`;

const ActionMenuItemSubtitle = styled.div`
  float: right;
  color: ${getProperty('itemSubTitleColor')};
`;

export {
    ActionMenuWrapper,
    ActionMenuItem,
    ActionMenuItemSubtitle
};
