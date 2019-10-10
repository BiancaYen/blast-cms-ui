import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('validationError');

const ValidationError = styled.span`
    position: absolute;
    left: 0;
    display: block;
    font-size: 9px;
    min-height: 15px;
    letter-spacing: 0.6px;
    text-align: left;
    padding-top: 4px;
    
    color: ${getProperty('color')};
`;

export default ValidationError;
