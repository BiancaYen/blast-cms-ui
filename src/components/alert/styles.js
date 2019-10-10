import styled from 'react-emotion';

// Constants
import statuses from '../constants/statuses';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('alert');

const getColorStyles = ({ status }) => {
    switch (status) {
        case statuses.success:
            return getProperty('colorSuccess');
        case statuses.error:
            return getProperty('colorError');
        case statuses.warning:
            return getProperty('colorWarning');
        default:
            return getProperty('colorDefault');
    }
};

const AlertWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 9px;
    letter-spacing: 0.69px;
  
    margin: ${({ spacing }) => spacing || '0'};
    color: ${getColorStyles};
    
    & > svg {
        width: 13px;
        height: 13px;
        margin-right: 10px;
    
        path {
            fill: ${getColorStyles};
        }
    }
`;

export default AlertWrapper;
