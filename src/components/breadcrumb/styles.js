import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('breadcrumb');

const BreadcrumbWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    padding-left: 40px;
    margin: ${({ spacing }) => spacing || '0'};
    background-color: ${getProperty('background')};
    text-transform: uppercase;
    
    span, a {
        line-height: 1;
        font-size: 13px;
        color: ${getProperty('color')};
        text-decoration: none;
    }
    
    span:nth-of-type(2):before {
        content: ":";
        padding: 0 4px;
    }
    
    a:hover {
        font-size: 13px;
        cursor: pointer;
        color: ${getProperty('linkColorHover')};
    }
    
    svg {
        margin: 0 14px;
        
        path {
            fill: ${getProperty('iconColor')};
        }
    }
`;

export default BreadcrumbWrapper;
