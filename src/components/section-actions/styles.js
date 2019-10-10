import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('sectionAction');

const getBorderStyles = ({ withoutBorder, ...props }) => {
    return withoutBorder ? 'none' : `solid 2px ${getProperty('borderColor')(props)}`;
};

const Action = styled.span`
    display: flex;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.6px;
    text-align: right;
    text-transform: uppercase;
    cursor: pointer;
    
    color: ${getProperty('actionColor')};
    
    &> svg {
        margin-right: 10px;
        
        path {
            fill: ${getProperty('actionIconColor')};
        }
    }
    
    &:hover {
      color: ${getProperty('actionColorHover')};
      
    &> svg path {
            fill: ${getProperty('actionColorHover')};
        }
    }
`;

const SectionActionsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: 10px; 
    text-align: right;
    position: relative;
    
    border-bottom: ${getBorderStyles};
    margin: ${({ spacing }) => spacing || '30px 40px 20px 40px'};
    
    ${Action}:nth-of-type(1) {
        margin-left: 30px;
    }
    
    &::before {
        position: absolute;
        content: "";
        width: 170px;
        left: -170px;
        top: -10px;
        bottom: 0;
        pointer-events: none;
        
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));
    }
`;

export {
    SectionActionsWrapper,
    Action
};
