import styled from 'react-emotion';

import Cell from '../cell/styles';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

const CellLink = styled(Cell)`
    a {
        padding: 3px;
        text-decoration: none;
        
        color:  ${getProperty('cellLinkColor')};
        
        &:hover {
            text-decoration: underline;
        }
    } 
`;

export default CellLink;
