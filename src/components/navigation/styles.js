import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('navigation');

const getWidthStyles = ({ expanded }) => (expanded ? 200 : 200);

const getLinkStyles = ({ active }) => getProperty(active ? 'linkActiveColor' : 'linkColor');

const NavigationWrapper = styled.nav`
    bottom: 0;
    overflow: hidden;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    background-color: ${getProperty('background')};
    transition: width 0.3s;
    width: ${getWidthStyles}px;
    z-index: 10;
    
    &> span {
        width: 80px;
        margin-top: auto;
        margin-bottom: 10px;
        text-align: center;
        font-size: 9px;
        font-weight: bold;
        letter-spacing: 0.7px;
        color: ${getProperty('versionColor')};
    }
`;

const Line = ({ active, ...props }) => active && css`
    &:before {
        position: absolute;
        content: '';
        width: 2px;
        height: 60px;
        background-color: ${getProperty('activeLinkLineColor')(props)};
    }
`;

const NavigationMenu = styled.div`
    width: 200px;
    padding: 0;
`;

const LinkItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    a {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 60px;
        font-size: 12px;
        font-weight: normal;
        letter-spacing: 0.6px;
        transition: all 0.75s ease;
        color: ${getLinkStyles};
        text-decoration: none;
        text-transform: uppercase;
        width: 100%;
    
        svg {
            display: block;
            margin: 0 auto;
            path {
              transition: all 0.75s ease;
              fill:  ${getLinkStyles};
            }
        }
        &:hover {
            background-color: ${getProperty('linkBackgroundHover')};
        }
        
        ${Line}
    }
`;

const LinkIconWrapper = styled.div`
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImageWrapper = styled.div`
    align-items: center;
    display: flex;
    line-height: 0;
    padding: 18px 20px;
    width: 200px;
    height: 80px;
    background: ${getProperty('logoBackground')};
`;

const Divider = styled.div`
    width: 1px;
    height: 20px;
    margin: 0 20px;
    background: ${getProperty('logoPipeColor')};
`;

const LoaderCircle = styled.span`
    width: 80px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &> span {
        border-radius: 50%;
        height: 28px;
        width: 28px;
        background: ${getProperty('loadingCircleColor')};
    }
`;

export {
    Divider,
    ImageWrapper,
    LinkItem,
    LinkIconWrapper,
    LoaderCircle,
    NavigationMenu,
    NavigationWrapper
};
