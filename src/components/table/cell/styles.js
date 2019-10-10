import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

const Cell = styled.td`
    font-size: 11px;
    line-height: 1;
    outline: none;
    letter-spacing: 0.7px;
    
    margin: ${({ spacing }) => spacing || '0'};
    text-align: ${({ isAlignedCentre, isActionCell }) => (isAlignedCentre || isActionCell ? 'center' : 'left')};
    border-bottom: 2px solid  ${getProperty('cellBorderBottomColor')};
    color: ${getProperty('cellColor')};
    width: ${({ isIdCell, isActionCell }) => (isIdCell || isActionCell ? '100px' : 'auto')};
    
    &:first-of-type {
        padding: 13px 0 13px 40px;
    }
    
    a {
        padding: 3px;
        text-decoration: none;
        
        color:  ${getProperty('cellLinkColor')};
        
        &:hover {
            text-decoration: underline;
        }
    } 
`;

export default Cell;
