import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

export const height = 40;

const Row = styled.tr`
    height: ${height}px;
    color:${getProperty('rowColor')};

    &:hover {
        background: ${getProperty('rowBackgroundHover')};
    }
    
    ${({ isDisabled, ...props }) => {
        if (isDisabled) {
            return (
                `a, td, span {
                    color: ${getProperty('cellColorDisabled')(props)};
                }`
            );
        }
        return null;
    }};
    `;

export default Row;
