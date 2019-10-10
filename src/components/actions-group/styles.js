import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('actionsGroup');

const ActionsGroupWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    height: max-content;
    
    margin: ${({ spacing }) => spacing || '0'};
    
    & > * {
        &:not(:nth-last-of-type(1))::after {
            content: "";
            height: 10px;
            display: inline-block;
            
            margin: ${({ dividerSpacing }) => dividerSpacing || '0 18px'};
            border-left: solid 2px ${getProperty('dividerColor')};
        }
    }
`;

export default ActionsGroupWrapper;
