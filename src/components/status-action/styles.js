import styled, { css } from 'react-emotion';

// Constants
import statuses from './constants';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('statusAction');

const getColor = ({ status }) => {
    if (status === statuses.error) {
        return getProperty('colorError');
    }

    return getProperty('colorSuccess');
};

const getColorHover = ({ status, ...props }) => {
    return getColor({ status: status === statuses.success
        ? statuses.error
        : statuses.success }
    )(props);
};

const getHoverStyles = ({ isDisabled, ...props }) => !isDisabled && css`
    &:hover {
        color: ${getProperty('colorHover')(props)};
        border-color: ${getColorHover(props)};
        background-color: ${getColorHover(props)};
    
        &> span:nth-child(1) {
            display: none;
        }
        
        &> span:nth-child(2) {
            display: block;
        }
    }
`;


const StatusActionWrapper = styled.div`
    display: inline-block;
    padding: 3px 6px;
    width: max-content;
    line-height: 1;
    border-radius: 8px;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    
    background-color: ${getProperty('background')};
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    margin: ${({ spacing }) => spacing || '0'};
    color: ${getColor};
    border: 1px solid ${getColor};
    
    & > span:nth-child(2) {
        display: none;
    }
    
    ${getHoverStyles}
`;

export default StatusActionWrapper;
