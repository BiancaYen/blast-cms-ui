import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

const HeadCell = styled.th`
    font-size: 11px;
    font-weight: normal;
    letter-spacing: 0.8px; 
    text-transform: uppercase;
    vertical-align: middle;
    
    color: ${getProperty('headCellColor')};
    margin: ${({ spacing }) => spacing || '0'};
    padding: ${({ isAlignedCentre, isActionCell }) => (isAlignedCentre || isActionCell ? '0' : '18px 0')};
    text-align: ${({ isAlignedCentre, isActionCell }) => (isAlignedCentre || isActionCell ? 'center' : 'left')};
    
    ${({ isIdCell }) => (isIdCell ? { width: 110 } : {})}
    ${({ isActionCell }) => (isActionCell ? { width: 140 } : {})}
    
    &:first-of-type {
        padding: 13px 0 13px 40px;
    }
`;

export default HeadCell;
