import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('badge');

const BadgeWrapper = styled.div`
    line-height: 17px;
    padding: 0 5px;
    border-radius: 8.5px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-align: right;
    
    color: ${getProperty('color')};
    background-color: ${getProperty('background')};
`;

export default BadgeWrapper;
