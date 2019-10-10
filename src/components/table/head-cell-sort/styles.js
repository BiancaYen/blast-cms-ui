import styled from 'react-emotion';

import HeadCell from '../head-cell/styles';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

const getArrowColor = ({ isDisabled, isActive }) => {
    if (isDisabled) {
        return getProperty('headCellSortArrowDisabled');
    }

    return getProperty(isActive ? 'headCellSortArrowActive' : 'headCellSortArrow');
};

const HeadCellSort = styled(HeadCell)`
    user-select: none;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
         
    > span {
        display: inline-block;
        padding-left: 8px;
        
        svg {
            display: block;
        }
    }
`;

const ArrowWrapper = styled.span`
    display: block;
    width: 8px;
    svg {
        width: 100%;
        path {
            fill:${getArrowColor}; !important;
        }
    }
`;

export {
    ArrowWrapper,
    HeadCellSort
};
