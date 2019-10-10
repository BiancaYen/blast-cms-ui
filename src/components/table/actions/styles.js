import styled from 'react-emotion';

// Styles
import Cell from '../cell/styles';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('tableActions');

const CellAction = styled(Cell)`
    cursor: pointer;
    outline: none;
    text-align: center;
    position: relative;
    
    &> svg path {
        fill: ${getProperty('iconColor')};
    }
    
    ul li {
        text-transform: uppercase;
        font-size: 9px;
        font-weight: bold;
    }
`;

const ActionMenuWrapper = styled.div`
    > ul {
        right: 60px;
        
        bottom: ${({ openToTop }) => (openToTop ? '15px' : 'initial')};
        top: ${({ openToTop }) => (!openToTop ? '28px' : 'initial')};
    }
`;

export {
    ActionMenuWrapper,
    CellAction
};
