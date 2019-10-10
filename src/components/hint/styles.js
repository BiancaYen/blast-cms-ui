import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('hint');


const HintContent = styled.div`
    position: absolute;
    width: max-content;
    right: 0;
    bottom: -23px;
    display: none;
    height: 30px;
    align-items: flex-end;
    font-size: 9px;
    letter-spacing: 0.6px;
    padding: 5px 0;
    
    color: ${getProperty('color')};
    
    :hover {
        display: flex;
    }
    
    a {
        text-decoration: none;
    
        color: ${getProperty('linkColor')};
        
        :hover {
            color: ${getProperty('linkColorHover')};
        }
    }
`;

const HintWrapper = styled.div`
    width: 45px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    margin: ${({ spacing }) => spacing || 0};
    
    &:hover > ${HintContent} {
          display: flex;
    }
      
    &> span {
        height: 15px;
    
        svg {
            width: 13px;
            height: 13px;
            
            path {
               fill: ${getProperty('iconColor')};
            }
        }
    }
`;

export {
    HintContent,
    HintWrapper
};
