import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('accordion');

const getBorderStyles = ({ isActive, ...props }) => isActive && css`
    border-bottom: solid 2px ${getProperty('dividerColor')(props)};
`;

const Content = styled.div`
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    padding: ${({ spacing }) => spacing || '0 32px'};
`;

const Title = styled.div`
    font-size: 11px;
    letter-spacing: 0.69px;
    color: ${getProperty('color')};
    margin: 0 10px 0 29px;
    transition: color .3s ease;
`;

const Panel = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    cursor: pointer;
    align-items: center;
    box-sizing: content-box;
    justify-content: flex-start;
    
    ${getBorderStyles}
    
    & > span:last-of-type { // Arrow toggle
        margin: 0 20px 0 25px;
    }
`;

const AccordionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    border: solid 1px ${getProperty('border')};
    background-color: ${getProperty('background')};
    transition: border-color .3s ease;
    
    margin: ${({ spacing }) => spacing || '20px 0 0 0'};
    
    &:hover {
        border: solid 1px ${getProperty('borderHover')}; 
    }
    
    &:hover ${Title} {
        color: ${getProperty('colorHover')};
    }
 `;

const Actions = styled.div`
    display: flex;
    margin-left: auto;
`;

export {
    AccordionWrapper,
    Actions,
    Content,
    Panel,
    Title
};
