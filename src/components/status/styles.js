import styled from 'react-emotion';

// Constants
import statuses from '../constants/statuses';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('status');

const getColorStyles = attribute => ({ status }) => {
    switch (status) {
        case statuses.success:
            return getProperty(`${attribute}Success`);
        case statuses.error:
            return getProperty(`${attribute}Error`);
        case statuses.warning:
            return getProperty(`${attribute}Warning`);
        default:
            return getProperty(`${attribute}Default`);
    }
};

const Status = styled.div`
    display: inline-block;
    padding: 3px 6px;
    width: max-content;
    line-height: 1;
    border-radius: 8px;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    
    margin: ${({ spacing }) => spacing || '0'};
    color: ${getColorStyles('color')};
    background-color: ${getColorStyles('background')};
`;

export default Status;
