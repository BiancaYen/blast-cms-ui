import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('tabs');

const TabItemWrapper = styled.div`
    padding: ${({ spacing }) => spacing || '0 40px'};
`;

const getBadge = ({ badge, ...props }) => badge && css`
    &::after {
        position: absolute;
        top: 0;
        right: 20px;
        display: block;
        width: 15px;
        height: 15px;
        content: "${badge}";
        border-radius: 50%;
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0.7px;
        line-height: 15px;
        text-align: center;
        
        color: ${getProperty('badgeColor')(props)};
        background-color: ${getProperty('badgeBackground')(props)};
    }
`;

const SubTabsWrapper = styled.div`
    position: absolute;
    width: max-content;
    top: 23px;
    padding: 12px 0 0;
    
    display: ${({ active }) => (active ? 'flex' : 'none')};
`;

const Wrapper = styled.div`
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    height: 57px;
    
    margin: ${({ spacing }) => spacing || '30px 40px 0 40px'};
`;

const TabsWrapper = styled.div`
    min-height: 29px;
    position: relative;
    width: max-content;
    align-items: flex-end;
    display: flex;
    transition: left .4s ease;
    
    left: ${({ left }) => left || '27'}px;
`;

const TabWrapper = styled.div`
    letter-spacing: 0.7px;
    font-size: 12px;
    font-weight: bold;
    flex-shrink: 1;
    text-align: center;
    text-transform: uppercase;
    transition: color .1s linear;
    cursor: pointer;
    padding: 0 40px 10px 0;
    display: inline-block;
    position: relative;
    
    color: ${({ active }) => getProperty(active ? 'colorActive' : 'color')};
    
    ${({ active, ...props }) => !active && css`
        &:hover {
            color: ${getProperty('colorHover')(props)};
        }
    `}
    
    &> span {
        ${({ active, ...props }) => active && css`
            padding-bottom: 10px;
            margin-bottom: -2px;
            
            border-bottom: solid 2px ${getProperty('borderActive')(props)};
        `}
    }
    
    &:hover > ${SubTabsWrapper} {
        display: flex;
    }
    
    ${getBadge}
`;

const Divider = styled.div`
    width: 100%;
    ${({ isSubTab, ...props }) => !isSubTab && css`
        border-bottom: solid 2px ${getProperty('borderColor')(props)};
    `}
`;

const SubTab = styled(TabWrapper)`
    border-bottom: none;
`;

const ActionsWrapper = styled.div`
    position: absolute;
    top: 5px;
    display: flex;
    
    right: ${({ isLeftSide }) => (isLeftSide ? 'unset' : '0')};
    left: ${({ isLeftSide }) => (isLeftSide ? '0' : 'unset')};
    background-color: ${getProperty('actionBackground')};
`;

const ChildWrapper = styled.div`
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

export {
    ActionsWrapper,
    ChildWrapper,
    TabWrapper,
    Divider,
    TabsWrapper,
    SubTabsWrapper,
    SubTab,
    TabItemWrapper,
    Wrapper
};
